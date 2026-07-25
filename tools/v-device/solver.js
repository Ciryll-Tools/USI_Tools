// Feasibility solver for the V-Device.
//
// Model (per the game mechanics):
//  - Six slots: five color slots (Red, Orange, Green, Blue, Pink) + one White slot.
//  - Each shard is placed in at most one slot; each slot holds at most one shard.
//  - A shard may only be placed in a color slot that is one of its *placeable* colors
//    (a color for which it has a non-link-only effect). White accepts any shard.
//  - Links connect pairs of color slots (complete graph: any of the 10 pairs is
//    linkable). At most MAX_LINKS links may be active at once.
//  - A shard in color slot X gains color X plus every color directly linked to X
//    (direct links only, no transitive chaining).
//  - A shard in White gains all five colors at once and uses no links.
//
// A requirement is { shard, color }: that shard must "have" that color active.
// solve() returns the first valid configuration found, or null if infeasible.

import { COLORS, WHITE, MAX_LINKS } from "./data.js";

/** Canonical undirected link key, e.g. linkKey("Orange","Pink") === "Orange|Pink". */
export function linkKey(a, b) {
  return [a, b].sort().join("|");
}

/**
 * @param {Array<{shard:string,color:string}>} requirements
 * @param {Array} shardLib  full shard library (for placeable-color lookup)
 * @returns {null | {placement: Record<string,string>, links: string[]}}
 *   placement maps shardName -> slot; links is an array of "A|B" keys.
 */
export function solve(requirements, shardLib) {
  // Group required colors per shard.
  const need = new Map(); // shardName -> Set(colors)
  for (const { shard, color } of requirements) {
    if (!need.has(shard)) need.set(shard, new Set());
    need.get(shard).add(color);
  }

  const shards = [...need.keys()];
  if (shards.length > COLORS.length + 1) return null; // more shards than slots

  const placeableOf = (name) => {
    const s = shardLib.find((x) => x.name === name);
    if (!s) return new Set();
    return new Set(s.effects.filter((e) => !e.linkOnly).map((e) => e.color));
  };

  // Most-constrained shard first (fewest placement options) to prune faster.
  const meta = shards.map((name) => ({
    name,
    reqColors: [...need.get(name)],
    placeable: placeableOf(name),
  }));
  meta.sort((a, b) => a.placeable.size - b.placeable.size);

  const placement = {};
  const usedSlots = new Set();
  const links = new Set();

  function recurse(i) {
    if (i === meta.length) return true;
    const { name, reqColors, placeable } = meta[i];

    // Option A: place in White (satisfies every color, no links).
    if (!usedSlots.has(WHITE)) {
      placement[name] = WHITE;
      usedSlots.add(WHITE);
      if (recurse(i + 1)) return true;
      usedSlots.delete(WHITE);
      delete placement[name];
    }

    // Option B: place in a placeable color slot, adding links for the rest.
    for (const X of placeable) {
      if (usedSlots.has(X)) continue;
      const added = [];
      let ok = true;
      for (const c of reqColors) {
        if (c === X) continue;
        const key = linkKey(X, c);
        if (!links.has(key)) added.push(key);
      }
      if (links.size + new Set(added).size > MAX_LINKS) ok = false;
      if (ok) {
        for (const k of added) links.add(k);
        placement[name] = X;
        usedSlots.add(X);
        if (recurse(i + 1)) return true;
        usedSlots.delete(X);
        delete placement[name];
        for (const k of added) links.delete(k);
      }
    }
    return false;
  }

  if (!recurse(0)) return null;
  return { placement: { ...placement }, links: [...links] };
}

/** True if the given requirement set can be satisfied. */
export function isFeasible(requirements, shardLib) {
  return solve(requirements, shardLib) !== null;
}

/** Collect the union of requirements for a list of objectives. */
export function requirementsFor(objectives) {
  const out = [];
  for (const o of objectives) out.push(...o.requirements);
  return out;
}
