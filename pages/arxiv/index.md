---
layout: page
title: arXiv reading list
permalink: /arxiv/
---

<link rel="stylesheet" href="{{ '/pages/arxiv/papers.css' | relative_url }}">

<div class="arxiv-page">

<h1>arXiv reading list</h1>

<div class="paper-toolbar">
  <input
    id="paper-search-input"
    type="search"
    placeholder="Search title, author, tag, hook..."
    aria-label="Search papers"
  />

  <select id="paper-tag-select" aria-label="Filter by tag">
    <option value="all">all tags</option>
    {% assign all_tags = site.data.papers | map: "tags" | join: "," | split: "," | uniq | sort %}
    {% for tag in all_tags %}
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
    <button type="button" class="view-button active" data-view="compact" title="Compact view">☰</button>
    <button type="button" class="view-button" data-view="table" title="Table view">▦</button>
  </div>
</div>

<div id="paper-count" class="paper-count"></div>

<div id="compact-view" class="paper-view">
  {% for paper in site.data.papers %}
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
</div>

<div id="table-view" class="paper-view" style="display:none;">
  <table class="paper-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Title</th>
        <th>Authors</th>
        <th>Tags</th>
        <th>Hook</th>
      </tr>
    </thead>
    <tbody>
      {% for paper in site.data.papers %}
      <tr
        class="paper-item"
        data-title="{{ paper.title | downcase | escape }}"
        data-authors="{{ paper.authors | downcase | escape }}"
        data-tags="{{ paper.tags | join: ' ' | downcase | escape }}"
        data-hook="{{ paper.hook | downcase | escape }}"
        data-selected="{% if paper.selected == true %}true{% else %}false{% endif %}"
      >
        <td>{{ paper.date }}</td>
        <td>
          <a
            href="{{ paper.url }}"
            class="paper-title{% if paper.selected == true %} selected-paper-title{% endif %}"
          >{{ paper.title }}</a>
        </td>
        <td>{{ paper.authors }}</td>
        <td>
          {% for tag in paper.tags %}
            {% assign clean_tag = tag | strip %}
            {% unless clean_tag == "" %}
            <code>{{ clean_tag }}</code>
            {% endunless %}
          {% endfor %}
        </td>
        <td>{{ paper.hook }}</td>
      </tr>
      {% endfor %}
    </tbody>
  </table>
</div>

</div>

<script src="{{ '/pages/arxiv/papers.js?v=2' | relative_url }}"></script>