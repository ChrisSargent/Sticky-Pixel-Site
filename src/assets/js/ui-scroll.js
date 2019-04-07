var uiScroll = (function() {
  var smController, smScenes, domScenes;

  function init() {
    // Create an empty array for the scenes
    smScenes = {};

    // Initialise ScrollMagic controller
    smController = new ScrollMagic.Controller();

    // Find domScenes
    domScenes = document.querySelectorAll('.js__scn');

    _initScenes();
  }

  function _initScenes() {
    for (var i = 0; i < domScenes.length; i++) {
      var scene = domScenes[i];
      var sceneIds = scene.querySelectorAll('.pin--top');
      var sceneId = 'FECK';
      if (sceneIds.length) {
        scene.id = sceneIds[0].id;
      }
      smScenes[scene] = new ScrollMagic.Scene({
        id: 'FECK',
        triggerElement: scene,
        triggerHook: 0.7,
        reverse: true
      })
        .on('start', function(event, b) {
          console.log('event: ', event.target);

          if (event.scrollDirection !== 'REVERSE') {
            console.log('only forward: ', this);
          }
        })
        .addTo(smController)
        .setClassToggle(scene, 'js--active');
    }
  }

  return {
    init: init
  };
})();
