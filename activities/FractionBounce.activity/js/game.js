const CHALLENGES = [
  [
    ["1/2", 2, 0],
    ["1/3", 3, 0],
    ["1/4", 4, 0],
    ["2/4", 4, 0],
    ["2/3", 3, 0],
    ["3/4", 4, 0]
  ],
  [
    ["1/8", 8, 0],
    ["2/8", 8, 0],
    ["3/8", 8, 0],
    ["4/8", 8, 0],
    ["5/8", 8, 0],
    ["6/8", 8, 0],
    ["7/8", 8, 0]
  ],
  [["1/6", 6, 0], ["2/6", 6, 0], ["3/6", 6, 0], ["4/6", 6, 0], ["5/6", 6, 0]],
  [["1/5", 10, 0], ["2/5", 10, 0], ["3/5", 10, 0], ["4/5", 10, 0]],
  [
    ["1/10", 10, 0],
    ["2/10", 10, 0],
    ["3/10", 10, 0],
    ["4/10", 10, 0],
    ["5/10", 10, 0],
    ["6/10", 10, 0],
    ["7/10", 10, 0],
    ["8/10", 10, 0],
    ["9/10", 10, 0]
  ],
  [
    ["1/12", 12, 0],
    ["2/12", 12, 0],
    ["3/12", 12, 0],
    ["4/12", 12, 0],
    ["3/12", 12, 0],
    ["6/12", 12, 0],
    ["7/12", 12, 0],
    ["8/12", 12, 0],
    ["9/12", 12, 0],
    ["10/12", 12, 0],
    ["11/12", 12, 0]
  ],
  [
    ["1/16", 4, 0],
    ["2/16", 4, 0],
    ["3/16", 4, 0],
    ["4/16", 4, 0],
    ["5/16", 4, 0],
    ["6/16", 4, 0],
    ["7/16", 4, 0],
    ["8/16", 4, 0],
    ["9/16", 4, 0],
    ["10/16", 4, 0],
    ["11/16", 4, 0],
    ["12/16", 4, 0],
    ["13/16", 4, 0],
    ["14/16", 4, 0],
    ["15/16", 4, 0]
  ]
];

const SUCCESS = new Image();
SUCCESS.src = "activity/../images/smiley.svg";
const FAIL = new Image();
FAIL.src = "activity/../images/frown.svg";

class Game {
  constructor(inCtx, inWidth, inHeight, inRampDivisions, inBall) {
    this.ctx = inCtx;
    this.ctx.width = inWidth;
    this.ctx.height = inHeight;
    this.rampHeight = 50;
    this.rampDivisions = inRampDivisions;
    this.rampColor = "#050505";
    this.gridColor = "#D0D0D0";
    this.lineWidth = 2;
    this.ball = inBall;
    this.lastDivision = "";
    this.lastSegment = -1;
    this.lastArray = -1;
    this.widthDivisions = [{}]; // used to later look up in which section is the division
    this.answers = {};
  }

