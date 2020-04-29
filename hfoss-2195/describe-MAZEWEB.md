# MazeWeb (JS)
### Assignees
ymoullec(1), zethra(2), cja1093(3)  

<br>

## Principle of the game

After a short animation, the player is presented a game screen containing a maze and a little smiley face.  
They have to lead the smiley face to the exit which is represented by a colored square.
When you complete the maze, there is a short animation and a sound, then the player is presented with a larger (and harder maze).

<br>
<img src=https://user-images.githubusercontent.com/49918367/79732756-6537ac80-82f4-11ea-8689-508f9445a809.png>
<br>

## Player input and game mechanics

To move around, the player has two options. They can either **left-click** or use **arrow keys**.
Left-clicking will lead the smiley toward the direction indicated by the relative position of the cursor and the face (click underneath the face to go down).  
The arrow keys work in a similar way.  
You **cannot use both** the arrow keys and the mouse during a single maze: when you use the kind type of input, it results in creating a second smiley face at the start of the maze. This second face will be controlled using the second type of input, the first one by the first type. I guess this can be used for multiplayer (2 vs 2) if the two players take turns.  
When moving in a direction, **the smiley face only stops at the next intersection**, which makes in easier to move around.  

<br>

## Menus

There are no menus in this activity as explained in the first section.
The only icons in the toolbar are basic activity tools, common to most activities.  

---

<br>

## Template activity

The code part is going to be a little bit messier as I'm also learning how Sugarizer activities work.
First, to code a Sugarizer activity, you should check out (and probably start from) the [template activity](https://github.com/ritjoe/sugarizer-lite/blob/master/activities/ActivityTemplate/).
It provides the basic structure for activities, which I'm going to summarize here (but you might as well go check it out yourself).
The activity folder contains activity information and icon.
The css folder contains a css file for the activity.
The lib folder contains all required libraries including sugar libraries.
In the root directory, there is also the html page for the activity and a file containing dependencies.
The js directory contains two files: **activity.js** and **loader.js**.

### loader.js

The loader.js file is used to **setup imports** from the libs to the activity.js file.
This is done using the [requireJS](https://requirejs.org/docs/api.html) library, which I don't know, so again you might as well check it out yourself.
Here is the basic structure of the file:

```javascript
requirejs.config({
    baseUrl: "lib",
    paths: {
        activity: "../js"
    }
});
requirejs(["activity/activity"]);
```

All libraries that need to be loaded and that are defined by calling `define()` (in the library source code) will be handled by the previous code.
However, you may need to use some traditional/legacy "browser globals" scripts that do not express their dependencies via define().
For those, you can use the shim config (add these lines to `requireJS.config` for a file named rot.js that will be exported as ROT):

```javascript
shim: {
    'rot': {
        exports: 'ROT'
    },
    // OTHER LIBRARIES
}
```

To import libraries, see the next section.

### activity.js

Located in the js directory, this is the main JS file.

```javascript
define(["sugar-web/activity/activity" /* OTHER DEPENDENCIES */], function (activity, /* OTHER IMPORTED STUFF */) {

	// Manipulate the DOM only when it is ready.
	requirejs(['domReady!'], function (doc) {
		// Initialize the activity.
		activity.setup();

        // YOUR CODE GOES HERE
	});
});
```
In `/* OTHER DEPENDENCIES */`, you can list the libraries you need to import (as you set them to be exported in loader.js).
You then have to name them in `/* OTHER IMPORTED STUFF */` as parameters of the function to be able to use them in your code.

I think that's it for what I could understand of the basic structure of a sugarizer activity.
Next were may be able to go more into depth about the code of this specific activity called MazeWeb.  

<br>

They way this, and many other, activities are structured is sort of two parts, as described in [architecture doc](https://github.com/ritjoe/sugarizer-lite/blob/master/docs/architecture.md).  There is the sugar-web code that added the top bar and other sugarizer elements to the activity page, and then there is the activities code than renders the rest of the activity.  These can be more or less separate, depending on the activity.  

<br>

When the user starts an activity all that happens is the the browser navigates to that activities [index.html](https://github.com/ritjoe/sugarizer-lite/blob/master/activities/MazeWeb.activity/index.html) page. So lets start by looking at that.
Here are a few key sections in the body

First we have this section that creates the sugarizer tool bar at the top of the page
```html
<div id="main-toolbar" class="toolbar">
  <button class="toolbutton" id="activity-button" title="My Activity"></button>
  <button class="toolbutton" id="network-button" title="Network"></button>
  <button class="toolbutton pull-right" id="stop-button" title="Stop"></button>
  <button class="toolbutton" id="restart-button" title="Restart"></button>
</div>
```
Basically every activity needs to have this in some form, otherwise the user wouldn't be able to leave the page.  The css and js to make this work in included in the head section and live in the `lib` directory that every activity has.  

After this in the body is the html where the actual game is rendered
```html
<div id="canvas">
  <canvas id="maze"></canvas>
</div>
```
In the case of Maze web, it's basically just and html canvas that the js code can render onto.
