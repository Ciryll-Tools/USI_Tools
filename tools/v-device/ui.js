// V-Device Planner UI. Wires the shard/objective libraries and the feasibility
// solver into an interactive planner.

import { COLORS, WHITE, MAX_LINKS } from "./data.js";
import { solve, isFeasible, requirementsFor } from "./solver.js";
import * as store from "./store.js";

const SLOTS = [...COLORS, WHITE];

// ---- App state -------------------------------------------------------------
let selectedIds = [];
let search = "";
let showInfeasible = false;
let editing = null; // { id|null, name, requirements:[{shard,color}] }

// ---- Small helpers ---------------------------------------------------------
const $ = (sel, root = document) => root.querySelector(sel);
const el = (id) => document.getElementById(id);

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const shortName = (name) => name.replace(/\s+Shard$/i, "");
const colorDot = (color) => `<span class="dot color-${color}"></span>`;
const reqText = (r) => `${colorDot(r.color)}${escapeHtml(shortName(r.shard))} <span class="muted">${r.color}</span>`;

function selectedObjectives() {
  return selectedIds.map((id) => store.getObjective(id)).filter(Boolean);
}

/** Colors a placed shard ends up with, given a solution. */
function gainedColors(shardName, solution) {
  const slot = solution.placement[shardName];
  if (slot === WHITE) return [...COLORS];
  const out = new Set([slot]);
  for (const key of solution.links) {
    const [a, b] = key.split("|");
    if (a === slot) out.add(b);
    if (b === slot) out.add(a);
  }
  return [...out];
}

/** Distinct shards an objective needs, sorted, as a comparison key. */
const shardKey = (o) => [...new Set(o.requirements.map((r) => r.shard))].sort().join("|");

// In-game color priority (Red highest). Used as the final sort tie-breaker.
const COLOR_ORDER = ["Red", "Orange", "Pink", "Blue", "Green"];
const colorRank = (c) => {
  const i = COLOR_ORDER.indexOf(c);
  return i === -1 ? COLOR_ORDER.length : i;
};
/** Ranks of an objective's colors, ascending, for lexicographic comparison. */
const colorKey = (o) => o.requirements.map((r) => colorRank(r.color)).sort((x, y) => x - y);
function cmpColor(a, b) {
  const ka = colorKey(a);
  const kb = colorKey(b);
  const n = Math.min(ka.length, kb.length);
  for (let i = 0; i < n; i++) if (ka[i] !== kb[i]) return ka[i] - kb[i];
  return ka.length - kb.length;
}

/** Sort objectives: most requirements first, then by shard, then by color. */
const byReqThenShard = (a, b) =>
  b.requirements.length - a.requirements.length ||
  shardKey(a).localeCompare(shardKey(b)) ||
  cmpColor(a, b);

/** Distinct colors a shard has any effect for, with a link-only flag. */
function effectColors(shard) {
  const map = new Map();
  for (const e of shard.effects) {
    const prev = map.get(e.color);
    // color is "placeable" if it has at least one non-link-only effect
    map.set(e.color, prev === false ? false : e.linkOnly);
  }
  return [...map.entries()].map(([color, linkOnly]) => ({ color, linkOnly }));
}

// ---- Planner: selected + available ----------------------------------------
function renderSelected() {
  const box = el("selected");
  box.innerHTML = selectedObjectives()
    .map(
      (o) => `<span class="chip">${escapeHtml(o.name)}
        <button data-remove="${o.id}" title="Remove" aria-label="Remove ${escapeHtml(o.name)}">&times;</button></span>`
    )
    .join("");
  box.querySelectorAll("[data-remove]").forEach((btn) =>
    btn.addEventListener("click", () => {
      selectedIds = selectedIds.filter((id) => id !== btn.dataset.remove);
      renderPlanner();
    })
  );
}

