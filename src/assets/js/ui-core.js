/*!
 * Custom Sticky Pixel Javascript
 */


var StickyPixel = (function() {
  var uiCache = {};
  var last_known_scroll_position = 0;
  var ticking = false;

  function _init() {
    _cacheDom();
    _bindUIActions();
    _writeURLToInput();
  };

  function _cacheDom() {
    uiCache = {
      mainNav: document.getElementById('main-nav'),
      mobileNavCheck: document.getElementById('mobile-nav-check'),
      intLinks: document.querySelectorAll('a[href^="#"]'),
    }
  };

  function _bindUIActions() {
    // Throttle scroll event with request animation frame: https://developer.mozilla.org/en-US/docs/Web/Events/scroll
    window.addEventListener('scroll', function(e) {
      last_known_scroll_position = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          _shrinkMainNav(last_known_scroll_position);
          ticking = false;
        });
      }
      ticking = true;
    });
    for (var i = 0; i < uiCache.intLinks.length; i++) {
      uiCache.intLinks[i].addEventListener('click', _pageScroll);
    }
  };

  function _shrinkMainNav(scrollPos) {
    if (scrollPos > 50) {
      uiCache.mainNav.classList.add('navbar-shrink');
    } else if (scrollPos <= 50) {
      uiCache.mainNav.classList.remove('navbar-shrink');
    }
  };

  function _pageScroll(event) {
    var targetId, targetEl;
    event.preventDefault();
    _hideMobileNav();

    targetId = event.target.hash.split('#')[1];
    targetEl = document.getElementById(targetId);
    _scrollTo(document.body, targetEl.offsetTop, 450);
  };

  function _scrollTo(element, to, duration) {
    var start = element.scrollTop,
      change = to - start,
      increment = 20;

    var _animateScroll = function(elapsedTime) {
      elapsedTime += increment;
      var position = _easeInOut(elapsedTime, start, change, duration);
      element.scrollTop = position;
      if (elapsedTime < duration) {
        setTimeout(function() {
          _animateScroll(elapsedTime);
        }, increment);
      }
    };

    _animateScroll(0);
  }

  function _easeInOut(currentTime, start, change, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1) {
      return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
  }


  function _hideMobileNav(event) {
    uiCache.mobileNavCheck.checked = false;
  };

  function _writeURLToInput() {
    // Submit Form - writes document URL to a hidden field
    var currURL = document.location.href;
    document.getElementById("fieldukkddk").value = currURL;
  };


  // Run the Initialise Function when the Dom is ready
  _init();
})();
