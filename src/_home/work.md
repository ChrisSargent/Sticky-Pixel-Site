---
title: Our Work
sectionid: work
homesection: true
order: 2
bg_color: #15110e
published: true
classlist: section--work
---

{% assign work = site.work | sort:"order" | where: "published", true %}

<ul>
  {% for case-study in work %}
    {% include case-study.html %}
  {% endfor %}
</ul>