function renderAvailable() {
  const shards = store.getShards();
  const sel = selectedObjectives();
  const base = requirementsFor(sel);
  const term = search.trim().toLowerCase();

  // An objective is redundant if every requirement it has is already covered
  // by the selected objectives, so drop it from the list.
  const baseSet = new Set(base.map((r) => r.shard + "|" + r.color));
  const isRedundant = (o) =>
    o.requirements.length > 0 && o.requirements.every((r) => baseSet.has(r.shard + "|" + r.color));

  const candidates = store
    .getObjectives()
    .filter((o) => !selectedIds.includes(o.id) && !isRedundant(o));
  let hiddenInfeasible = 0;

  const items = candidates
    .filter((o) => {
      if (!term) return true;
      const hay = (o.name + " " + o.requirements.map((r) => r.shard + " " + r.color).join(" ")).toLowerCase();
      return hay.includes(term);
    })
    .sort(byReqThenShard)
    .map((o) => {
      const feasible = isFeasible([...base, ...o.requirements], shards);
      if (!feasible && !showInfeasible) {
        hiddenInfeasible++;
        return "";
      }
      const reqs = o.requirements.map(reqText).join(" &nbsp; ");
      return `<button class="obj-item ${feasible ? "" : "infeasible"}" ${feasible ? `data-add="${o.id}"` : "disabled"}>
        <div class="obj-name">${escapeHtml(o.name)}</div>
        <div class="obj-reqs">${reqs || "<em>no requirements</em>"}</div>
      </button>`;
    })
    .join("");

  const note = hiddenInfeasible
    ? `<p class="muted" style="font-size:.85rem">${hiddenInfeasible} objective${hiddenInfeasible === 1 ? "" : "s"} hidden as infeasible with the current selection.</p>`
    : "";

  const box = el("available");
  box.innerHTML = (items || `<p class="muted">No matching objectives.</p>`) + note;
  box.querySelectorAll("[data-add]").forEach((btn) =>
    btn.addEventListener("click", () => {
      selectedIds.push(btn.dataset.add);
      renderPlanner();
    })
  );
}

// ---- Planner: configuration -----------------------------------------------
function renderConfig() {
  const box = el("config");
  const shards = store.getShards();
  const sel = selectedObjectives();

  if (sel.length === 0) {
    box.innerHTML = `<p class="empty-config">Select one or more objectives to see a working layout.</p>`;
    return;
  }

  const solution = solve(requirementsFor(sel), shards);
  if (!solution) {
    box.innerHTML = `<p class="empty-config">No valid layout — the current selection conflicts. Remove an objective.</p>`;
    return;
  }

  // reverse placement: slot -> shardName
  const bySlot = {};
  for (const [shard, slot] of Object.entries(solution.placement)) bySlot[slot] = shard;

  const slotCards = SLOTS.map((slot) => {
    const shard = bySlot[slot];
    const isWhite = slot === WHITE;
    let gainLine = "";
    if (shard) {
      const gained = gainedColors(shard, solution).filter((c) => c !== slot);
      gainLine = isWhite
        ? `<div class="slot-gain">all colors</div>`
        : gained.length
        ? `<div class="slot-gain">+ ${gained.map((c) => colorDot(c) + c).join(", ")} (linked)</div>`
        : `<div class="slot-gain">no links</div>`;
    }
    return `<div class="slot color-${slot} ${isWhite ? "slot-white" : ""}">
      <div class="slot-name">${slot}</div>
      <div class="slot-shard">${shard ? escapeHtml(shortName(shard)) : `<span class="slot-empty">empty</span>`}</div>
      ${gainLine}
    </div>`;
  }).join("");

  const linkPills = solution.links.length
    ? solution.links
        .map((k) => {
          const [a, b] = k.split("|");
          return `<span class="link-pill">${colorDot(a)}${a} &harr; ${colorDot(b)}${b}</span>`;
        })
        .join("")
    : `<span class="muted">none needed</span>`;

  // Active bonuses per placed shard (every effect whose color is gained)
  const bonusRows = [];
  for (const shard of Object.keys(solution.placement)) {
    const gained = new Set(gainedColors(shard, solution));
    const s = shards.find((x) => x.name === shard);
    if (!s) continue;
    for (const e of s.effects) {
      if (gained.has(e.color)) {
        bonusRows.push(
          `<li>${colorDot(e.color)}<strong>${escapeHtml(shortName(shard))}</strong> — ${escapeHtml(e.bonus)}</li>`
        );
      }
    }
  }

  box.innerHTML = `
    <p class="link-count">Links used: <strong>${solution.links.length} / ${MAX_LINKS}</strong></p>
    <div class="slots">${slotCards}</div>
    <div class="links-block"><h3>Active links</h3>${linkPills}</div>
    <div class="bonus-block"><h3>Bonuses granted by this layout</h3><ul>${bonusRows.join("")}</ul></div>
  `;
}

