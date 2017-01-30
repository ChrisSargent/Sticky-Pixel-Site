---
title: Our Team
sectionid: team
homesection: true
order: 4
bg: "bg-imac.jpg"
published: true
cont_size: --m
classlist: has__bgimg
jsActContent: na
use_sitedesc: true
---

{% assign team = site.team | sort:"order" | where: "published", true %}

{% for member in team %}
  {% include member.html %}
{% endfor %}

{% include subscript.html %}
