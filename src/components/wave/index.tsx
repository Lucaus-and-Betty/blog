import { FC, useEffect, useState } from 'react';
import './index.less';

const Wave: FC<{
  className?: string;
  color?: string;
}> = ({ className, color }) => {
  const [themeColor, setThemeColor] = useState<string[]>([]);
  const computeColor = (color: string) => {
    // 判断是不是 rgb 形式
    if (color.startsWith('rgb')) {
      // 变成三种透明度不同的同一颜色
      const [r, g, b] = color
        .replace('rgb(', '')
        .replace(')', '')
        .split(',')
        .map(item => Number(item));
      return [
        `rgba(${r}, ${g}, ${b})`,
        `rgba(${r}, ${g}, ${b}, 0.3)`,
        `rgba(${r}, ${g}, ${b}, 0.5)`,
        `rgba(${r}, ${g}, ${b}, 0.7)`
      ];
    } else if (color.startsWith('rgba')) {
      const [r, g, b, a] = color
        .replace('rgba(', '')
        .replace(')', '')
        .split(',')
        .map(item => Number(item));
      return [
        `rgba(${r}, ${g}, ${b}, ${a})`,
        `rgba(${r}, ${g}, ${b}, ${a * 0.3})`,
        `rgba(${r}, ${g}, ${b}, ${a * 0.5})`,
        `rgba(${r}, ${g}, ${b}, ${a * 0.7})`
      ];
    } else if (color.startsWith('#')) {
      // 变成三种透明度不同的同一颜色
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return [
        `rgba(${r}, ${g}, ${b})`,
        `rgba(${r}, ${g}, ${b}, 0.3)`,
        `rgba(${r}, ${g}, ${b}, 0.5)`,
        `rgba(${r}, ${g}, ${b}, 0.7)`
      ];
    } else {
      return [color, `rgba(${color}, 0.3)`, `rgba(${color}, 0.5)`, `rgba(${color}, 0.7)`];
    }
  };

  useEffect(() => {
    if (color) {
      setThemeColor(computeColor(color));
    }
  }, [color]);
  return (
    <div className={className}>
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="48" y="0" className="wave-color3" fill={color ? themeColor[3] : ''} />
          <use xlinkHref="#gentle-wave" x="48" y="3" className="wave-color2" fill={color ? themeColor[2] : ''} />
          <use xlinkHref="#gentle-wave" x="48" y="5" className="wave-color1" fill={color ? themeColor[1] : ''} />
          <use xlinkHref="#gentle-wave" x="48" y="7" className="wave-color0" fill={color ? themeColor[0] : ''} />
        </g>
      </svg>
    </div>
  );
};

export { Wave };
