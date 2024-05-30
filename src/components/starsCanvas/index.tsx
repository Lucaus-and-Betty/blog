import { useState, useRef, useEffect } from 'react';
import { Star, StarConfig } from './type';
import './index.less';

const StarsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasState, setCanvasState] = useState<ImageData | null>(null);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    console.log('每次都渲染的 useEffect');
    // 将保存的画布状态恢复
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    if (canvasState) {
      ctx.putImageData(canvasState, 0, 0);
    }
  });

  useEffect(() => {
    console.log('只渲染一次的 useEffect');
    // 初始化画布
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('不支持 canvas');
      return;
    }

    // 窗口大小改变时，重新设置画布大小
    window.onresize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setCanvasState(ctx.getImageData(0, 0, window.innerWidth, window.innerHeight));
    };

    // 初始化 250 个星星
    const stars: StarConfig[] = [];
    for (let i = 0; i < 250; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const scale = Math.random() * 2;
      const alpha = Math.random();
      let speed = Math.random() + 0.1;
      speed = speed > 0.8 ? speed - 0.5 : speed;
      speed = speed > 0.5 ? speed - 0.4 : speed;
      // 方向在 0 - 1
      const direction = Math.random();
      stars.push({
        starElement: new Star(x, y, scale, alpha, speed, direction)
      });
    }
    stars.forEach(star => {
      star.starElement.draw(ctx);
    });

    // 星星移动
    const moveStars = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      stars.forEach(star => {
        const isOut = star.starElement.move(ctx);
        if (isOut) {
          // 新星星只能在左边 3/5 的位置
          const x = (Math.random() * window.innerWidth) / 2;
          const y = Math.random() * window.innerHeight;
          const scale = Math.random() * 2;
          const alpha = Math.random();
          let speed = Math.random() + 0.1;
          speed = speed > 0.5 ? speed - 0.4 : speed;
          const direction = Math.random();
          star.starElement = new Star(x, y, scale, alpha, speed, direction);
          star.starElement.draw(ctx);
        }
      });
    };

    // 每 16.7ms 移动一次
    const timer = setInterval(moveStars, 16.7);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return <canvas width={width} height={height} ref={canvasRef} id="universe"></canvas>;
};

export { StarsCanvas };
