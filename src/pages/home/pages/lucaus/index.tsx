import { hideLoader } from '@myStore/slices/loadingSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '@myStore/slices/languageSlice';
import { telegram, github, wechat, gmail } from '@myAssets/icon';
import Avatar1 from '@myAssets/pic/test-avatar1.png';
import tip from '@myUtils/tip';
import './index.less';

const Lucaus = () => {
  const { LANGUAGE } = useSelector(selectLanguage);
  const jobArray = ['web developer', 'Blogger'];
  const [jobText, setJobText] = useState(`web developer`);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoader());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const index = jobArray.indexOf(jobText);
      let nextIndex = (index + 1) % jobArray.length;
      if (nextIndex >= jobArray.length) {
        nextIndex = 0;
      }
      setJobText(jobArray[nextIndex]);
    }, 3000);
    return () => clearInterval(timer);
  }, [jobText]);
  return (
    <div className="lucaus">
      <div className="lucaus-text">
        <div className="lucaus-text-container">
          <div className="lucaus-name">Lucaus Martin</div>
          <div className="lucaus-job">
            <div className="lucaus-job-left">{LANGUAGE[`I'm a`]} &nbsp;</div>
            <div className="lucaus-job-right">
              <div className="lucaus-job-right-text1">{LANGUAGE[jobText]}</div>
              <div className="lucaus-job-right-text2">
                <span>{LANGUAGE[jobText]}</span>
              </div>
              <div className="lucaus-job-right-line"></div>
            </div>
          </div>
          <div className="lucaus-bio">{LANGUAGE['lucausBio']}</div>
          <div className="lucaus-icons">
            <div className="lucaus-icon" onClick={() => window.open('https://t.me/lucausMartin')}>
              {telegram}
            </div>
            <div className="lucaus-icon" onClick={() => window.open('https://github.com/lucausMartin')}>
              {github}
            </div>
            <div
              className="lucaus-icon"
              onClick={() => {
                navigator.clipboard.writeText('LucausMartin');
                tip.addmessage('success', LANGUAGE['copySuccess']);
              }}
            >
              {wechat}
            </div>
            <div className="lucaus-icon" onClick={() => window.open('mailto:mzx2602685411@gmail.com')}>
              {gmail}
            </div>
          </div>
        </div>
      </div>
      <div className="lucaus-img">
        <div className="lucaus-img-container">
          <div className="lucaus-img-bg"></div>
          <div className="lucaus-img-item">
            <img src={Avatar1} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lucaus;