  resize(inWidth, inHeight) {
    this.ctx.width = inWidth;
    this.ctx.height = inHeight;
    this.render();
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  randBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  resetGame() {
    // set the ball back at the starting location
    this.ball.x = this.ctx.width / 2;
    this.ball.y = 100;
    // make a new division
    this.selectDivision();
  }

  selectDivision() {
    // the outer array can be between 0 and the size of the challenges
    let selectedArr = -1;
    do {
      selectedArr = this.randBetween(0, CHALLENGES.length);
    } while (selectedArr == this.lastArray);
    this.lastArray = selectedArr;

    // the selected segment can be between 0 and the length of the array
    let selectedSegment = -1;
    do {
      selectedSegment = this.randBetween(0, CHALLENGES[selectedArr].length);
    } while (selectedSegment == this.lastSegment);
    this.lastSegment = selectedSegment;

    let segment = CHALLENGES[selectedArr][selectedSegment];
    this.lastDivision = segment[0];
    this.rampDivisions = segment[1];

    // cache the divisions so you can look them up when evaluating if the player hit the right division
    this.calculateRampWidthDivisions(this.rampDivisions);

    // increment the amount of times this item has been seen
    segment[2]++;
  }

  // return a {} with the division + whether it is true (player got it) or false (player missed the target)
  evaluateAnswer() {
    let result = { division: this.lastDivision, won: false };
    let xPos = this.ball.x;

    let numDivision = this.convertDivisionStringToNumber(this.lastDivision);

    this.widthDivisions.forEach(val => {
      if (xPos >= val.wStart && xPos <= val.wEnd) {
        // we've landed in an actual section
        // but is it the right one?
        let divSectionNumber = this.convertDivisionStringToNumber(val.division);
        if (Math.abs(numDivision - divSectionNumber) < 0.1) {
          result.won = true;
        }
      }
    });
    return result;
  }

  convertDivisionStringToNumber(divString) {
    let myRegexp = /(\d*)\/(\d*)/g;
    let res = myRegexp.exec(divString);
    let grp1 = parseInt(res[1], 10);
    let grp2 = parseInt(res[2], 10);
    return grp1 / grp2;
  }

  calculateRampWidthDivisions(n) {
    let lCtx = this.ctx;
    let width = lCtx.width;

    this.widthDivisions = [];
    this.widthDivisions.push({
      wStart: 0,
      wEnd: width / n,
      division: `${1}/${n}`
    });

    for (let i = 1; i < n; i++) {
      this.widthDivisions.push({
        wStart: this.widthDivisions[i - 1].wEnd,
        wEnd: (i + 1) * (width / n),
        division: `${i + 1}/${n}`
      });
    }
  }

  displayRamp(n) {
    let lCtx = this.ctx;
    let width = lCtx.width;
    let height = lCtx.height;

    // Display triangle
    lCtx.save();
    lCtx.fillStyle = this.rampColor;
    lCtx.beginPath();
    lCtx.moveTo(0, height - 1);
    lCtx.lineTo(width - 1, height - 1);
    lCtx.lineTo(width - 1, height - 1 - this.rampHeight);
    lCtx.closePath();
    lCtx.fill();
    lCtx.restore();

    // Display grid
    lCtx.save();
    lCtx.strokeStyle = this.gridColor;
    lCtx.lineWidth = this.lineWidth;
    for (let i = 0; i < n; i++) {
      lCtx.beginPath();
      lCtx.moveTo(i * (width / n), height - 1);
      lCtx.lineTo((i + 1) * (width / n), height - 1);
      lCtx.lineTo(
        (i + 1) * (width / n),
        height - 1 - ((i + 1) * this.rampHeight) / n
      );
      if (i > 0) {
        lCtx.lineTo(i * (width / n), height - 1 - (i * this.rampHeight) / n);
      }
      lCtx.closePath();
      lCtx.stroke();
    }
    lCtx.restore();
  }

  displayScore() {
    let margin = 30;
    let xOffset = 40;
    let yOffset = 30;
    let lCtx = this.ctx;
    let lAnswers = this.answers;
    lCtx.save();
    lCtx.font = "15px Arial";
    lCtx.textAlign = "center";
    Object.keys(lAnswers).forEach(function(fraction, i) {
      lCtx.fillText(fraction, margin + xOffset * i, margin);
      lAnswers[fraction].won.forEach(function(won, j) {
        let img = won ? SUCCESS : FAIL;
        lCtx.drawImage(img, margin - 13 + xOffset * i, margin + yOffset * j + 15);
      });
    });
    lCtx.restore();
  }

  // anything that should happen right before the game starts
  beginPlay() {
    this.selectDivision();
  }

  render() {
    let width = this.ctx.width;
    let height = this.ctx.height;

    this.ctx.clearRect(0, 0, width, height);
    this.ctx.save();
    this.ctx.fillStyle = "#6FCA1E";
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.restore();
    this.displayRamp(this.rampDivisions);
    this.displayScore();
    this.ball.render();

    this.ctx.save();
    this.ctx.font = "15px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.lastDivision, this.ball.x - 8, this.ball.y - 48);
    this.ctx.font = "30px Arial";
    this.ctx.fillText("0", this.ctx.width / 35, this.ctx.height - 25);
    this.ctx.fillText("1", this.ctx.width - 25, this.ctx.height / 1.09);
    this.ctx.restore();
  }

  checkCollision() {
    let rampHeight =
      this.ctx.height - this.rampHeight * (this.ball.x / this.ctx.width);
    if (this.ball.y + this.ball.radius >= rampHeight) return true;
    return false;
  }

  update() {
    if (!this.checkCollision()) {
      this.ball.update();
    } else {
      const res = this.evaluateAnswer();
      if (res.won) {
        console.log("correct");
        // @todo: make a win sound
        // @todo: add a visual for the wrong answer
      } else {
        // @todo: make a loose sound
        // @todo: add a visual for the right answer
      }
      if(res.division in this.answers) {
        this.answers[res.division].won.push(res.won);
      } else {
        this.answers[res.division] = {won: [res.won]};
      }
      // regardless of winning or losing -> reset the ball position
      this.resetGame();
    }
  }
}
