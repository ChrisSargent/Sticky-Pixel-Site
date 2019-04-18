---
# These are displayed on the page `&nbsp;<br>` controls where the line is broken on mobile / desktop
title: Meet your new ready-made&nbsp;<br>product team.
sub_title: We’re a boutique team who can cater to the full lifecycle of your digital product; From Idea to Release.
# These are used for the page title in the browser and key for SEO
meta_title: Digital Product Design & Development | Sticky Pixel
meta_description: Sticky Pixel is a product design & development agency, end-to-end. 

# You can change the text on the buttons
# The url is the section it points to on the page and must start with a `#`
# `&#x25BE` is a down arrow
buttons:
  - url: '#about'
    text: About &#x25BE;
  - url: '#contact'
    text: Work with us

# Set to false if you want to disable the page
published: true

# No need to change below this line ---
bg: bg-polygon.jpg
layout: default
ident: home
---

{% assign fp_sections = site.home | sort:"order" | where: "published", true %}

{% for fp_section in fp_sections %}
{% include section.html section=fp_section %}
{% endfor %}
