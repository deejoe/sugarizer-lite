define(["sugar-web/graphics/palette"], function(palette) {
  "use strict";

  var settingspalette = {};

  var selectedBtn = [true, false, false]; // selection activity

  settingspalette.challenges = [[[]]];

  settingspalette.gameRef = {};

  settingspalette.SettingsPalette = function(invoker, primaryText) {
    palette.Palette.call(this, invoker, primaryText);

    var div = document.createElement("div");
    div.setAttribute("id", "palette-div");

    let fractionupper = document.createElement("input");
    fractionupper.className = "fraction-text";
    fractionupper.setAttribute("id", "fraction-upper");
    fractionupper.setAttribute("type", "text");
    fractionupper.setAttribute("value", "");

    let fractionlower = document.createElement("input");
    fractionlower.className = "fraction-text";
    fractionlower.setAttribute("id", "fraction-lower");
    fractionlower.setAttribute("type", "text");
    fractionlower.setAttribute("value", "");

    var addfraction = document.createElement("button");
    addfraction.className = "toolbutton palette-button";
    addfraction.setAttribute("id", "add-fraction-button");
    addfraction.setAttribute("title", "Add fraction");

    addfraction.onclick = function() {
      let up = fractionupper.value;
      let low = fractionlower.value;

      if (isNaN(up) || isNaN(low)) {
        // invalid numbers
        return;
      }
      let frac = up / low;
      if (frac > 1.0 || frac < 0) {
        //invalid range
        return;
      }

      let fracStr = `${parseInt(up)}/${parseInt(low)}`;
      let size = parseInt(low);
      if (settingspalette.challenges.length == 7) {
        settingspalette.challenges.push([]);
      }
      settingspalette.challenges[7].push([fracStr, size, 0]);

      console.log(settingspalette.challenges);
    };

    var chooseball = document.createElement("button");
    chooseball.className = "toolbutton palette-button";
    chooseball.setAttribute("id", "choose-ball-button");
    chooseball.setAttribute("title", "Choose ball");
    chooseball.onclick = function() {};

    var choosebg = document.createElement("button");
    choosebg.className = "toolbutton palette-button";
    choosebg.setAttribute("id", "choose-bg-button");
    choosebg.setAttribute("title", "Choose background");
    choosebg.onclick = function() {};

    var parag = document.createElement("p");
    parag.innerHTML = "/";
    div.appendChild(fractionupper);
    div.appendChild(parag);
    div.style = "font-size: 28px";
    div.appendChild(fractionlower);
    div.appendChild(addfraction);
    div.appendChild(chooseball);
    div.appendChild(choosebg);

    this.setContent([div]);

    let fracBtn = document.querySelector("#fraction-button");
    let secBtn = document.querySelector("#sector-button");
    let perBtn = document.querySelector("#percent-button");

    let switchFracBtn = () => {
      selectedBtn[0] = !selectedBtn[0];
      fracBtn.style.backgroundColor = selectedBtn[0] ? "black" : "";
      settingspalette.gameRef.drawInFractionForm = selectedBtn[0];
    };

    let switchSecBtn = () => {
      selectedBtn[1] = !selectedBtn[1];
      secBtn.style.backgroundColor = selectedBtn[1] ? "black" : "";
      settingspalette.gameRef.drawAsPie = selectedBtn[1];
    };

    let switchPercentBtn = () => {
      selectedBtn[2] = !selectedBtn[2];
      perBtn.style.backgroundColor = selectedBtn[2] ? "black" : "";
    };

    fracBtn.style.backgroundColor = "black";
    fracBtn.onclick = () => {
      switchFracBtn();
      if (selectedBtn[2]) {
        switchPercentBtn();
      }
    };

    secBtn.onclick = () => {
      switchSecBtn();
    };

    perBtn.onclick = () => {
      switchPercentBtn();
      if (selectedBtn[0]) {
        switchFracBtn();
      }
    };
  };

  var addEventListener = function(type, listener, useCapture) {
    return this.getPalette().addEventListener(type, listener, useCapture);
  };

  settingspalette.SettingsPalette.prototype = Object.create(
    palette.Palette.prototype,
    {
      addEventListener: {
        value: addEventListener,
        enumerable: true,
        configurable: true,
        writable: true
      }
    }
  );
  settingspalette.SettingsPalette.prototype.setShared = function(state) {
    this.setShared(state);
  };

  return settingspalette;
});
