import { FC } from 'react';

const Space: FC<{ width: string; height: string; display?: string }> = ({ width, height, display }) => {
  return <div style={{ width, height, display }}></div>;
};

export { Space };
