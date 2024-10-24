import love from '@myAssets/pic/love.jpeg';
import avatar1 from '@myAssets/pic/test-avatar1.png';
import avatar2 from '@myAssets/pic/test-avatar2.png';
import { Wave } from '@myComponents/wave';
import { Favorite } from '@mui/icons-material';
import './index.less';
import { useEffect, useState } from 'react';

const Love = () => {
  const [ourTime, setOurTime] = useState('');
  const computTime = (timestamp: number) => {
    const now = Date.now();
    const difference = now - timestamp;

    // 定义时间单位
    const secondsInYear = 365 * 24 * 60 * 60 * 1000;
    const secondsInMonth = 30 * 24 * 60 * 60 * 1000; // 简化为30天
    const secondsInDay = 24 * 60 * 60 * 1000;
    const secondsInHour = 60 * 60 * 1000;
    const secondsInMinute = 60 * 1000;

    // 计算各个时间单位
    const years = Math.floor(difference / secondsInYear);
    const months = Math.floor((difference % secondsInYear) / secondsInMonth);
    const days = Math.floor((difference % secondsInMonth) / secondsInDay);
    const hours = Math.floor((difference % secondsInDay) / secondsInHour);
    const minutes = Math.floor((difference % secondsInHour) / secondsInMinute);
    const seconds = Math.floor((difference % secondsInMinute) / 1000);

    return `这是一起度过的第${years}年${months}月${days}天${hours}小时${minutes}分钟${seconds}秒`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOurTime(computTime(1671773445000));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="love-space">
      <div className="love-cover">
        <img src={love} alt="cover" />
        <div className="love-cover-wave">
          <Wave />
        </div>
      </div>
      <div className="love-title">
        <div className="love-title-text">{ourTime}</div>
        <div className="love-title-person">
          <div className="love-title-person-avatar">
            <img src={avatar1} alt="avatar1" />
          </div>
          <span>Lucaus</span>
        </div>
        <div className="love-title-line">
          <div className="love-title-line-light"></div>
        </div>
        <div className="love-title-love">
          <Favorite className="love-title-love-icon" />
        </div>
        <div className="love-title-person">
          <div className="love-title-person-avatar">
            <img src={avatar2} alt="avatar1" />
          </div>
          <span>Betty</span>
        </div>
      </div>
    </div>
  );
};

export { Love };
