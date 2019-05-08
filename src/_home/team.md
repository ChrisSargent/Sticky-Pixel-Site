---
title: Our Team
ident: team
order: 5
published: true
cont_size: --m
classlist: dark shadow
js_act_content: 'null'
---

{% assign team = site.team | sort: "order" | where: "published", true %}

{% for member in team %}
{% include member.html %}
{% endfor %}
