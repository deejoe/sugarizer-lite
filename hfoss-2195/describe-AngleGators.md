# AngleGators (PY)

### Assignees
zethra(1)

# Game mechanics

## Title screen
When the game is started, the player is presented with this title screen.  There
is also a 'How to play' button that displays the rules, a credits button that
displays the names of the authors, and a quit button that exits the game.

![image](https://user-images.githubusercontent.com/6034238/79921791-03189d80-8401-11ea-9351-23fa226680ee.png)

We'll start with the game itself.  The payer clicks 'Start' to start

## The Game

The game screen consists of the alligator on the right and various food items
coming in from the right.  Each food item has a number above it, denoting an
angle.  These are in increments of of 10 from 10 to 90 degrees. The player then
presses the left and right arrow keys to open and close the alligators mouth.
The player must open the mouth to angle matching the number on the food.  The
angle the mouth is open is also displayed as a number.  The current score and
number of teeth are displayed at the top right.

![image](https://user-images.githubusercontent.com/6034238/79922005-32c7a580-8401-11ea-9d2b-af628bf8898b.png)

## Scoring

The alligator starts with three "teeth" if a food reaches the alligator and its
mouth isn't open wide enough, the alligator losses a tooth.  If the alligator
runs out of teeth the game ends and returns to the title screen.  If the
alligator's mouth is open wide enough then the player receives points.  They
receive 20 points if the mouth is open the exact right amount, 10 point if they
are off by 10 degrees and 5 points if they are off by 20 degrees.

# Other screens

How to play

![image](https://user-images.githubusercontent.com/6034238/79925995-cac98d00-8409-11ea-8292-1e3bbacc1792.png)

Credits

![image](https://user-images.githubusercontent.com/6034238/79926003-d321c800-8409-11ea-9ccd-5a95ca7ebbf2.png)
