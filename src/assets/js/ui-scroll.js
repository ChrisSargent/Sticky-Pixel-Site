var uiScroll = (function () {
  var smController, smScenes, domScenes

  function init () {
    // Create an empty array for the scenes
    smScenes = {}

    // Initialise ScrollMagic controller
    smController = new ScrollMagic.Controller()

    // Find domScenes
    domScenes = document.querySelectorAll('.js__scn')
    _initScenes()
  }

  function _initScenes () {
    for (var i = 0; i < domScenes.length; i++) {
      var scene = domScenes[i]
      smScenes[scene.id] = new ScrollMagic.Scene({
        triggerElement: scene,
        triggerHook: 0.7,
        reverse: true
      }).addTo(smController)
      .setClassToggle(scene, 'js--active')
    }
  }

  return {
    init: init
  }
})()
