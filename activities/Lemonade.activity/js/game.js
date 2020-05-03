function Game(stage, document, activity) {
  var main = new LemonadeMain(constants.DIFFICULTY[1]);
  var gameMode = 2; // 0: store, 1: bank, 2: field

  function _loadImg(source) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function (event) {
        var _img = event.target;
        resolve(_img);
      };
      img.src = source;
    });
  }

  function _iconChild(source, scale) {
    return _loadImg(source).then(function (img) {
      var loading = new createjs.Bitmap(img);
      loading.scaleX = scale;
      loading.scaleY = scale;
      loading.imgwidth = scale * img.width;
      loading.imgheight = scale * img.height;
      return loading;
    });
  }

  function _backgroundChild(source) {
    return _loadImg(source).then(function (img) {
      var loading = new createjs.Bitmap(img);
      loading.scaleX = stage.canvas.width / img.width;
      loading.scaleY = stage.canvas.height / img.height;
      return loading;
    });
  }

  function _ingredientcountChild() {
    var icwidth = 0.45 * stage.canvas.width;
    var icheight = 0.24 * stage.canvas.height;
    var ingredientcount = new createjs.Shape();
    ingredientcount.graphics
      .beginFill("white")
      .drawRect(0, 0, icwidth, icheight);
    var container = new createjs.Container();
    container.x = stage.canvas.width - icwidth;
    container.y = stage.canvas.height - icheight;
    container.addChild(ingredientcount);
    var iconScale = 0.2;
    var cupIcon = _iconChild("images/icon-cup.gif", iconScale);
    var lemonIcon = _iconChild("images/icon-lemon.gif", iconScale);
    var sugarIcon = _iconChild("images/icon-sugar.gif", iconScale);
    Promise.all([cupIcon, lemonIcon, sugarIcon]).then(function (values) {
      var iconpadright = 20;
      var iconpadtop = 10;

      var containerWidth = stage.canvas.width - container.x;
      var containerHeight = stage.canvas.height - container.y;
      var cupBitmap = values[0];
      var lemonBitmap = values[1];
      var sugarBitmap = values[2];
      cupBitmap.x += 0 * (containerWidth / 3) + iconpadright;
      cupBitmap.y += iconpadtop;
      lemonBitmap.x += 1 * (containerWidth / 3) + iconpadright;
      lemonBitmap.y += iconpadtop;
      sugarBitmap.x += 2 * (containerWidth / 3) + iconpadright;
      sugarBitmap.y += iconpadtop;
      container.addChild(values[0], lemonBitmap, sugarBitmap);

      var countpadtop = 5;

      var cupCount = new createjs.Text(0, "12px Arial", "#000");
      var lemonCount = new createjs.Text(0, "12px Arial", "#000");
      var sugarCount = new createjs.Text(0, "12px Arial", "#000");
      cupCount.x = cupBitmap.x + cupBitmap.imgwidth / 2;
      cupCount.y = cupBitmap.y + cupBitmap.imgheight + countpadtop;
      lemonCount.x = lemonBitmap.x + lemonBitmap.imgwidth / 2;
      lemonCount.y = lemonBitmap.y + lemonBitmap.imgheight + countpadtop;
      sugarCount.x = sugarBitmap.x + sugarBitmap.imgwidth / 2;
      sugarCount.y = sugarBitmap.y + sugarBitmap.imgheight + countpadtop;
      var funds = new createjs.Text("Funds: $" + 0, "12px Arial", "#000");
      funds.x = containerWidth / 2 - lemonBitmap.imgwidth / 2;
      funds.y = containerHeight * 0.8;
      // funds.x = stage.canvas.height;
      container.addChild(cupCount, lemonCount, sugarCount, funds);
    });

    return container;
  }

  function _datablockChild() {
    var datablockwidth = 0.16 * stage.canvas.width;
    var datablockheight = 0.24 * stage.canvas.height;
    var datablock = new createjs.Shape();
    datablock.graphics
      .beginFill("black")
      .drawRect(0, 0, datablockwidth, datablockheight);
    var container = new createjs.Container();
    container.x = 10;
    container.y = 10;
    // prettier-ignore
    var logMsg =  // placeholder
      "Weather: " + 0 + "\n\n" +
      "- Recipe: -\n" +
      "   Sugar: " + 0 + "\n" +
      "   Lemons: " + 0 + "\n" +
      "   Cups: " + 0;
    txt = new createjs.Text(logMsg, "12px Arial", "#FFF");
    var msgpadleft = 15;
    var msgpadtop = 15;
    txt.x = msgpadleft;
    txt.y = msgpadtop;
    container.addChild(datablock, txt);
    txt.lineHeight = 1.25 * txt.getMeasuredLineHeight();
    return container;
  }

  function _logChild() {
    var logwidth = 0.3 * stage.canvas.width;
    var logheight = 0.3 * stage.canvas.height;
    var log = new createjs.Shape();
    log.graphics.beginFill("white").drawRect(0, 0, logwidth, logheight);
    var container = new createjs.Container();
    container.x = 0;
    container.y = (stage.canvas.height - logheight + 100) / 2;
    container.addChild(log);
    // prettier-ignore
    var logMsg = // placeholder
      "- Day " + 0 + " Log -\n" +
      "Starting Money: $" + 0 + "\n" +
      "Bought " + 0 + " units of Cups.\n" +
      "Bought " + 0 + " units of Lemons.\n" +
      "Bought " + 0 + " units of Sugar.\n" +
      "Sold " + 0 + " cups, at " + 0  + " each\n" +
      "You spent $" + 0 + " on supplies\n" +
      "and made $" + 0 + " in sales";
    txt = new createjs.Text(logMsg, "12px Arial", "#000");
    container.addChild(txt);
    txt.lineHeight = 1.25 * txt.getMeasuredLineHeight();
    var logtxtpadleft = 15;
    var logtxtpadtop = 15;
    txt.x = logtxtpadleft;
    txt.y = logtxtpadtop;
    return container;
  }

  function drawSplash() {
    _backgroundChild("images/splash.gif").then(function (background) {
      stage.addChild(background);
      document.onkeydown = function (event) {
        if (event.keyCode === constants.KEYCODE.ENTER) {
          main.splash = false;
          draw();
        }
      };
    });
  }

  function drawStore() {
    var background = _backgroundChild("images/store-outline.gif");
    Promise.all([background]).then(function (values) {
      var background = values[0];
      stage.addChild(background);
      document.onkeydown = function (event) {
        if (event.keyCode === constants.KEYCODE.ENTER) {
          gameMode = 2; // field
          draw();
        }
      };
    });
  }

  function drawField() {
    var log = _logChild();
    var datablock = _datablockChild();
    var ingredientcount = _ingredientcountChild();
    var weather = constants.WEATHER[main.weather];
    var background = _backgroundChild("images/field_" + weather + ".gif");
    var booth = _iconChild("images/booth.gif", 0.5);

    Promise.all([background, booth]).then(function (values) {
      var background = values[0];
      var booth = values[1];
      booth.x = stage.canvas.width * 0.6;
      booth.y = stage.canvas.height * 0.52;
      stage.addChild(background, booth, log, datablock, ingredientcount);
      document.onkeydown = function (event) {
        if (event.keyCode === constants.KEYCODE.ENTER) {
          gameMode = 0; // store
          draw();
        }
      };
    });
  }

  function draw() {
    stage.removeAllChildren();
    if (main.splash) {
      drawSplash();
    } else if (gameMode === 0) {
      drawStore();
    } else {
      drawField();
    }
  }

  this.stop = function () {
    activity.close();
  };

  this.init = function () {
    draw();
  };
}
