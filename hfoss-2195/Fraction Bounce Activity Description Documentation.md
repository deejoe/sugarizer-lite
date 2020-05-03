# Fraction Bounce

This document is an overview of the work done to analyze and describe the Python based Fraction Bounce 
activity for the Sugar Desktop for the purposes of building a Java Script equivalent activity for use in the Sugarizer-lite software.

## Overview

Fraction bounce is and activity for the Sugar desktop designed to teach and reinforce the principles of simple fractions and percentages through an interactive game format.

The game’s educational value is target towards children in or around the 4th grade level by providing visual understanding of 
basic fraction values and setting a good foundation for continued work with fractions.  It establishes the principals of equivalence and 
common denominators for the purposes of basic addition and subtraction of fractions.

The activity code can be found, read, downloaded, and installed from its base repository at https://github.com/sugarlabs/fractionbounce
The repository contains a README files with detailed information on the installation and implementation of the activity in the Sugar Desktop.

## Gameplay 

Players must nudge a bouncing ball to land on an area of the ground representing a percentage or fraction equivalent to the fraction displayed on the screen.  
Correct answers add a check to the background image.
  
* As time passes the delay between games decreases
* The longer you play the more complex the fractions become
* The bar at the bottom of the screen becomes solid at 100 correct answers
* Players can choose between fractions and percentages
* Can add custom fractions

*(summary of the user experience detailed by cja1093 in the “Describe FractionBounce” issue in the repository https://github.com/ritjoe/sugarizer-lite/issues/13 )*

### Based on questions posed by DennisSSDev and answered by cja1093

* Fractions are not randomly generated, they are stored as ‘challenges’ within the bounce.py code.  Therefore, there are predetermined fractions for each level of difficulty offered by the game
* Fractions/percentages are always between 0-1
* There are stored transform values for the ball applied to its position and rotation, therefore its movement is not based on any physics
* When a player drops the ball in the wrong section an ‘x’ is shown under the given fraction to denote the incorrect play

## Installation

It is not a part of Sugar Desktop but can be added via the browse method on an instance of Sugar. (Look for it on the sugarlabs activity list)
Note: I haven’t been able to get a working install of the activity on my sugarlive build

*(summary of the installation of FractionBounce by cja1093 in the “Describe FractionBounce” issue in the repository https://github.com/ritjoe/sugarizer-lite/issues/13)*
