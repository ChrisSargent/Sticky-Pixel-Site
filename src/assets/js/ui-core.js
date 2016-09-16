/*!
 * Custom Sticky Pixel Javascript
 */

var StickyPixel = {

	init: function() {
		cache = this.cacheDom;
		this.bindUIActions();
	},

	cacheDom: {
		$mainNav: $('#main-nav'),
		$window: $(window),
		$page: $('html, body'),
		$intLink: $('a[href^="#"]'),
		$mobileNavCheck: $('#mobile-nav-check')
	},

	bindUIActions: function() {
		cacheThis = this;
		cache.$window.bind('scroll', this.shrinkMainNav);
		cache.$intLink.bind('click', this.pageScroll);
	},

	shrinkMainNav: function() {
		if (cache.$mainNav.offset().top > 50) {
			cache.$mainNav.addClass('navbar-shrink');
		} else if (cache.$mainNav.offset().top <= 50) {
			cache.$mainNav.removeClass('navbar-shrink');
		}

	},

	pageScroll: function(event) {
		event.preventDefault();
		StickyPixel.hideMobileNav();
		$anchor = $($(this).attr('href'));

		cache.$page.stop().animate({
			scrollTop: $anchor.offset().top
		}, 1000, 'easeInOutExpo');
	},

	hideMobileNav: function(event) {
		cache.$mobileNavCheck.prop('checked', false);
	}
};

// Submit Form - writes document URL to a hidden field
var currURL = document.location.href;
document.getElementById("fieldukkddk").value = currURL;

(function() {
	StickyPixel.init();
})();
