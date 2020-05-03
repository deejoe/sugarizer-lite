define([
  "sugar-web/activity/activity",
  "easeljs",
  "activity/lemonademain",
  "activity/constants",
  "activity/game",
], function (act) {
  // Manipulate the DOM only when it is ready.
  requirejs(["domReady!"], function (doc) {
    // Initialize the activity.
    act.setup();
    runactivity(act, doc);
  });
});

function runactivity(act, doc) {
  var canvas;
  var stage;

  function init() {
    canvas = document.getElementById("actualcanvas");
    canvas.width = 640;
    canvas.height = 480;
    stage = new createjs.Stage(canvas);
    stage.update();
    stage.mouseEventsEnabled = false;

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", handleTick);
    var g = new Game(stage, doc, act);
    function handleTick() {
      stage.update();
    }
    setTimeout(function () {
      g.init();
    }, 500);

    window.addEventListener("activityStop", function (eve) {
      eve.preventDefault();
      g.stop(act);
    });
  }
  init();
}
