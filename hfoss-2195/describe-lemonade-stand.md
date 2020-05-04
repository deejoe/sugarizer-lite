# Lemonade-Stand

The best overview that I can give is available at [the RIT FOSS website](https://fossrit.github.io/projects/lemonade-stand) and the [SugarLabs website](https://activities.sugarlabs.org/en-US/sugar/addon/4321/).
This document goes over the background of the game, gives useful links to developer stuff.

# Running

According to the project readme on the gitforge https://github.com/FOSSRIT/lemonade-stand,
to run the project you simply need pygame and forgune engine installed. 

## pygame

Installing pygame was a bit pedantic with me. Simply running:

```
python3 -m pip install -U pygame --user
```

gave me issues. I managed to solve this my installing pygame for python 2 that was available in my package manager (version three was not available). This fixed all the dependency issues and allowed me to install the python 3 version via pip.

```
pacman -S python2-pygame
```

## Fortune

The Fortune game engine can be found in the [HFOSS github org](https://github.com/FOSSRIT/FortuneEngine).

### Notes on installing Fortune

First clone the fortune engine and change into its directory.

```
https://github.com/FOSSRIT/FortuneEngine.git
```

Second, run the install script. Note: must run as root for permissions or under a python virtual environment and it will not work under python3.

```
python2 setup.py install
```


## Bugs and Fixes

When running with the developer provided documentation we persistently ran into the issue "ImportError: No module named sugar.datastore".


@Iclare was able to get Lemonade-Stand working in sugar by directly running the activity.
This only seems to work for the downloaded activity. He tried doing the same with
<https://github.com/FOSSRIT/lemonade-stand> but I get an error about `sugar.datastore`
not being found.

So to run it in sugar you need to download from the browser activity <http://activities.sugarlabs.org/en-US/sugar/addons/versions/4321#version-5>
and try running it once. Then you go to the terminal activity, and run `cd ~/Activities/Lemonade.activity && python2 LemonadeStand.py`.

Keybinds are found here <http://wiki.sugarlabs.org/go/Lemonade_Stand> under `Game Play`
