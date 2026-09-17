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

function matches(recipe, query) {
  const haystack = [recipe.title, ...recipe.tags].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

document.addEventListener("DOMContentLoaded", () => {
  renderRecipes(RECIPES);

  const searchBox = document.getElementById("search");
  searchBox.addEventListener("input", () => {
    const query = searchBox.value.trim();
    const filtered = query === "" ? RECIPES : RECIPES.filter(r => matches(r, query));
    renderRecipes(filtered);
  });
});
