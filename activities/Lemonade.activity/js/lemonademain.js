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
  
  function addMsg(msg) {
      messageQueue.append(msg);
      if(messageQueue.length > constants.MAX_MSG) {
          this.messageQueue.pop(0);
      }
  }
  
  function clearQueue() {
      this.messageQueue = [];
  }
  
  function weatherChange() {
      this.weather += Math.floor((Math.random() * 3) - 1);  // returns [-1, 1]
      
      // Looks like it's going to rain tomorrow
      if(this.weather <= 0) {
          this.weather = 0;
      } else if (this.weather >= 2) {       // going to be hot tomorrow
          this.weather = 2;
      }
  }
  
  function randomEvent() {
      let eventNum = Math.floor(Math.random() * 11);    // returns [0, 10]
      
      if(eventNum < constants.EVENTS.length) {
          let evnt = constants.EVENTS[eventNum];
          let itemCount = this.countItem(evnt['item']);
          
          if(evnt['change'] < 0) {
              let remove = Math.abs(evnt['change']);
              if (itemCount > remove) {
                  this.removeItem(evnt['item'], remove);
              } else {
                  this.removeItem(evnt['item'], itemCount);
              }
          } else {
              this.addItem(evnt['item'], evnt['change']);
          }
          
          this.addMsg(evnt['text']);
      }
  }
  
  function processDayLogic(items) { 
      this.clearQueue();
      this.day += 1;
      let startMoney = this.resources['money'];
      this.addMsg("Starting Money: $" + startMoney);
      
      for(const item in items) {
          let status = this.buyItem(item, items[item]);
          if(status == -1) {
              this.addMsg("You can't afford any units of " + constants.ITEMS[item]['name'] + ".");
          } else {
              this.addMsg("Bought " + items[item] + " units of " + constants.ITEMS[item]['name'] + ".");
          }
      }
      
      let invHold = [];
      for(const itemKey in Object.keys(constants.ITEMS)) {
          if(this.resources['recipe'][itemKey] == 0) {
              continue;
          }
          invHold.append(this.countItem(itemKey) / this.resources['recipe'][itemKey]);
      }
      
      sales = Math.min(invHold);
      
      if(sales != 0) {
          if(this.weather == 0) {
              sales = Math.floor(sales * .8);
          } else if (this.weather == -1) {
              sales = Math.floor(sales * .6);
          }
      }
      
      for(const itemKey in Object.keys(constants.ITEMS)) {
          this.removeItem(itemKey, sales * this.resources['recipe'][itemKey]);
      }
      
      this.resources['last_income'] = sales * this.resources['price'];
      this.addMsg("Sold " + sales + " cups, at $" + this.resources['price'] + " each.");
      
      if (this.difficulty < constants.DIFFICULTY.indexOf("Impossible")) {
          this.addMsg("You spent $" + (this.resources['money'] - startMoney) + " on supplies");
          this.addMsg("and made $" + this.resources['last_income'] + " in sales.");
      }
      
      let profitToCalc = (this.resources['money'] - startMoney) + this.resources['last_income'];
      this.resources['last_profit'] = profitToCalc;
      
      if(profitToCalc > 0) {
          if(this.difficulty < constants.DIFFICULTY.indexOf("Hard")) {
              this.addMsg("That comes to $" + this.resources['last_profit'] + " in profit.");
          }
          
          return true;
      } else {
          this.resources['money'] += this.resources['last_income'];
          this.processDayEnd();
          return false;
      }
  }
  
  function processChange(mini_game_key) { 
      if(this.resources['last_profit'] > 0) {
          let miniGameSuccess = this.count_game(mini_game_key, this.resources['last_profit']);
          if(miniGameSuccess) {
              this.resources['money'] += this.resources['last_income'];
          } else {
              this.addMsg("That is the incorrect amount of money. Try again.");
              return false;
          }
          
          return true;
      }
  }
  
  function processDayEnd() { 
      this.decayItems();
      this.weatherChange();
      this.randomEvent();
  }
  
  function buyItem(key, quantity) { 
      let theItem = constants.ITEMS[key];
      
      let total = quantity * theItem['bulk'];
      let cost = theItem['cost'] * total;
      
      if(cost < this.resources['money']) {
          this.resources['money'] -= cost;
          this.addItem(key, total);
          return total;
      } else {
          let bulkPrice = theItem['bulk'] * theItem['cost'];
          let canBuy = this.resources['money'] / bulkPrice;
          
          if(canBuy != 0) {
              total = canBuy * theItem['bulk'];
              this.resources['money'] -= canBuy * bulkPrice;
              this.addItem(key, total);
              return total;
          } else { return -1; }
      }
  }
  
  function addItem(key, quantity) {
      let total = quantity;
      this.resources[key].append(constants.ITEMS[key]['decay'], total);
  }
  
  function removeItem(key, quantity) {
      let toRemove = quantity;
      let resource = [...this.resources];
      
      while (toRemove > 0) {
          try {
              let item = resource.pop(0);
          } catch (err) {
              console.log(err);
              return false;
          }
          
          if(item[1] > toRemove) {
              item[1] -= toRemove;
              resource.insert(0, item);
              break;
          } else {
              toRemove -= item[1];
          }
      }
      
      this.resources = resource;
      return true;
  }
  
  function decayItems() {
      for(const itemKey in Object.keys(constants.ITEMS)) {
          let newList = [];
          
          for(const item in this.resources[itemKey]) {
              if (item[0] != 1) {
                  if (item[0] == 0) {
                      newList.append([item[0], item[1]]);
                  } else {
                      newList.append([item[0] - 1, item[1]]);
                  }
              } else if (item[1] != 0) {
                  this.addMsg("" + item[1] + " " + item_key + " have gone bad");
              }
              
              this.resources[itemKey] = newList;
          }
      }
  }
  
  function countItem(key) {
      let count = 0;
      for (const item in this.resources[key]) {
          count += item[1];
      }
      return count;
  }
  
  function countGame(values, target) {
      // not sure how to convert this:
      
      // currency_values = sorted(list(CURRENCY.items()), key=itemgetter(1), reverse=True)
      
      // into js
      let currencyValues = [];
      
      let previousValue = target;
      for(const [key, val] of Object.entries(currencyValues)) {
          let calVal = (val * values[key]);
          if(calVal > previousValue) {
              return false;
          }
          
          target -= calVal;
          previous_value = val;
      }
      
      if (target == 0) {
          return true;
      } else { return false; }
  }
}
