export interface StarConfig {
  starElement: Star;
}

/**
 * 星星类
 */
export class Star {
  private x: number;
  private y: number;
  private scale: number;
  private alpha: number;
  private speed: number;
  private direction: number;

  constructor(x: number, y: number, scale: number, alpha: number, speed: number, direction: number) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.alpha = alpha;
    this.speed = speed;
    this.direction = direction;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.scale, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.closePath();
    ctx.fill();
  }

  public move(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x + this.speed, this.y + this.speed * this.direction, this.scale, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.closePath();
    ctx.fill();

    this.x += this.speed;
    this.y += this.speed * this.direction;
    if (this.x > window.innerWidth || this.y > window.innerHeight) {
      return true;
    }
  }
}

/**
 * 流星类
 */
export class Meteor {
  private x: number;
  private y: number;
  private scale: number = 5;
  private alpha: number = 1;
  private speed: number = 10;
  private direction: number;

  constructor(x: number, y: number, direction: number) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.scale, 0, Math.PI * 2);
    ctx.fillStyle = `red`;
    ctx.fill();
    ctx.closePath();
  }

  public move(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x + this.speed, this.y + this.speed * this.direction, this.scale, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.closePath();
    ctx.fill();

    this.x += this.speed;
    this.y += this.speed * this.direction;
    if (this.x > window.innerWidth || this.y > window.innerHeight) {
      return true;
    }
  }
}
