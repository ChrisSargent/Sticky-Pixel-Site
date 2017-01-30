---
heading: Our Team
ident: team
homesection: true
order: 4
bg: "bg-imac.jpg"
published: true
cont_size: --m
classlist: has__bgimg
js_act_content: 'null'
---

{% assign team = site.team | sort: "order" | where: "published", true %}

{% for member in team %}
  {% include member.html %}
{% endfor %}

{% include subscript.html %}
