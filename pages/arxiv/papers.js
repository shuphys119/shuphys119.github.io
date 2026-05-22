const searchInput = document.getElementById("paper-search-input");
const tagSelect = document.getElementById("paper-tag-select");
const selectedOnlyCheckbox = document.getElementById("selected-only-checkbox");
const countElement = document.getElementById("paper-count");

const viewButtons = document.querySelectorAll(".view-button");

const views = {
  "date-title-authors": document.getElementById("date-title-authors-view"),
  "title-authors": document.getElementById("title-authors-view"),
  database: document.getElementById("database-view"),
};

let currentView = views["date-title-authors"]
  ? "date-title-authors"
  : "database";

function getCurrentViewElement() {
  return views[currentView];
}

function getItemsInCurrentView() {
  const currentViewElement = getCurrentViewElement();
  if (!currentViewElement) return [];
  return currentViewElement.querySelectorAll(".paper-item");
}

function matchesSearch(item, query) {
  if (!query) return true;

  const searchableText = [
    item.dataset.title || "",
    item.dataset.authors || "",
    item.dataset.tags || "",
    item.dataset.hook || "",
  ].join(" ");

  return searchableText.includes(query);
}

function matchesTag(item, selectedTag) {
  if (selectedTag === "all") return true;

  const tags = (item.dataset.tags || "")
    .split(/\s+/)
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);

  return tags.includes(selectedTag.toLowerCase());
}

function matchesSelectedOnly(item, selectedOnly) {
  if (!selectedOnly) return true;
  return item.dataset.selected === "true";
}

function applyFilters() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedTag = tagSelect ? tagSelect.value.toLowerCase() : "all";
  const selectedOnly = selectedOnlyCheckbox ? selectedOnlyCheckbox.checked : false;

  let visibleCount = 0;
  const currentItems = getItemsInCurrentView();

  currentItems.forEach((item) => {
    const visible =
      matchesSearch(item, query) &&
      matchesTag(item, selectedTag) &&
      matchesSelectedOnly(item, selectedOnly);

    item.style.display = visible ? "" : "none";

    if (visible) {
      visibleCount += 1;
    }
  });

  if (countElement) {
    countElement.textContent = `${visibleCount} paper${visibleCount === 1 ? "" : "s"}`;
  }
}

function switchView(nextView) {
  currentView = nextView;

  Object.entries(views).forEach(([name, element]) => {
    if (!element) return;
    element.style.display = name === currentView ? "" : "none";
  });

  viewButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === currentView);
  });

  applyFilters();
}

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

if (tagSelect) {
  tagSelect.addEventListener("change", applyFilters);
}

if (selectedOnlyCheckbox) {
  selectedOnlyCheckbox.addEventListener("change", applyFilters);
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchView(button.dataset.view);
  });
});

switchView(currentView);