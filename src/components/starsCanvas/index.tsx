import { useEffect, useRef } from 'react';
import { Star, StarConfig } from './type';
import './index.less';

const StarsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stars: StarConfig[] = [];
    console.log('canvasRef.current');
    // 获取窗口大小
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;

        // 重绘星星
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) {
          return;
        }
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => {
          star.starElement.draw();
        });
      }
    });

    // 获取画布上下文
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      return;
    }
    // 隔一段时间就创建一个星星
    const timer = setInterval(() => {
      // 不超过 250 个星星
      if (stars.length > 250) {
        clearInterval(timer);
        return;
      }
      // 创建星星
      const star = new Star(ctx, width, height);
      const starInfo = star.draw();
      if (starInfo) {
        stars.push({
          starInfo,
          starElement: star
        });
      }
    }, 200);

    return () => {
      clearInterval(timer);
    };
  });
  return <canvas ref={canvasRef} id="stars"></canvas>;
};

export { StarsCanvas };
