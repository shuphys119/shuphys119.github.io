---
layout: page
title: arXiv database
permalink: /arxiv/database/
---

<link rel="stylesheet" href="{{ '/pages/arxiv/papers.css' | relative_url }}">

<div class="arxiv-page">

<h1>arXiv database</h1>

<p class="database-link">
  <a href="{{ '/arxiv/' | relative_url }}">Back to reading list</a>
</p>

<div class="paper-toolbar">
  <input
    id="paper-search-input"
    type="search"
    placeholder="Search title, author, tag, hook..."
    aria-label="Search papers"
  />

  <label class="selected-filter">
    <input id="selected-only-checkbox" type="checkbox" />
    selected only
  </label>

  <div class="tag-filter">
    <div class="tag-mode">
      <span class="tag-mode-label">tags:</span>

      <label>
        <input type="radio" name="tag-mode" value="or" checked />
        OR
      </label>

      <label>
        <input type="radio" name="tag-mode" value="and" />
        AND
      </label>
    </div>

    <div class="tag-checkboxes">
      {% for tag in site.data.arxiv_tags %}
        {% assign clean_tag = tag | strip %}
        {% unless clean_tag == "" %}
        <label class="tag-checkbox">
          <input
            type="checkbox"
            class="tag-filter-checkbox"
            value="{{ clean_tag | downcase | escape }}"
          />
          <span>{{ clean_tag }}</span>
        </label>
        {% endunless %}
      {% endfor %}
    </div>
  </div>
</div>

<div id="paper-count" class="paper-count"></div>

<div id="database-view" class="paper-view">
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
      {% for month in site.data.arxiv_months %}
        {% assign month_key = month | strip %}
        {% assign papers = site.data.arxiv[month_key] %}
        {% assign papers_newest_first = papers | reverse %}

        {% for paper in papers_newest_first %}
        <tr
          class="paper-item"
          data-title="{{ paper.title | downcase | escape }}"
          data-authors="{{ paper.authors | downcase | escape }}"
          data-tags="{% for tag in paper.tags %}{{ tag | strip | downcase | escape }}||{% endfor %}"
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
      {% endfor %}
    </tbody>
  </table>
</div>

</div>

<script src="{{ '/pages/arxiv/papers.js?v=9' | relative_url }}"></script>