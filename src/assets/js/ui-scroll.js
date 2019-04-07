var uiScroll = (function() {
  function init() {
    // Find domScenes
    var domScenes = document.querySelectorAll('.js__scn');
    _initScenes(domScenes);
  }

  function _initScenes(domScenes) {
    var smController = new ScrollMagic.Controller();
    for (var i = 0; i < domScenes.length; i++) {
      var scene = domScenes[i];
      new ScrollMagic.Scene({
        triggerElement: scene,
        triggerHook: 0.7,
        reverse: true
      })
        .addTo(smController)
        .setClassToggle(scene, 'js--active');
    }
  }

  return {
    init: init
  };
})();
