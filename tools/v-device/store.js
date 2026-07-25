// Persistent store for shard + objective libraries.
// Shards are a seeded reference library; objectives are user-configurable (CRUD).
// State is persisted to localStorage; export/import/reset are provided.

import { DEFAULT_SHARDS, DEFAULT_OBJECTIVES } from "./data.js";

const KEY = "usi-vdevice-v1";

function clone(x) {
  return JSON.parse(JSON.stringify(x));
}

function defaults() {
  return { shards: clone(DEFAULT_SHARDS), objectives: clone(DEFAULT_OBJECTIVES) };
}

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const parsed = JSON.parse(raw);
    if (!parsed.shards || !parsed.objectives) return defaults();
    return parsed;
  } catch {
    return defaults();
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage may be unavailable; keep working in-memory */
  }
}

export function getShards() {
  return state.shards;
}

export function getObjectives() {
  return state.objectives;
}

export function getObjective(id) {
  return state.objectives.find((o) => o.id === id) || null;
}

function newId() {
  return "obj-" + Math.random().toString(36).slice(2, 9);
}

export function addObjective({ name, requirements }) {
  const obj = { id: newId(), name: name.trim(), requirements };
  state.objectives.push(obj);
  persist();
  return obj;
}

export function updateObjective(id, { name, requirements }) {
  const obj = getObjective(id);
  if (!obj) return null;
  obj.name = name.trim();
  obj.requirements = requirements;
  persist();
  return obj;
}

export function deleteObjective(id) {
  state.objectives = state.objectives.filter((o) => o.id !== id);
  persist();
}

export function resetAll() {
  state = defaults();
  persist();
}

export function exportJSON() {
  return JSON.stringify(state, null, 2);
}

export function importJSON(text) {
  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed.shards) || !Array.isArray(parsed.objectives)) {
    throw new Error("JSON must have `shards` and `objectives` arrays.");
  }
  state = { shards: parsed.shards, objectives: parsed.objectives };
  persist();
}
