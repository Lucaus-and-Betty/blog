import { FC, ReactElement } from 'react';
import { ReactSetState } from '@myTypes/index.ts';

import './index.less';

interface FullScreenMaskProps {
  children: ReactElement;
  show: boolean;
  setClose: ReactSetState<boolean> | ((value: boolean) => void);
}
const FullScreenMask: FC<FullScreenMaskProps> = ({ children, setClose, show }) => {
  return (
    <div
      className="pop-ups-container"
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
