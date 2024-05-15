import { FC, ReactElement, useEffect } from 'react';
import { ReactSetState } from '@myTypes/index.ts';
import { FullScreenMask } from '@myComponents/index.ts';

import './index.less';

interface FullScreenMaskProps {
  children: ReactElement;
  show: boolean;
  setClose: ReactSetState<boolean> | ((value: boolean) => void);
}
const SideBar: FC<FullScreenMaskProps> = ({ children, setClose, show }) => {
  useEffect(() => {
    // 监听 esc 键
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setClose(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setClose]);

  return (
    <FullScreenMask show={show} setClose={setClose}>
      <div
        className={show ? 'side-bar-container side-bar-container-show' : 'side-bar-container'}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </FullScreenMask>
  );
};

export { SideBar };
