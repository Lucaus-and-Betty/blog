import { FC } from 'react';

/**
 * @description 占位组件
 * @param {string} width 宽度
 * @param {string} height 高度
 * @param {string} display 显示方式
 */
const Space: FC<{ width: string; height: string; display?: string }> = ({ width, height, display }) => {
  return <div style={{ width, height, display }}></div>;
};

export { Space };
