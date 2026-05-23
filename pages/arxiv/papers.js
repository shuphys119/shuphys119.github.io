const searchInput = document.getElementById("paper-search-input");
const selectedOnlyCheckbox = document.getElementById("selected-only-checkbox");
const countElement = document.getElementById("paper-count");

const tagCheckboxes = document.querySelectorAll(".tag-filter-checkbox");
const tagModeRadios = document.querySelectorAll('input[name="tag-mode"]');

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

  if (!currentViewElement) {
    return [];
  }

  return currentViewElement.querySelectorAll(".paper-item");
}

function getSelectedTags() {
  return Array.from(tagCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value.trim().toLowerCase())
    .filter((tag) => tag.length > 0);
}

function getTagMode() {
  const checkedMode = Array.from(tagModeRadios).find((radio) => radio.checked);
  return checkedMode ? checkedMode.value : "or";
}

function matchesSearch(item, query) {
  if (!query) {
    return true;
  }

  const searchableText = [
    item.dataset.title || "",
    item.dataset.authors || "",
    item.dataset.tags || "",
    item.dataset.hook || "",
  ].join(" ");

  return searchableText.includes(query);
}

function getItemTags(item) {
  return (item.dataset.tags || "")
    .split("||")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);
}

function matchesTags(item, selectedTags, tagMode) {
  if (selectedTags.length === 0) {
    return true;
  }

  const itemTags = getItemTags(item);

  if (tagMode === "and") {
    return selectedTags.every((tag) => itemTags.includes(tag));
  }

  return selectedTags.some((tag) => itemTags.includes(tag));
}

function matchesSelectedOnly(item, selectedOnly) {
  if (!selectedOnly) {
    return true;
  }

  return item.dataset.selected === "true";
}

function applyFilters() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedTags = getSelectedTags();
  const tagMode = getTagMode();
  const selectedOnly = selectedOnlyCheckbox ? selectedOnlyCheckbox.checked : false;

  let visibleCount = 0;
  const currentItems = getItemsInCurrentView();

  currentItems.forEach((item) => {
    const visible =
      matchesSearch(item, query) &&
      matchesTags(item, selectedTags, tagMode) &&
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
    if (!element) {
      return;
    }

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

if (selectedOnlyCheckbox) {
  selectedOnlyCheckbox.addEventListener("change", applyFilters);
}

tagCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});

tagModeRadios.forEach((radio) => {
  radio.addEventListener("change", applyFilters);
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchView(button.dataset.view);
  });
});

switchView(currentView);