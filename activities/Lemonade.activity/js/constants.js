this.constants = Object.freeze({
  STARTING_MONEY: 1000,
  STARTING_PRICE: 150,
  MAX_MSG: 10,
  ITEMS: {
    cup: {
      name: "Cups",
      cost: 10,
      decay: 0,
      bulk: 12,
    },
    lemon: {
      name: "Lemons",
      cost: 35,
      decay: 5,
      bulk: 1,
    },
    sugar: {
      name: "Sugar",
      cost: 5,
      decay: 0,
      bulk: 50,
    },
  },
  WEATHER: ["cloudy", "nice", "hot"],
  EVENTS: [
    {
      text: "A lemon truck crashes in front of your stand!",
      item: "lemon",
      change: 10,
    },
    { text: "It starts raining cups!", item: "cup", change: 10 },
    { text: "Ants steal some of your supplies!", item: "sugar", change: -10 },
    {
      text: "A sugar salesman gives you some free samples!",
      item: "sugar",
      change: 10,
    },
  ],
  DIFFICULTY: ["Easy", "Normal", "Hard", "Impossible"],
  CURRENCY: {
    Dollars: 100,
    Quarters: 25,
    Dimes: 10,
    Nickels: 5,
    Pennies: 1,
  },
  RECIPES: {
    basic: {
      cup: 1,
      lemon: 2,
      sugar: 3,
      cost: 150,
    },
    strawberry: {
      cup: 1,
      lemon: 2,
      sugar: 2,
      strawberry: 1,
      cost: 225,
    },
    epic: {
      cup: 2,
      lemon: 3,
      sugar: 5,
      cost: 500,
    },
  },
  KEYCODE: {
    ENTER: 13,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
  },
});
