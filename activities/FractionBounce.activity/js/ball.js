class Ball {
  constructor(inX, inY, inGrav, inVel, inCtx, inRadius, inImg) {
    this.x = inX;
    this.y = inY;
    this.radius = inRadius;
    this.grav = inGrav;
    this.vel = inVel;
    this.ctx = inCtx;
    this.img = inImg;
  }

  update() {
    this.vel += this.grav;
    this.y += this.vel;
  }

  render(drawAsPie, divObj) {
    if (drawAsPie) {
      this.ctx.save();
      let finalDiv = divObj.a / divObj.n;
      let radians = (Math.PI * (finalDiv * 360)) / 180;

      this.ctx.beginPath();

      this.ctx.moveTo(this.x, this.y);
      this.ctx.fillStyle = "#E91E63";
      this.ctx.arc(this.x - 7, this.y, 40, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.fillStyle = "#FFC107";
      this.ctx.arc(this.x - 7, this.y, 40, 0, radians);
      this.ctx.lineTo(this.x, this.y);
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.restore();
    } else {
      if (this.img != undefined) {
        this.ctx.save();
        this.ctx.drawImage(
          this.img,
          this.x - this.radius,
          this.y - this.radius - 20
        );
        this.ctx.restore();
      }
    }
  }
}
