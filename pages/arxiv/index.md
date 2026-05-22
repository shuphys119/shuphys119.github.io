---
layout: page
title: arXiv reading list
permalink: /arxiv/
---

<link rel="stylesheet" href="{{ '/pages/arxiv/papers.css' | relative_url }}">

<div class="arxiv-page">

<h1>arXiv reading list</h1>

<p class="database-link">
  <a href="{{ '/arxiv/database/' | relative_url }}">Open full database</a>
</p>

<div class="paper-toolbar">
  <input
    id="paper-search-input"
    type="search"
    placeholder="Search title, author, tag, hook..."
    aria-label="Search papers"
  />

  <select id="paper-tag-select" aria-label="Filter by tag">
    <option value="all">all tags</option>
    {% for tag in site.data.arxiv_tags %}
      {% assign clean_tag = tag | strip %}
      {% unless clean_tag == "" %}
      <option value="{{ clean_tag }}">{{ clean_tag }}</option>
      {% endunless %}
    {% endfor %}
  </select>

  <label class="selected-filter">
    <input id="selected-only-checkbox" type="checkbox" />
    selected only
  </label>

  <div class="paper-view-buttons" aria-label="View switcher">
    <button type="button" class="view-button active" data-view="date-title-authors" title="Date, title, authors">☰</button>
    <button type="button" class="view-button" data-view="title-authors" title="Title, authors">≡</button>
  </div>
</div>

<div id="paper-count" class="paper-count"></div>

<div id="date-title-authors-view" class="paper-view">
  {% for month in site.data.arxiv_months %}
    {% assign month_key = month | strip %}
    {% assign papers = site.data.arxiv[month_key] %}
    {% assign papers_newest_first = papers | reverse %}

    {% for paper in papers_newest_first %}
    <p
      class="paper-item paper-compact-item"
      data-title="{{ paper.title | downcase | escape }}"
      data-authors="{{ paper.authors | downcase | escape }}"
      data-tags="{{ paper.tags | join: ' ' | downcase | escape }}"
      data-hook="{{ paper.hook | downcase | escape }}"
      data-selected="{% if paper.selected == true %}true{% else %}false{% endif %}"
    >
      <span class="paper-date">{{ paper.date }}</span>
      —
      <a
        href="{{ paper.url }}"
        class="paper-title{% if paper.selected == true %} selected-paper-title{% endif %}"
      >{{ paper.title }}</a>
      —
      <span class="paper-authors">{{ paper.authors }}</span>
    </p>
    {% endfor %}
  {% endfor %}
</div>

<div id="title-authors-view" class="paper-view" style="display:none;">
  {% for month in site.data.arxiv_months %}
    {% assign month_key = month | strip %}
    {% assign papers = site.data.arxiv[month_key] %}
    {% assign papers_newest_first = papers | reverse %}

    {% for paper in papers_newest_first %}
    <p
      class="paper-item paper-title-authors-item"
      data-title="{{ paper.title | downcase | escape }}"
      data-authors="{{ paper.authors | downcase | escape }}"
      data-tags="{{ paper.tags | join: ' ' | downcase | escape }}"
      data-hook="{{ paper.hook | downcase | escape }}"
      data-selected="{% if paper.selected == true %}true{% else %}false{% endif %}"
    >
      <a
        href="{{ paper.url }}"
        class="paper-title{% if paper.selected == true %} selected-paper-title{% endif %}"
      >{{ paper.title }}</a>
      —
      <span class="paper-authors">{{ paper.authors }}</span>
    </p>
    {% endfor %}
  {% endfor %}
</div>

</div>

<script src="{{ '/pages/arxiv/papers.js?v=8' | relative_url }}"></script>