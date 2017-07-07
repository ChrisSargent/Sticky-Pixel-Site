---
layout: default
ident: home
use_sitedesc: true
title: Are you ready to <br>delight your customers?
sub_title: You've come to the right place; we help our clients create beautiful and effective digital experiences.
bg: bg-polygon.jpg
buttons:
    -   url: "#about"
        text: Learn More &#x25BE;
    -   url: "#contact"
        text: Get in Touch
---

{% assign fp_sections = site.home | sort:"order" | where: "published", true %}

{% for fp_section in fp_sections %}
  {% include section.html section=fp_section %}
{% endfor %}
