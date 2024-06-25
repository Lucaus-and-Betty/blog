import { useState, useRef, useEffect } from 'react';
import { Star, StarConfig, Meteor, MeteorConfig } from './type';
import tip from '@myUtils/tip';
import './index.less';

/**
 * @description 星空画布
 */
const StarsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasState, setCanvasState] = useState<ImageData | null>(null);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d', {willReadFrequently: true});
    if (!ctx) {
      return;
    }

    // 将改变窗口大小前的画布状态恢复
    if (canvasState) {
      ctx.putImageData(canvasState, 0, 0);
    }
  });

  // 初始化画布
  useEffect(() => {
    const canvas = canvasRef.current;
    // 没创建成功就返回
    if (!canvas) {
      return;
    }

    // 判断是否支持 canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      tip.addmessage('error', '您的浏览器不支持 canvas');
      return;
    }

    // 窗口大小改变时，重新设置画布大小
    window.onresize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);      // 窗口大小变化的时候会清空画布，所以需要保留画布状态
      setCanvasState(ctx.getImageData(0, 0, window.innerWidth, window.innerHeight));
    };

    // 初始化 250 个星星, 10 个流星
    const stars: StarConfig[] = [];
    const meteors: MeteorConfig[] = [];
    for (let i = 0; i < 250; i++) {
      const starX = Math.random() * window.innerWidth;
      const starY = Math.random() * window.innerHeight;
      const scale = Math.random() * 2;
      const alpha = Math.random();
      let speed = Math.random() + 0.1;
      speed = speed > 0.8 ? speed - 0.5 : speed;
      speed = speed > 0.5 ? speed - 0.4 : speed;
      // 方向在 0 - 1
      const starDirection = Math.random();
      stars.push({
        starElement: new Star(starX, starY, scale, alpha, speed, starDirection)
      });
    }
    for (let i = 0; i < 10; i++) {
      const meteorX = Math.random() * window.innerWidth;
      const meteorY = Math.random() * window.innerHeight;
      let direction = Math.random();
      direction = direction < 0.5 ? 0.3 : direction;
      meteors.push({
        meteorElement: new Meteor(meteorX, meteorY, direction)
      });
    }

    // 绘制星星和流星
    stars.forEach(star => {
      star.starElement.draw(ctx);
    });
    meteors.forEach(meteor => {
      meteor.meteorElement.draw(ctx);
    });

    // 星星和流星移动
    const moveStars = () => {
      // 清空画布为了下一帧的绘制
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      stars.forEach(star => {
        // 绘制星星的下一帧并判断是否出界
        const isOut = star.starElement.move(ctx);

        // 如果出界，重新生成一个星星
        if (isOut) {
          // 新星星只能在左边 1/2 的位置生成
          const x = (Math.random() * window.innerWidth) / 2;
          const y = Math.random() * window.innerHeight;
          const scale = Math.random() * 2;
          const alpha = Math.random();
          // 防止星星速度过快
          let speed = Math.random() + 0.1;
          speed = speed > 0.5 ? speed - 0.4 : speed;
          const direction = Math.random();
          star.starElement = new Star(x, y, scale, alpha, speed, direction);
          star.starElement.draw(ctx);
        }
      });

      meteors.forEach(meteor => {
        // 绘制流星的下一帧并判断是否出界
        const isOut = meteor.meteorElement.move(ctx);

        // 如果出界，重新生成一个流星
        if (isOut) {
          // 百分之 1 的概率生成新流星
          if (Math.random() < 0.001) {
            // 新流星只能在左边 1/2 的位置生成
            const x = (Math.random() * window.innerWidth) / 2;
            const y = Math.random() * window.innerHeight;
            let direction = Math.random();
            // 防止流星运动太平
            direction = direction < 0.5 ? 0.3 : direction;
            meteor.meteorElement = new Meteor(x, y, direction);
            meteor.meteorElement.draw(ctx);
          }
        }
      });
    };

    // 所有星星和流星对象每 16.7ms 移动一次
    const timer = setInterval(moveStars, 16.7);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return <canvas width={width} height={height} ref={canvasRef} id="universe"></canvas>;
};

export { StarsCanvas };
