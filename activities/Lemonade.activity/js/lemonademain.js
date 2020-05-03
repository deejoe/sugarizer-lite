function LemonadeMain(difficultyLevel) {
  this.splash = true;
  this.day = 1;
  this.difficulty = difficultyLevel;
  this.resources = {
    money: constants.STARTING_MONEY,
    last_income: 0,
    last_profit: 0,
    price: constants.STARTING_PRICE,
    recipe: constants.RECIPES["basic"],
  };
  for (var itemKey of Object.keys(constants.ITEMS)) {
    this.resources[itemKey] = [];
  }
  this.weather = 1;
  this.messageQueue = [];
  weatherChange();
  randomEvent();

  function weatherChange() {}
  function randomEvent() {}
}
