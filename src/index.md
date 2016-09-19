---
layout: front-page
use_sitedesc: true
heading_pre: Ready to build your
heading_post: beautiful website?
sub_heading: You've come to the right&nbsp;place.
buttons:
    -   url: "#about"
        text: Learn More &#x25BE;
    -   url: "#contact"
        text: Get in Touch
links:
    -   url: "#about"
        text: About Us
    -   url: "#services"
        text: Services
    -   url: "#team"
        text: Our Team
    -   url: "articles/free-fridays.html"
        text: Free Fridays
    -   url: "#contact"
        text: Contact Us
---
{% assign sections = site.home | sort:"order" | where: "homesection", true %}

<main>
    {% for page in sections %}
        {% include section.html %}
    {% endfor %}
</main>
