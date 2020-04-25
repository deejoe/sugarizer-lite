define(["sugar-web/activity/activity"], function (activity) {

	// Manipulate the DOM only when it is ready.
	requirejs(['domReady!'], function (doc) {

		// Initialize the activity.
		activity.setup();
        
        // get title screen variables from DOM
        const title = document.querySelector("#title");                 // title view
        const playButton = document.querySelector("#title-button");     // play button on title
        
        // get game variables from DOM
        const game = document.querySelector("#game");                   // game view
        const scoreNum = document.querySelector("#score-num");          // x POINTS; update .innerHTML when a problem is solved (possibly use hurdleNum - 1?)
        const hurdleNum = document.querySelector("#hurdle-num");        // Hurdle #x; update .innerHTML when a problem is solved
        const problem = document.querySelector("#problem");             // 1/3 + 1; actual fraction problem
        const choices = [
            document.querySelector("#choice-1"),                        // upper left choice
            document.querySelector("#choice-2"),                        // upper right choice
            document.querySelector("#choice-3"),                        // lower left choice
            document.querySelector("#choice-4")                         // lower right choice
        ];
        const unicorn = document.querySelector("#uni");                 // move this using .style.left toward the hurdle, based speed on a timer
        const gameOver = document.querySelector("#game-over");          // set .hidden = false when unicorn collides with hurdle/after a set amount of time
        
        // hide title screen for game
        playButton.onclick = () => { 
            title.style.display = "none";       // default set to "flex"
            game.style.display = "block";       // default set to "none"
        };

	});

});
