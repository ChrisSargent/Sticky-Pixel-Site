---
id: home
layout: default
use_sitedesc: true
heading:
    pre: Ready to build
    post: something beautiful?
sub_heading: You've come to the right place. We are experts at bringing ideas to life by building the things you see and interact with online.
buttons:
    -   url: "#about"
        text: Learn More &#x25BE;
    -   url: "#contact"
        text: Get in Touch
---

{% assign fp_sections = site.home | sort:"order" | where: "homesection", true %}

{% for fp_section in fp_sections %}
  {% include section.html section=fp_section %}
{% endfor %}

{% contentblock additional_content %}
