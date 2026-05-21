const searchInput = document.getElementById("paper-search-input");
const tagSelect = document.getElementById("paper-tag-select");
const selectedOnlyCheckbox = document.getElementById("selected-only-checkbox");
const countElement = document.getElementById("paper-count");

const viewButtons = document.querySelectorAll(".view-button");

const views = {
  compact: document.getElementById("compact-view"),
  table: document.getElementById("table-view"),
};

let currentView = "compact";

function getItemsInCurrentView() {
  return views[currentView].querySelectorAll(".paper-item");
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
  const query = searchInput.value.trim().toLowerCase();
  const selectedTag = tagSelect.value.toLowerCase();
  const selectedOnly = selectedOnlyCheckbox.checked;

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

  countElement.textContent = `${visibleCount} paper${visibleCount === 1 ? "" : "s"}`;
}

function switchView(nextView) {
  currentView = nextView;

  Object.entries(views).forEach(([name, element]) => {
    element.style.display = name === currentView ? "" : "none";
  });

  viewButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === currentView);
  });

  applyFilters();
}

searchInput.addEventListener("input", applyFilters);
tagSelect.addEventListener("change", applyFilters);
selectedOnlyCheckbox.addEventListener("change", applyFilters);

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchView(button.dataset.view);
  });
});

switchView(currentView);