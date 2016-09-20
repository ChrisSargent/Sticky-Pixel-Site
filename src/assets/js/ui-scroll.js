var uiScroll = (function() {
  var smController, s;

  function init() {

    var scenes;

    // Initialise ScrollMagic controller
    smController = new ScrollMagic.Controller();

    s = {
      classes: {
        scene: '.js__sce',
        action: 'js__act',
        actionFind: '[class*="js__act"]',
        typeSplit: '--',
        orderSplit: '-'
      },
      scene: {
        triggerHook: 0.7
      },
      overlap: 1,
    };

    scenes = document.querySelectorAll(s.classes.scene);
    _setScenes(scenes);
  }

  function _setScenes(scenes) {
    for (var i = 0; i < scenes.length; i++) {
      scenes[i].uiActions = _setupActions(scenes[i]);
      _setupScenes(scenes[i]);
    }
  }

  function _setupScenes(scene) {
    scene.uiScene = new ScrollMagic.Scene({
      triggerElement: scene,
      triggerHook: s.scene.triggerHook,
      reverse: true,
    });
    scene.uiScene.addTo(smController)
      .on('start', function() {
        _doAnimations(scene, 0);
      });
  }

  function _setupActions(scene) {
    var props, actions;
    actions = scene.querySelectorAll(s.classes.actionFind);

    for (var i = 0; i < actions.length; i++) {
      props = _getActionProps(actions[i]);
      actions[i].uiActionOrder = props.order;
      actions[i].uiActionType = props.type;
      actions[i].uiActionDuration = props.duration;
    }
    actions = _createSortedArray(actions, 'uiActionOrder');

    return actions;
  }

  function _getActionProps(el) {
    var prefixIndex, animSwitches, animClass, props, cssDuration;

    props = {}

    // Find the index of the action class prefix
    prefixIndex = el.className.indexOf(s.classes.action);

    // Make an array with a single item using the action class prefix as the start and a space as the end
    animClass = el.className.substr(prefixIndex).split(' ');

    // Split that array once on the '--' and once on the '-' parts
    animSwitches = animClass[0].split(s.classes.typeSplit)[1].split(s.classes.orderSplit);
    props.type = animSwitches[0];
    props.order = animSwitches[1];
    cssDuration = window.getComputedStyle(el, null).getPropertyValue("transition-duration");
    props.duration = parseFloat(cssDuration) * 1000 * s.overlap;

    return props;
  }

  function _createSortedArray(obj, key) {
    // Change the element nodelist in to a proper array so we can sort it
    var arr = Object.keys(obj).map(function(key) {
      return obj[key]
    });
    arr.sort(function(a, b) {
      return parseFloat(a[key]) - parseFloat(b[key]);
    });

    return arr;
  }

  function _doAnimations(scene, i) {
    var compValue;

    if (i >= scene.uiActions.length) {
      // Don't do anything if we handled all the actions
      return;
    }

    currAct = scene.uiActions[i]

    if (i === scene.uiActions.length - 1) {
      compValue = false;
      nextAct = false;
    } else {
      nextAct = scene.uiActions[i + 1];
      compValue = nextAct.uiActionOrder;
    }

    currAct.classList.toggle('js--active');

    if (currAct.uiActionOrder === compValue) {
      i++;
      _doAnimations(scene, i);
    } else {
      setTimeout(function() {
        i++;
        _doAnimations(scene, i);
      }, currAct.uiActionDuration);
    }

  }

  return {
    init: init
  }
})();
