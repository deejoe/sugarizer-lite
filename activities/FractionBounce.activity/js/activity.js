// Initialize the activity.

define(["sugar-web/activity/activity"], function(activity) {
  // Manipulate the DOM only when it is ready.
  requirejs(
    ["domReady!", "activity/settingspalette", "activity/game", "activity/ball"],
    function(doc, settingspalette) {
      // Link presence palette
      let palette = new settingspalette.SettingsPalette(
        document.getElementById("settings-button"),
        undefined
      );

      let canvas = document.getElementById("actualcanvas");
      canvas.height = canvas.parentElement.clientHeight;
	  canvas.width = canvas.parentElement.clientWidth;
      let ball = new Ball(canvas.width / 2, 100, -1, canvas.getContext("2d"), 50, undefined);
      let game = new Game(
        canvas.getContext("2d"),
        canvas.width,
        canvas.height,
        ball
	  );
	  let img = new Image();
	  img.onload = function() {
		game.ball.img = img;
	  }
	  img.src = "activity/../images/soccerball.svg";
	  let hScale = canvas.width / 100;
      window.addEventListener(
        "keydown",
        e => {
          switch (e.keyCode) {
            case 37:
              ball.x -= hScale;
              break;
            case 39:
              ball.x += hScale;
              break;
            default:
              break;
          }
        },
        false
	  );
	  window.addEventListener(
		  "resize",
		  () => {
			  canvas.height = canvas.parentElement.clientHeight;
			  canvas.width = canvas.parentElement.clientWidth;
			  game.resize(canvas.width, canvas.height);
			  hScale = canvas.width / 100;
		  },
		  false
	  );
      activity.setup();

      let fps = 60,
        //Get the start time
        start = Date.now(),
        //Set the frame duration in milliseconds
        frameDuration = 1000 / fps,
        //Initialize the lag offset
        lag = 0;

      //Start the game loop
      gameLoop();

      function gameLoop() {
        requestAnimationFrame(gameLoop);

        //Calcuate the time that has elapsed since the last frame
        let current = Date.now(),
          elapsed = current - start;
        start = current;
        //Add the elapsed time to the lag counter
        lag += elapsed;

        //Update the frame if the lag counter is greater than or
        //equal to the frame duration
        while (lag >= frameDuration) {
          //Update the logic here
          game.update();
          //Reduce the lag counter by the frame duration
          lag -= frameDuration;
        }
        // Calculate the lag offset and use it to render sprites and shapes
        var lagOffset = lag / frameDuration;
        game.render(lagOffset);
      }
    }
  );
});
