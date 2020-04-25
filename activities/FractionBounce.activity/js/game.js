class Game {
  constructor(inCtx, inWidth, inHeight, inBall) {
    this.ctx = inCtx;
    this.ctx.width = inWidth;
    this.ctx.height = inHeight;
    this.rampHeight = 50;
    this.rampColor = "#050505";
    this.gridColor = "#D0D0D0";
    this.lineWidth = 2;
    this.ball = inBall;
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
      lCtx.stroke();
      lCtx.closePath();
    }
    lCtx.restore();
  }

  render() {
    let width = this.ctx.width;
    let height = this.ctx.height;

    this.ctx.clearRect(0, 0, width, height);
    this.ctx.save();
    this.ctx.fillStyle = "#6FCA1E";
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.restore();
    this.displayRamp(10);
    this.ball.render();
  }

  update() {
    this.ball.update();
  }
}
