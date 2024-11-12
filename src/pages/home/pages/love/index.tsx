import love from '@myAssets/pic/love.jpeg';
import avatar1 from '@myAssets/pic/test-avatar1.png';
import avatar2 from '@myAssets/pic/test-avatar2.png';
import { Wave, Loading } from '@/routerLazyLoad';
import { Favorite, CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { hideLoader } from '@myStore/slices/loadingSlice';
import { useEffect, useState } from 'react';
import loveService from './index.service';
import { LoveListItemType } from './type';
import './index.less';

const Love = () => {
  const dispatch = useDispatch();
  const [ourTime, setOurTime] = useState('');
  const [loveList, setLoveList] = useState<LoveListItemType[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'done'>('loading');

  /**
   * 计算两个时间之间的差
   * @param timestamp 时间戳
   * @returns 例如：这是一起度过的第1年2月3天4小时5分钟6秒
   */
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

  const getAllLoveList = async () => {
    setStatus('loading');
    dispatch(hideLoader());
    const loveListData = await loveService.getAllLoveList();
    if (loveListData.success) {
      setLoveList(loveListData.data);
      setStatus('done');
    } else {
      setStatus('error');
    }
  };

  useEffect(() => {
    getAllLoveList();
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
      {status === 'done' && (
        <div className="love-list">
          {loveList.map(item => {
            return (
              <div className="love-list-item" key={item.id}>
                <div className="love-list-icon">
                  {item.done ? <CheckBox className="love-list-icon-check" /> : <CheckBoxOutlineBlank />}
                </div>
                <div
                  style={{
                    textDecoration: item.done ? 'line-through' : 'none',
                    opacity: item.done ? 0.5 : 1
                  }}
                  className="love-list-title"
                >
                  {item.title}
                </div>
                <div className="love-list-time">{item.publishTime}</div>
              </div>
            );
          })}
        </div>
      )}
      <div className="love-loading">
        {status === 'loading' && <Loading />}
        {status === 'error' && (
          <div className="love-loading-reloading" onClick={getAllLoveList}>
            加载失败，点击重新加载
          </div>
        )}
      </div>
    </div>
  );
};

export default Love;
