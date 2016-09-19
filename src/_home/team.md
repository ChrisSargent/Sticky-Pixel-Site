---
title: Our Team
sectionid: team
homesection: true
order: 3
layout: landing-page
bg: "bg-imac.jpg"
description: Chris Sargent and Jess Duguid make an awesome team at Sticky Pixel
published: true
---

{% assign team = site.team | sort:"order" %}

<div class="cleared">
{% for member in team %}
    <div class="col-2">
        <img src="{{ site.assets }}/img/{{ member.image }}" alt="{{ member.title }}" width="356" height="356">
        <h2>{{ member.title }}</h2>
        {{ member.content }}
    </div>
{% endfor %}
</div>
