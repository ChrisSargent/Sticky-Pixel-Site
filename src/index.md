---
layout: default
ident: home
title: We create digital<br> products that grow.
sub_title: Sticky Pixel is the partner of choice for international companies who need a team experienced in full-lifecycle product development.
meta_title: Digital Product Design & Development | Sticky Pixel
meta_description: Sticky Pixel is a digital product design & development agency, relentless in the pursuit of creating beautiful and effortless digital experiences.
classlist: shadow
buttons:
  - url: '#contact'
    text: Get in Touch
---

{% assign fp_sections = site.home | sort:"order" | where: "published", true %}

{% for fp_section in fp_sections %}
{% include section.html section=fp_section %}
{% endfor %}
