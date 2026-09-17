let activeTag = null;

function uniqueTags(recipes) {
  const set = new Set();
  recipes.forEach(r => r.tags.forEach(t => set.add(t)));
  return [...set].sort((a, b) => a.localeCompare(b));
}

function renderTagFilters() {
  const container = document.getElementById("tag-filters");
  container.innerHTML = "";

  for (const tag of uniqueTags(RECIPES)) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tag-chip " + tagColorClass(tag) + (tag === activeTag ? " active" : "");
    btn.dir = "auto";
    btn.textContent = tag;
    btn.addEventListener("click", () => {
      activeTag = activeTag === tag ? null : tag;
      renderTagFilters();
      applyFilters();
    });
    container.appendChild(btn);
  }
}

function renderRecipes(list) {
  const ul = document.getElementById("recipe-list");
  const empty = document.getElementById("empty-state");
  ul.innerHTML = "";

  if (list.length === 0) {
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  for (const recipe of list) {
    const li = document.createElement("li");
    if (recipe.tags.length > 0) {
      li.className = tagColorClass(recipe.tags[0]);
    }
    const a = document.createElement("a");
    a.href = recipe.url;

    const title = document.createElement("span");
    title.dir = "auto";
    title.textContent = recipe.title;

    const tags = document.createElement("span");
    tags.className = "tags";
    tags.dir = "auto";
    tags.textContent = [...recipe.tags, recipe.time].filter(Boolean).join(" · ");

    a.appendChild(title);
    a.appendChild(tags);
    li.appendChild(a);
    ul.appendChild(li);
  }
}

function matchesQuery(recipe, query) {
  const haystack = [recipe.title, ...recipe.tags].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function applyFilters() {
  const query = document.getElementById("search").value.trim();
  let filtered = RECIPES;

  if (activeTag) {
    filtered = filtered.filter(r => r.tags.includes(activeTag));
  }
  if (query !== "") {
    filtered = filtered.filter(r => matchesQuery(r, query));
  }
  renderRecipes(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  renderTagFilters();
  renderRecipes(RECIPES);

  document.getElementById("search").addEventListener("input", applyFilters);
});
