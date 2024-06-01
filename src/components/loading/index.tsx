import { FC, useState } from 'react';
import './index.less';

const Loading: FC<{ size?: string; gap?: string; count?: number }> = ({ size = '20px', gap = '20px', count = 5 }) => {
  // 高度数值
  const [shadowHeight] = useState(Number(size.replace(/[^0-9]/g, '')) / 2);
  // 高度单位
  const [shadowUnit] = useState(size.replace(/[^a-zA-Z]/g, ''));

  const createBallStyle = (index: number) => {
    return {
      width: `${size}`,
      height: `${size}`,
      '--i': index
    };
  };

  const createShadowStyle = (index: number) => {
    return {
      width: `${size}`,
      height: `${shadowHeight + shadowUnit}`,
      '--i': index
    };
  };

  console.log('shadowHeight:', shadowHeight);
  return (
    <div style={{ gap: gap }} className="loading-container">
      {new Array(count).fill(0).map((_, index) => (
        <div key={index} style={{ width: `${size}` }} className="ball-container">
          <div style={createBallStyle(index)} className="ball"></div>
          <div style={createShadowStyle(index)} className="ball-shadow"></div>
        </div>
      ))}
    </div>
  );
};

export { Loading };
