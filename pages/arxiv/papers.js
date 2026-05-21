const searchInput = document.getElementById("paper-search-input");
const tagSelect = document.getElementById("paper-tag-select");
const countElement = document.getElementById("paper-count");

const viewButtons = document.querySelectorAll(".view-button");

const views = {
  table: document.getElementById("table-view"),
  compact: document.getElementById("compact-view"),
  card: document.getElementById("card-view"),
};

let currentView = "table";

function getItemsInCurrentView() {
  return views[currentView].querySelectorAll(".paper-item");
}

function matchesSearch(item, query) {
  if (!query) return true;

  const searchableText = [
    item.dataset.title,
    item.dataset.authors,
    item.dataset.tags,
    item.dataset.hook,
  ].join(" ");

  return searchableText.includes(query);
}

function matchesTag(item, selectedTag) {
  if (selectedTag === "all") return true;

  const tags = item.dataset.tags.split(" ");
  return tags.includes(selectedTag.toLowerCase());
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedTag = tagSelect.value.toLowerCase();

  let visibleCount = 0;
  const currentItems = getItemsInCurrentView();

  currentItems.forEach((item) => {
    const visible = matchesSearch(item, query) && matchesTag(item, selectedTag);
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

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchView(button.dataset.view);
  });
});

switchView(currentView);