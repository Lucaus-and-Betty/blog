export interface StarConfig {
  starElement: Star;
}

export interface MeteorConfig {
  meteorElement: Meteor;
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
  private speed: number = 6;
  private direction: number;
  private len: number = 70;

  constructor(x: number, y: number, direction: number) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x + 5 * this.speed,
      this.y + 5 * this.speed * this.direction
    );

    gradient.addColorStop(0, 'rgba(255, 0, 255, 0)');
    gradient.addColorStop(1, 'rgba(255, 0, 255, 1)');

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + 5 * this.speed, this.y + 5 * this.speed * this.direction);
    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(255, 0, 255, 1)';
    ctx.shadowBlur = 5;
    ctx.stroke();
  }

  public move(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x + 5 * this.speed,
      this.y + 5 * this.speed * this.direction
    );

    gradient.addColorStop(0, 'rgba(211, 151, 211, 0)');
    gradient.addColorStop(1, 'rgba(211, 151, 211, 1)');

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + 5 * this.speed, this.y + 5 * this.speed * this.direction);
    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(255, 0, 255, 1)';
    ctx.shadowBlur = 5;
    ctx.stroke();

    this.x += this.speed;
    this.y += this.speed * this.direction;
    this.len -= 0.2;
    if (this.x > window.innerWidth || this.y > window.innerHeight) {
      return true;
    }
  }
}
