define(["sugar-web/graphics/palette"], function (palette) {

    'use strict';

    var settingspalette = {};

    settingspalette.SettingsPalette = function (invoker, primaryText) {
		palette.Palette.call(this, invoker, primaryText);

		var div = document.createElement('div');
		div.setAttribute('id','palette-div');

		var fractionupper = document.createElement('input');
		fractionupper.className = 'fraction-text';
		fractionupper.setAttribute('id','fraction-upper');
		fractionupper.setAttribute('type','text');
		fractionupper.setAttribute('value','');

		var fractionlower = document.createElement('input');
		fractionlower.className = 'fraction-text';
		fractionlower.setAttribute('id','fraction-lower');
		fractionlower.setAttribute('type','text');
		fractionlower.setAttribute('value','');

		var addfraction = document.createElement('button');
		addfraction.className = 'toolbutton palette-button';
		addfraction.setAttribute('id','add-fraction-button');
		addfraction.setAttribute('title','Add fraction');
		addfraction.onclick = function() {}

		var chooseball = document.createElement('button');
		chooseball.className = 'toolbutton palette-button';
		chooseball.setAttribute('id','choose-ball-button');
		chooseball.setAttribute('title','Choose ball');
		chooseball.onclick = function() {}

		var choosebg = document.createElement('button');
		choosebg.className = 'toolbutton palette-button';
		choosebg.setAttribute('id','choose-bg-button');
		choosebg.setAttribute('title','Choose background');
		choosebg.onclick = function() {}
		
		div.appendChild(fractionupper);
		div.innerHTML = div.innerHTML + ' / ';
		div.style = 'font-size: 28px'
		div.appendChild(fractionlower);
		div.appendChild(addfraction);
		div.appendChild(chooseball);
		div.appendChild(choosebg);

		this.setContent([div]);
    };

    var addEventListener = function (type, listener, useCapture) {
        return this.getPalette().addEventListener(type, listener, useCapture);
    };

    settingspalette.SettingsPalette.prototype =
        Object.create(palette.Palette.prototype, {
            addEventListener: {
                value: addEventListener,
                enumerable: true,
                configurable: true,
                writable: true
            }
        });
	settingspalette.SettingsPalette.prototype.setShared = function(state) {
		this.setShared(state);
	}

    return settingspalette;
});
