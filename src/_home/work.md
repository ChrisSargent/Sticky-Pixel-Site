---
title: Our Work
sectionid: work
homesection: true
order: 2
layout: page
bg_color: #15110e
published: true
type: ourwork
---

{% assign work = site.work | sort:"order" | where: "published", true %}

{% for case-study in work %}
  {% include case-study.html %}
{% endfor %}
