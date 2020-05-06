# Fractionauts

Fractionauts is a math game to help learn fractions.

# How to build and run

Unlike most other sugarizer activities this one has to by built(tm).

## Linux

Fist install [Godot](https://godotengine.org/) and make sure the `godot`
binary is in your path.  Then run `build.sh` from this directory.  The
`out` folder with contain the generated game files.

# Design

Fractionauts was created using the godot game engine.  It is then compiled
used the web assembly output format so that it can run on the web.  There
is a html/css wrapper that loads the generated game and displays it with
the sugarizer top bar.

The `out` directory is not included in the repo because it's basically a
compiler artifact and the web assembly file can be quite large (10os of MBs).

# State of the Project

Fractionauts is, as of writing, incomplete.  It is a port of Fractionauts from
Sugar, original written in Python using pygame.  We've imported my of the assets
from Fractionauts and sey up most of scenes but the game logic is not written.
Hopefully future people can pick up development where we left off.