---
title: Our Team
sectionid: team
homesection: true
order: 3
layout: page
bg: "bg-imac.jpg"
description: Chris Sargent and Jess Duguid make an awesome team at Sticky Pixel
published: true
cont_size: --m
classlist: has__bgimg section--detail
jsActContent: na
---

{% assign team = site.team | sort:"order" %}

{% for member in team %}
  {% include components/member.html %}
{% endfor %}
