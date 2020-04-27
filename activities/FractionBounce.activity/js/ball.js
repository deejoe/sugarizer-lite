class Ball {
  constructor(inX, inY, inGrav, inCtx, inRadius, inImg) {
    this.x = inX;
    this.y = inY;
    this.radius = inRadius;
    this.grav = inGrav;
    this.ctx = inCtx;
    this.img = inImg;
  }

  update() {
    this.y -= this.grav;
  }

  render() {
    if(this.img != undefined) {
      this.ctx.save();
      this.ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius - 20);
      this.ctx.restore();
    }
  }
}