function renderPlanner() {
  // drop stale selections (e.g. after import/delete)
  selectedIds = selectedIds.filter((id) => store.getObjective(id));
  renderSelected();
  renderAvailable();
  renderConfig();
}

// ---- Objectives tab (CRUD) -------------------------------------------------
function renderObjectiveTable() {
  const rows = store
    .getObjectives()
    .slice()
    .sort(byReqThenShard)
    .map(
      (o) => `<tr>
        <td>${escapeHtml(o.name)}</td>
        <td>${o.requirements.map(reqText).join("<br>") || "<em>none</em>"}</td>
        <td class="row-actions">
          <button class="btn" data-edit="${o.id}">Edit</button>
          <button class="btn danger" data-del="${o.id}">Delete</button>
        </td>
      </tr>`
    )
    .join("");
  el("objective-table").innerHTML = `<table>
    <thead><tr><th>Name</th><th>Requirements</th><th></th></tr></thead>
    <tbody>${rows}</tbody></table>`;

  el("objective-table").querySelectorAll("[data-edit]").forEach((b) =>
    b.addEventListener("click", () => openEditor(store.getObjective(b.dataset.edit)))
  );
  el("objective-table").querySelectorAll("[data-del]").forEach((b) =>
    b.addEventListener("click", () => {
      const o = store.getObjective(b.dataset.del);
      if (o && confirm(`Delete objective "${o.name}"?`)) {
        store.deleteObjective(b.dataset.del);
        renderObjectiveTable();
        renderPlanner();
      }
    })
  );
}

function openEditor(obj) {
  editing = obj
    ? { id: obj.id, name: obj.name, requirements: obj.requirements.map((r) => ({ ...r })) }
    : { id: null, name: "", requirements: [] };
  renderEditor();
}

function colorOptions(shardName, selected) {
  const shard = store.getShards().find((s) => s.name === shardName);
  if (!shard) return "";
  return effectColors(shard)
    .map(
      ({ color, linkOnly }) =>
        `<option value="${color}" ${color === selected ? "selected" : ""}>${color}${linkOnly ? " (link-only)" : ""}</option>`
    )
    .join("");
}

function renderEditor() {
  const box = el("objective-editor");
  if (!editing) {
    box.innerHTML = "";
    return;
  }
  const shards = store.getShards();
  const shardOpts = (sel) =>
    shards.map((s) => `<option value="${escapeHtml(s.name)}" ${s.name === sel ? "selected" : ""}>${escapeHtml(shortName(s.name))}</option>`).join("");

  const reqRows = editing.requirements
    .map(
      (r, i) => `<div class="req-row" data-i="${i}">
        <select data-field="shard">${shardOpts(r.shard)}</select>
        <select data-field="color">${colorOptions(r.shard, r.color)}</select>
        <button class="btn danger" data-remove-req="${i}">&times;</button>
      </div>`
    )
    .join("");

  box.innerHTML = `<div class="editor">
    <label>Objective name</label>
    <input type="text" id="ed-name" value="${escapeHtml(editing.name)}" placeholder="e.g. Fixtures" />
    <label>Requirements (shard + color that must be active)</label>
    ${reqRows || `<p class="muted">No requirements yet.</p>`}
    <button class="btn" id="add-req">+ Add requirement</button>
    <div class="btn-row" style="margin-top:1rem">
      <button class="btn primary" id="save-obj">Save</button>
      <button class="btn" id="cancel-obj">Cancel</button>
    </div>
  </div>`;

  el("ed-name").addEventListener("input", (e) => (editing.name = e.target.value));

  box.querySelectorAll(".req-row").forEach((row) => {
    const i = Number(row.dataset.i);
    row.querySelector('[data-field="shard"]').addEventListener("change", (e) => {
      editing.requirements[i].shard = e.target.value;
      // reset color to first valid for the new shard
      const shard = shards.find((s) => s.name === e.target.value);
      editing.requirements[i].color = shard ? effectColors(shard)[0]?.color : "";
      renderEditor();
    });
    row.querySelector('[data-field="color"]').addEventListener("change", (e) => {
      editing.requirements[i].color = e.target.value;
    });
    row.querySelector("[data-remove-req]").addEventListener("click", () => {
      editing.requirements.splice(i, 1);
      renderEditor();
    });
  });

  el("add-req").addEventListener("click", () => {
    const first = shards[0];
    editing.requirements.push({ shard: first.name, color: effectColors(first)[0]?.color });
    renderEditor();
  });

  el("cancel-obj").addEventListener("click", () => {
    editing = null;
    renderEditor();
  });

  el("save-obj").addEventListener("click", () => {
    if (!editing.name.trim()) {
      alert("Give the objective a name.");
      return;
    }
    const payload = { name: editing.name, requirements: editing.requirements };
    if (editing.id) store.updateObjective(editing.id, payload);
    else store.addObjective(payload);
    editing = null;
    renderEditor();
    renderObjectiveTable();
    renderPlanner();
  });
}

