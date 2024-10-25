import './index.less';
import { FC, useEffect, useState } from 'react';
import { FetchStatus } from '@myTypes/index.ts';

const FullScreenLoading: FC<{
  failMessage: string;
  status: FetchStatus;
}> = ({ failMessage, status }) => {
  const [showMessage, setShowMessage] = useState('Loading ');

  useEffect(() => {
    let interval: number = 0;
    if (status === FetchStatus.LOADING) {
      interval = setInterval(() => {
        setShowMessage(pre => {
          if (pre.length < 12) {
            return pre + '.';
          }
          return 'Loading ';
        });
      }, 500);
    }
    if (status === FetchStatus.FAIL) {
      clearInterval(interval);
      setShowMessage(failMessage);
    }

    return () => {
      clearInterval(interval);
    };
  }, [failMessage, status]);
  return (
    <div
      className="full-screen-loading"
      style={{
        display: status === FetchStatus.SUCCESS ? 'none' : 'flex'
      }}
    >
      <div className="full-screen-loading-content">
        <div className="full-screen-loading-animation">
          <div className="full-screen-loading-sun">
            <div className="full-screen-loading-sun-lines">
              <div className="full-screen-loading-sun-line1"></div>
              <div className="full-screen-loading-sun-line1-1"></div>
              <div className="full-screen-loading-sun-line2"></div>
              <div className="full-screen-loading-sun-line2-1"></div>
              <div className="full-screen-loading-sun-line3"></div>
              <div className="full-screen-loading-sun-line3-1"></div>
              <div className="full-screen-loading-sun-line4"></div>
              <div className="full-screen-loading-sun-line4-1"></div>
            </div>
            <div className="full-screen-loading-sun-eyes-1"></div>
            <div className="full-screen-loading-sun-eyes-2"></div>
          </div>
          <div className="full-screen-loading-skyline"></div>
        </div>
        <div className="full-screen-loading-error-fail-message">{showMessage}</div>
      </div>
    </div>
  );
};

export { FullScreenLoading };
