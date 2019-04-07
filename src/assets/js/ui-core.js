/*!
 * Custom Sticky Pixel Javascript
 */

var stickypixel = (function() {
  var uiCache = {};

  function _init() {
    _cacheDom();
    _bindUIActions();
    _writeURLToInput();
  }

  function _cacheDom() {
    uiCache = {
      mainNav: document.getElementById('header--primary'),
      mobileNavCheck: document.getElementById('nav__toggle--primary'),
      intLinks: document.querySelectorAll('a[href^="#"]')
    };
  }

  function _bindUIActions() {
    var lastKnownScrollPosition = 0;
    var ticking = false;
    // Throttle scroll event with request animation frame: https://developer.mozilla.org/en-US/docs/Web/Events/scroll
    window.addEventListener('scroll', function(e) {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          _shrinkMainNav(lastKnownScrollPosition);
          ticking = false;
        });
      }
      ticking = true;
    });
    for (var i = 0; i < uiCache.intLinks.length; i++) {
      uiCache.intLinks[i].addEventListener('click', _pageScroll);
    }
  }

  function _shrinkMainNav(scrollPos) {
    if (scrollPos > 50) {
      uiCache.mainNav.classList.add('header--primary-shrink');
    } else if (scrollPos <= 50) {
      uiCache.mainNav.classList.remove('header--primary-shrink');
    }
  }

  function _pageScroll(event) {
    var targetId = _getTargetHash(event.target);
    var targetEl = document.getElementById(targetId);
    var targetScrollPosition = targetEl.getBoundingClientRect().top + window.scrollY;
    event.preventDefault();
    _scrollTo(targetScrollPosition, 450);
    _hideMobileNav();
  }

  function _getTargetHash(el) {
    var hash = '';

    while (el.parentNode) {
      if (el.hash) {
        break;
      }
      el = el.parentNode;
    }
    hash = el.hash.split('#')[1];
    // Need this in so that the browser updates the URL with the hash
    if (window.history.pushState) {
      window.history.pushState(null, null, el.hash);
    } else {
      window.location.hash = el.hash;
    }
    return hash;
  }

  function _scrollTo(to, duration) {
    var start = document.documentElement.scrollTop || document.body.scrollTop || 0;
    var change = to - start;
    var increment = 20;

    var _animateScroll = function(elapsedTime) {
      elapsedTime += increment;
      var position = _easeInOut(elapsedTime, start, change, duration);
      document.documentElement.scrollTop = position;
      document.body.scrollTop = position;

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
      return (change / 2) * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
  }

  function _hideMobileNav(event) {
    uiCache.mobileNavCheck.checked = false;
  }

  function _writeURLToInput() {
    // Submit Form - writes document URL to a hidden field
    var currURL = document.location.href;
    document.getElementById('fieldukkddk').value = currURL;
  }

  // Run the Initialise Function when the Dom is ready
  _init();
  uiScroll.init();
})();
