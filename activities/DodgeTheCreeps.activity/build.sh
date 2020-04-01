#!/bin/sh

set -e

cd game
mkdir -p out
godot --export HTML5 out/game.html
cd ..
mv game/out .
