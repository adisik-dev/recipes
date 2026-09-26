let activeTag = null;

// Sections appear on the homepage in this order. Anything with an
// unlisted category still shows, grouped at the end under "אחר".
const CATEGORY_ORDER = ["ארוחת בוקר", "מנה ראשונה", "מרק", "מנה עיקרית", "קינוח"];
const OTHER_CATEGORY = "אחר";

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

function groupByCategory(list) {
  const groups = new Map();
  for (const recipe of list) {
    const category = recipe.category || OTHER_CATEGORY;
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category).push(recipe);
  }

  const orderedCategories = [
    ...CATEGORY_ORDER.filter(c => groups.has(c)),
    ...[...groups.keys()].filter(c => !CATEGORY_ORDER.includes(c)).sort((a, b) => a.localeCompare(b))
  ];

  return orderedCategories.map(category => ({ category, recipes: groups.get(category) }));
}

function buildRecipeCard(recipe) {
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
  return li;
}

function renderRecipes(list) {
  const container = document.getElementById("recipe-list");
  const empty = document.getElementById("empty-state");
  container.innerHTML = "";

  if (list.length === 0) {
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  for (const { category, recipes } of groupByCategory(list)) {
    const section = document.createElement("section");
    section.className = "recipe-section";

    const heading = document.createElement("h2");
    heading.className = "category-heading";
    heading.dir = "auto";
    heading.textContent = category;
    section.appendChild(heading);

    const ul = document.createElement("ul");
    ul.className = "recipe-list";
    recipes.forEach(recipe => ul.appendChild(buildRecipeCard(recipe)));
    section.appendChild(ul);

    container.appendChild(section);
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
