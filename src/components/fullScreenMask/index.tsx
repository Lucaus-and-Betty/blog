import { FC, ReactElement } from 'react';
import { ReactSetState } from '@myTypes/index.ts';

import './index.less';

/**
 * @description 全屏遮罩组件
 * @param {ReactElement} children 子组件
 * @param {boolean} show 是否显示
 */
interface FullScreenMaskProps {
  children: ReactElement;
  show: boolean;
  setClose: ReactSetState<boolean> | ((value: boolean) => void);
}
const FullScreenMask: FC<FullScreenMaskProps> = ({ children, setClose, show }) => {
  return (
    <div
      className="full-screen-mask--container"
      style={{
        visibility: show ? 'visible' : 'hidden'
      }}
      onClick={e => {
        e.stopPropagation();
        setClose(false);
      }}
    >
      {children}
    </div>
  );
};

export { FullScreenMask };
