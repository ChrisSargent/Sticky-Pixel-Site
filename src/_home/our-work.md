---
title: Our Work
sectionid: our-work
homesection: true
order: 2
layout: page
bg_color: #15110e
published: true
type: ourwork
---

{% assign our-work = site.our-work | sort:"order" | where: "published", true %}

{% for case-study in our-work %}
  {% include case-study.html %}
{% endfor %}