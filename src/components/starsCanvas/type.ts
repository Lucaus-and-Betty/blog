export interface StarConfig {
  starInfo: StarInfo;
  starElement: Star;
}

interface StarInfo {
  x: number;
  y: number;
  scale: number;
  alpha: number;
}
export class Star {
  ctx: CanvasRenderingContext2D | null = null;
  panelWidth: number;
  panelHeight: number;
  starInfo: StarInfo | null = null;
  constructor(ctx: CanvasRenderingContext2D | null, width: number, height: number, starInfo?: StarInfo) {
    this.ctx = ctx;
    this.panelWidth = width;
    this.panelHeight = height;
    this.starInfo = starInfo ? starInfo : null;
  }

  // 绘制星星到画布上
  draw() {
    if (!this.ctx) {
      return;
    }
    if (this.starInfo) {
      this.createStar(this.starInfo);
    }

    // 随机位置
    const x = Math.random() * this.panelWidth;
    const y = Math.random() * this.panelHeight;
    // 随机大小
    const scale = Math.random() * 2;
    // 随机透明度
    const alpha = Math.random();
    // 黄色
    this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    this.ctx.beginPath();
    this.ctx.arc(x, y, scale, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    return {
      x,
      y,
      scale,
      alpha
    };
  }

  // 创建星星
  createStar(starInfo: StarInfo) {
    if (!this.ctx) {
      return;
    }
    this.ctx.fillStyle = `rgba(255, 255, 255, ${starInfo.alpha})`;
    this.ctx.beginPath();
    this.ctx.arc(starInfo.x, starInfo.y, starInfo.scale, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();

    return {
      x: starInfo.x,
      y: starInfo.y,
      scale: starInfo.scale,
      alpha: starInfo.alpha
    };
  }
}
