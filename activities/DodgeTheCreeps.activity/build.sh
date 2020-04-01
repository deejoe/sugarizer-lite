#!/bin/sh

set -e

if [ -d out ]; then
    echo "Deleting out folder"
    rm -r out
fi

cd game
mkdir -p out
echo "Exporting game..."
godot --export HTML5 out/game.html
cd ..
mv game/out .

if command -v wasm-opt >/dev/null 2>&1; then
    echo "Optimizing wasm for size..."
    wasm-opt out/game.wasm -o out/game.wasm -Oz
    echo "Done"
else
    echo "Not optimizing wasm file, wasm-opt not installed"
fi