// ---- Shard library tab -----------------------------------------------------
function renderShardTable() {
  const rows = store
    .getShards()
    .map((s) => {
      const byColor = COLORS.map((color) => {
        const effs = s.effects.filter((e) => e.color === color);
        if (!effs.length) return "";
        return effs
          .map(
            (e) =>
              `<div>${colorDot(color)}${escapeHtml(e.bonus)}${e.linkOnly ? '<span class="link-only-tag">link-only</span>' : ""}</div>`
          )
          .join("");
      }).join("");
      const placeable = effectColors(s)
        .filter((c) => !c.linkOnly)
        .map((c) => colorDot(c.color) + c.color)
        .join(", ");
      return `<tr>
        <td><strong>${escapeHtml(shortName(s.name))}</strong><br><span class="muted" style="font-size:.8rem">placeable: ${placeable}</span></td>
        <td>${byColor}</td>
      </tr>`;
    })
    .join("");
  el("shard-table").innerHTML = `<table>
    <thead><tr><th>Shard</th><th>Color effects</th></tr></thead>
    <tbody>${rows}</tbody></table>`;
}

// ---- Data tab --------------------------------------------------------------
function setMsg(text, ok) {
  const m = el("data-msg");
  m.textContent = text;
  m.className = "data-msg " + (ok ? "ok" : "err");
}

function wireDataTab() {
  el("export-btn").addEventListener("click", () => {
    el("data-io").value = store.exportJSON();
    setMsg("Exported current libraries below.", true);
  });
  el("import-btn").addEventListener("click", () => {
    try {
      store.importJSON(el("data-io").value);
      selectedIds = [];
      renderAll();
      setMsg("Imported successfully.", true);
    } catch (e) {
      setMsg("Import failed: " + e.message, false);
    }
  });
  el("reset-btn").addEventListener("click", () => {
    if (confirm("Reset shards and objectives to the wiki defaults? This discards your changes.")) {
      store.resetAll();
      selectedIds = [];
      renderAll();
      setMsg("Reset to defaults.", true);
    }
  });
}

// ---- Tabs & bootstrap ------------------------------------------------------
function wireTabs() {
  el("tabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("is-active", b === btn));
    document.querySelectorAll(".tab-panel").forEach((p) =>
      p.classList.toggle("is-active", p.id === "tab-" + btn.dataset.tab)
    );
  });
}

function renderAll() {
  renderPlanner();
  renderObjectiveTable();
  renderEditor();
  renderShardTable();
}

function init() {
  wireTabs();
  wireDataTab();

  el("obj-search").addEventListener("input", (e) => {
    search = e.target.value;
    renderAvailable();
  });
  el("show-infeasible").addEventListener("change", (e) => {
    showInfeasible = e.target.checked;
    renderAvailable();
  });
  el("new-objective").addEventListener("click", () => openEditor(null));

  renderAll();
}

init();
