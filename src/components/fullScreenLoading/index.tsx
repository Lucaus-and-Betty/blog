import { FC, useEffect, useState } from 'react';
import { FetchStatus } from '@myTypes/index.ts';
import './index.less';

const FullScreenLoading: FC<{
  failMessage: string;
  status: FetchStatus;
}> = ({ failMessage, status }) => {
  const [showMessage, setShowMessage] = useState('Loading ');

  // 保证每一次打开都是 Loading
  useEffect(() => {
    setShowMessage('Loading ');
  }, [status]);

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

    const errortimeOut = setTimeout(() => {
      clearInterval(interval);
      setShowMessage(failMessage);
      clearTimeout(errortimeOut);
    }, 10000);
    return () => {
      clearInterval(interval);
      clearTimeout(errortimeOut);
    };
  }, [failMessage, status]);
  return (
    <div
      className="full-screen-loading"
      style={{
        transform: status === FetchStatus.SUCCESS ? 'translateY(100%)' : 'translateY(0%)'
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

export default FullScreenLoading;
