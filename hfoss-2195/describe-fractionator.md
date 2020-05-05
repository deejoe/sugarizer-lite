# Describe Fractionator

This issue describes the Fractionator Sugarizer activity.
The purpose is to teach fraction ordering and equivalence by arranging cards representing fractions in the correct order.

The activity was created for a previous HFOSS class and can be found at <https://github.com/Fractionators/sugarizer>.
There is a Sugar Labs wiki page on the activity at <https://wiki.sugarlabs.org/go/Activities/Fractionator>.

## Running the activity
See <https://github.com/Fractionators/sugarizer#running-the-project>
>Download this repo (named Sugarizer)
>In your browser (ex. Chrome) go to your extensions
>Turn on developer mode
>Click on the "Load unpacked extension..."
>Choose the main folder of this repo and click OK
>Sugarizer should show up as an extension
>Click to launch Sugarizer

If you're using Chrome, Sugarizer will be available at `chrome://apps/`.
Fractionator should be in the list view once you're in.

### Main Menu 

<img width="665" alt="fractionators_main_menu" src="https://user-images.githubusercontent.com/39775343/79644027-3b577c00-8174-11ea-865c-85f44b745556.png">

Clicking `?` we get a 'How to Play' modal.

<img width="665" alt="fractionators_how_to_play" src="https://user-images.githubusercontent.com/39775343/79644025-3b577c00-8174-11ea-9715-493084ec72d2.png">


## Gameplay

This is what the standard game mode looks like with easy difficulty and 3 cards.

<img width="665" alt="fractionators_standard_easy_3" src="https://user-images.githubusercontent.com/39775343/79644029-3bf01280-8174-11ea-85b1-9a96eebae9d8.png">

Changing the difficulty to medium, some of the cards become number fractions. On hard difficulty, all cards are number fractions.

<img width="665" alt="fractionators_standard_medium_6" src="https://user-images.githubusercontent.com/39775343/79644030-3c88a900-8174-11ea-905c-96e7ba305425.png">

There is also a timed game mode. Your time to solve is compared against your best time solving that difficulty and card amount.

<img width="665" alt="fractionators_timed_game_mode" src="https://user-images.githubusercontent.com/39775343/79644031-3c88a900-8174-11ea-9941-cbdd3c1cd2c7.png">


## Code Notes

[HTML](https://github.com/Fractionators/sugarizer/blob/master/activities/Fractionator.activity/index.html) and [CSS](https://github.com/Fractionators/sugarizer/blob/master/activities/Fractionator.activity/css/activity.css)
-----
Both the HTML and CSS files are divided into different sections, which are all commented.
All of the pie chart fractions are created using CSS linear gradients rather than images, so that way they're can be scaled to any size display without a loss of quality.
Considering both of these files are nicely sectioned off and commented, they are relatively easy to read, provided you have any experience with HTML and CSS.

## [JavaScript](https://github.com/Fractionators/sugarizer/tree/master/activities/Fractionator.activity/js)
`activity.js` and `loader.js` are both Sugarizer files, seemingly unedited from whatever activity this is based off of. `jquery.js` and `jquery-sortable.js` are there to allow for JQuery to be used in the main activity code, with `jquery-sortable.js` being used to be able to drag the cards around in the game. `script.js` is the home to the actual game code.
`Object.freeze` is used to create what the developers call "pseudo-enumerators". Using freeze on an object prevents it from being edited. This is different from just defining a `const`, as a const would still allow for the the values inside of each variable to be edited.
Like the HTML and CSS, this code is sectioned off and commented well, which makes it very nice to read.
The fraction logic revolves around the `Fraction` "class", as well as the `possible` and `names` arrays. The `possible` and `names` arrays are populated within the `makeFractions` function. This function fills both arrays with possible fractions, with `names` giving the fraction in the form of a string, and `possible` giving the fraction in the form of a number. 
Now, try to stay with me here, since the names get a bit similar for this part. `randomFractions` returns an array of x amount of fractions. `randomFraction` returns a new `Fraction` object based on a random integer. `randomFractions` passes in its current array of fractions to `randomFractionNoDup` in a loop. `randomFractionsNoDup` checks the passed in array if a fraction exists, using the `hasFraction` and `hasValue` helper methods. If it is not in the array, then `randomFractionNoDup` calls `randomFraction`. The returned fraction is added into the array in `randomFactions`, and the loop begins again.
The next section is the `Timer` "class" object.  This is fairly straightforward, using `performance.now()`, which returns time in milliseconds as a timer. `this.start` gives the `Timer` object class needed variables and calls `this.update()`. `this.update` updates the time on screen. `this.stop` stops the timer from running.
The section titled Pie Chart Logic, beginning on line 195, creates pie chart vectors using JQuery to modify CSS, and using the `rotDeg` method to rotate a half circle to form a fraction.
Moving on to the section titled Main game logic, beginning on line 218.
`$(document).ready` will run once JQuery detects that the page is loaded and ready for code to be run. The majority of this code is spent adding event listeners via JQuery that shows and hides buttons depending on what the user clicks. `$("#cardList").sortable` uses `jquery-sortable.js` to be able to move and drag around cards in the game. Finally, a new `Timer` begins at the end of the function.
`setUpGame` and `check` functions are where the magic happens. `setUpGame` begins by grabbing some JQuery values to set the game mode, difficulty, and amount of fractions to create. `$("#check").prop("disabled",false);` on line 286 is simply using JQuery to set the value of "disabled" to `false` on the object with the ID `check`.
Lines 295 - 301 start and show the timer or hide it, depending on whether or not the user is playing a timed game.
Lines 303 - 336 simply set some variables based on the pseudo-enumerators declared at the top of the file.
From pretty much this point on, this function creates HTML elements, modifies some CSS, and shows these new HTML elements on the screen.
Finally, the `check` method which works by converting each of the fraction card elements into numbers, comparing them to the other fraction card numbers, and seeing if the order is correct. The process finishes by displaying a message if the user's results are correct. There is also a bit more displayed and a bit more information stored when the user is playing in timed mode, as the game stores best times in an array appropriately called `bestTimes`.