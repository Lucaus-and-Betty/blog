import { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '@myStore/slices/languageSlice';
import { hideLoader } from '@myStore/slices/loadingSlice';
import { useParams } from 'react-router-dom';
import { useBeforeNav } from '@myHooks/useBeforeNav.ts';
import novelsService from './index.service.ts';
import { NovelInfo } from './type.ts';
import { SERVER_IMG_URL } from '@myConstants/server.ts';
import { Typewriter, Loading } from '@/routerLazyLoad.ts';
import './index.less';

/**
 * 小说页面
 */
const Novel = () => {
  // 从 URL 获取作者名字
  const { author } = useParams<{ author: string }>();
  const { LANGUAGE } = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const [novelsList, setNovelsList] = useState<NovelInfo[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'done'>('loading');

  /**
   * 获取指定作者的所有小说
   * @param author - 作者名字
   */
  const getNovelsListByAuthor = async (author: string) => {
    if (!author) return;
    setStatus('loading');
    dispatch(hideLoader());
    const novelsData = await novelsService.getAllNovelsByAuthor(author);
    if (novelsData.success) {
      setNovelsList(novelsData.data);
      setStatus('done');
    } else {
      setStatus('error');
    }
  };
  useEffect(() => {
    if (!author) return;
    getNovelsListByAuthor(author);
  }, []);

  return (
    <div className="novel">
      <div className="novel-author">{LANGUAGE[author + "'s novels"]}</div>
      <div className="novel-list">
        {novelsList.map(novel => (
          <NovelListItem novel={novel} key={novel.id} />
        ))}
      </div>
      <div className="novel-loading">
        {status === 'loading' && <Loading />}
        {status === 'error' && (
          <div className="novel-loading-reloading" onClick={() => getNovelsListByAuthor(author || '')}>
            加载失败，点击重新加载
          </div>
        )}
      </div>
    </div>
  );
};

const NovelListItem: FC<{ novel: NovelInfo }> = ({ novel }) => {
  const navigate = useBeforeNav();
  const timer = useRef<null | number>(null);
  const [showDesState, setShowDesState] = useState(false);

  const showDes = () => {
    timer.current = setTimeout(() => {
      setShowDesState(true);
    }, 2000);
  };

  const closeDes = () => {
    timer.current && clearTimeout(timer.current);
    setShowDesState(false);
  };

  const toNovelDetail = (id: string) => {
    navigate(`/home/novel/chapter/${id}`);
  };

  return (
    <div
      className="novel-item-card"
      onMouseEnter={showDes}
      onMouseLeave={closeDes}
      onClick={() => toNovelDetail(novel.id)}
    >
      <div style={{ opacity: showDesState ? 0 : 1 }} className="novel-item-cover">
        <img src={SERVER_IMG_URL + novel.cover} alt={novel.name} />
      </div>
      <div style={{ opacity: showDesState ? 0 : 1 }} className="novel-item-title">
        <span>{novel.name}</span>
      </div>
      <div style={{ opacity: showDesState ? 1 : 0 }} className="novel-item-des">
        {showDesState && <Typewriter text={novel.des} typingSpeed={5} className="novel-item-des-content" />}
      </div>
    </div>
  );
};

export default Novel;
