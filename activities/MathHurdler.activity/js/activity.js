define(["sugar-web/activity/activity"], function (activity) {
    function getFraction()
    {
        return [Math.floor(Math.random() * 3), 2 + Math.floor(Math.random() * 3)];
    }
    function addFractions(frac1, frac2)
    {
        return [frac1[0] * frac2[1] + frac1[1] * frac2[0], frac1[1] * frac2[1]];
    }
    function reduceFrac(frac) {
        let num = frac[0];
        let den = frac[1];
        // Check all primes less than 25
        [2,3,5,7,11,13,17,19,23].forEach(p => {
            while(true) {
                if(num%p === 0 && den%p === 0) {
                    // Divisible by number
                    num/=p;
                    den/=p;
                } else {
                    // Not divisible, stop checking this one
                    break;
                }
            }
        });
        return [num, den];
    }
    function getFractionDisplay(frac)
    {
        if(frac[0] === 0) {
            return "0";
        }
        frac = reduceFrac(frac);
        if(frac[0] < frac[1]) {
            return frac[0] + "/" + frac[1];
        }
        // Check for perfect multiple
        if(frac[0] % frac[1] === 0) {
            return frac[0] / frac[1];
        }
        // Convert to improper fraction
        return (Math.floor(frac[0]/frac[1]) + " " + (frac[0] % frac[1]) + "/" + frac[1]);
    }
    // Returns a problem of the form
    // {problem: "<problem>", answers: ["answer1", "answer2", "answer3", "answer4"], correctAnswer: <0-3>}
    function getProblem()
    {
        const frac1 = getFraction();
        const frac2 = getFraction();
        const correctFrac = addFractions(frac1, frac2);
        const problem = getFractionDisplay(frac1) + " + " + getFractionDisplay(frac2);
        // Generate four incorrect answers
        const answers = [
            getFractionDisplay(addFractions(getFraction(), getFraction())),
            getFractionDisplay(addFractions(getFraction(), getFraction())),
            getFractionDisplay(addFractions(getFraction(), getFraction())),
            getFractionDisplay(addFractions(getFraction(), getFraction())),
        ];
        const correctAnswerText = getFractionDisplay(correctFrac);
        // Replace a random one with the correct answer
        const correctAnswer = Math.floor(Math.random()*4);
        answers[correctAnswer] = correctAnswerText;
        // Check if any in answers are equal
        for(let i=1;i<4;i++) {
            if(answers.indexOf(answers[i]) !== i) {
                // This answer has occurred before in the list, bail on this problem and issue a new one
                return getProblem();
            }
        }
        return {
            problem,
            answers,
            correctAnswer
        };
    }

    const states = {
        /**
         * Game loading menu.  Move to Starting when Play pressed.
         */
        LoadMenu: Symbol(),
        /**
         * A problem has not been issued.  Temporary state that should always be resolved before the next frame.
         */
        Starting: Symbol(),
        /**
         * A problem has been issued and we are waiting on the user to press a button.
         * When a button is pressed, move to CorrectPending or IncorrectPending
         * At hurdle time, move to Crashing.
         */
        ProblemIssued: Symbol(),
        /**
         * The correct answer has been issued.
         * At hurdle time, move to Hurdling.
         */
        CorrectPending: Symbol(),
        /**
         * The incorrect answer has been issued.
         * At hurdle time, move to Crashing.
         */
        IncorrectPending: Symbol(),
        /**
         * The horse is currently hurdling.
         * Once the horse is over the hurdle, move to Starting.
         */
        Hurdling: Symbol(),
        /**
         * The gate is crashing.
         * Once the animation is finished, move to GameOver.
         */
        Crashing: Symbol(),
        /**
         * End state, further user interaction should reset the script.
         */
        GameOver: Symbol(),
    }
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

        // Clicked - lists which button was clicked in the previous frame (if any)
        let clicked = null;
        for(let i=0;i<4;i++) {
            choices[i].addEventListener("click", () => {
                clicked = i;
            });
        }

        // Initialize game
        let state = states.LoadMenu;
        let unicornPosition = 0;
        let unicornHeight = 0;
        let correctAnswer = null;
        let problemNum = 0;

        // hide title screen for game
        playButton.onclick = () => { 
            state = states.Starting;
            title.style.display = "none";       // default set to "flex"
            game.style.display = "block";       // default set to "none"
        };
        
        let stateHandlers = {};
        stateHandlers[states.LoadMenu] = (deltaTime) => {}; // No-op
        stateHandlers[states.Starting] = (deltaTime) => {
            unicornPosition = 0;
            //unicornHeight = 0;
            choices.forEach(x => {
                x.style.backgroundColor = "";
            })
            state = states.ProblemIssued;
            const currentProblem = getProblem();
            problem.innerText = currentProblem.problem;
            for(let i=0;i<4;i++) {
                choices[i].innerText = currentProblem.answers[i];
            }
            correctAnswer = currentProblem.correctAnswer;
        };
        stateHandlers[states.ProblemIssued] = (deltaTime) => {
            unicornPosition += deltaTime/10;
            if(clicked === correctAnswer) {
                // Correct answer, move to state CorrectPending
                state = states.CorrectPending;
                // Highlight correctly picked answer
                choices[clicked].style.backgroundColor = "green";
            } else if(clicked !== null) {
                // Incorrect answer, move to state IncorrectPending
                state = states.IncorrectPending;
                // Highlight incorrectly picked answer
                choices[clicked].style.backgroundColor = "red";
            }
            if(unicornPosition > window.innerWidth * (1200/1920)) {
                state = states.Crashing;
            }
        };
        stateHandlers[states.CorrectPending] = (deltaTime) => {
            unicornPosition += deltaTime/2;
            if(unicornPosition > window.innerWidth * (1200/1920)) {
                state = states.Hurdling;
            }
        };
        stateHandlers[states.IncorrectPending] = (deltaTime) => {
            unicornPosition += deltaTime/2;
            if(unicornPosition > window.innerWidth * (1200/1920)) {
                state = states.Crashing;
            }
        };
        stateHandlers[states.Hurdling] = (deltaTime) => {            
            if(unicornPosition > window.innerWidth * (1800/1920)) {
                problemNum++;
                scoreNum.innerText = problemNum;
                hurdleNum.innerText = (problemNum+1);
                state = states.Starting;
            } else if(unicornPosition > window.innerWidth * (1700/1920)) {
                unicornPosition += deltaTime/4;
                unicornHeight = 0;
            } else if(unicornPosition > window.innerWidth * (1450/1920)) {
                unicornPosition += deltaTime/4;
                unicornHeight -= deltaTime/4;
            } else {
                unicornPosition += deltaTime/4;
                unicornHeight += deltaTime/4;
            }
        };
        stateHandlers[states.Crashing] = (deltaTime) => {
            state = states.GameOver;
            
            // Show unicorn crash animation and stop the normal animation
            unicorn.style.animation = "crashAnim 1s forwards";
        };
        stateHandlers[states.GameOver] = (deltaTime) => {
        };
        let time=Date.now();
        let animationFrame=() => {
            requestAnimationFrame(animationFrame); // Perform this function on the next frame
            let oldTime = time;
            time = Date.now();
            let deltaTime = time - oldTime; // Time in ms since last frame
            // Run state handler for current state
            stateHandlers[state](deltaTime);
            // Update unicorn position to match
            unicorn.style.left = unicornPosition + "px";
            // Update unicorn height to match
            unicorn.style.top = "calc(70% - " + (130+unicornHeight) + "px";
            // Show game over screen iff state is GameOver
            gameOver.hidden = (state !== states.GameOver);
            
            // Reset clicked 
            clicked = null;
        };

        requestAnimationFrame(animationFrame);

	});

});
