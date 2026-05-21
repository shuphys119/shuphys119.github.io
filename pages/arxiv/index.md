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
    <button type="button" class="view-button active" data-view="table" title="Table view">▦</button>
    <button type="button" class="view-button" data-view="compact" title="Compact view">☰</button>
    <button type="button" class="view-button" data-view="card" title="Card view">▣</button>
  </div>
</div>

<div id="paper-count" class="paper-count"></div>

<div id="table-view" class="paper-view">
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
          >
            {% if paper.selected == true %}★ {% endif %}{{ paper.title }}
          </a>
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

<div id="compact-view" class="paper-view" style="display:none;">
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
    >
      {% if paper.selected == true %}★ {% endif %}{{ paper.title }}
    </a>
    —
    <span>{{ paper.authors }}</span>
    —
    {% for tag in paper.tags %}
      {% assign clean_tag = tag | strip %}
      {% unless clean_tag == "" %}
      <code>{{ clean_tag }}</code>
      {% endunless %}
    {% endfor %}
    —
    <span>{{ paper.hook }}</span>
  </p>
  {% endfor %}
</div>

<div id="card-view" class="paper-view" style="display:none;">
  <div class="paper-card-grid">
    {% for paper in site.data.papers %}
    <article
      class="paper-item paper-card"
      data-title="{{ paper.title | downcase | escape }}"
      data-authors="{{ paper.authors | downcase | escape }}"
      data-tags="{{ paper.tags | join: ' ' | downcase | escape }}"
      data-hook="{{ paper.hook | downcase | escape }}"
      data-selected="{% if paper.selected == true %}true{% else %}false{% endif %}"
    >
      <div class="paper-card-date">{{ paper.date }}</div>
      <h2>
        <a
          href="{{ paper.url }}"
          class="paper-title{% if paper.selected == true %} selected-paper-title{% endif %}"
        >
          {% if paper.selected == true %}★ {% endif %}{{ paper.title }}
        </a>
      </h2>
      <div class="paper-card-authors">{{ paper.authors }}</div>
      <div class="paper-card-tags">
        {% for tag in paper.tags %}
          {% assign clean_tag = tag | strip %}
          {% unless clean_tag == "" %}
          <code>{{ clean_tag }}</code>
          {% endunless %}
        {% endfor %}
      </div>
      <p>{{ paper.hook }}</p>
    </article>
    {% endfor %}
  </div>
</div>

</div>

<script src="{{ '/pages/arxiv/papers.js' | relative_url }}"></script>