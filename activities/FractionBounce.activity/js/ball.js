class Ball {
  constructor(inX, inY, inGrav, inCtx, inRadius) {
    this.x = inX;
    this.y = inY;
    this.radius = inRadius;
    this.grav = inGrav;
    this.ctx = inCtx;
  }

  update() {
    this.y -= this.grav;
  }

  render() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "#003300";
    this.ctx.stroke();
    this.ctx.restore();
  }
}
