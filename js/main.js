// Registry of available tools. Add an entry here for each tool built under tools/.
// { name, description, path } — path is relative to the site root.
export const TOOLS = [
  {
    name: "V-Device Planner",
    description: "Choose the bonuses you want and find a valid V-Device slot & link layout that grants them all.",
    path: "tools/v-device/",
  },
];

function renderTools() {
  const grid = document.getElementById("tool-grid");
  const emptyState = document.getElementById("empty-state");

  if (!TOOLS.length) {
    emptyState.hidden = false;
    return;
  }

  grid.innerHTML = TOOLS.map((tool) => `
    <a class="tool-card" href="${tool.path}">
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
    </a>
  `).join("");
}

renderTools();
