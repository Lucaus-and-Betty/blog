import { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '@myStore/slices/languageSlice';
import { hideLoader } from '@myStore/slices/loadingSlice';
import { useParams } from 'react-router-dom';
import novelsService from './index.service.ts';
import { NovelInfo } from './type.ts';
import { SERVER_IMG_URL } from '@myConstants/server.ts';
import './index.less';
import { Typewriter } from '@/routerLazyLoad.ts';

/**
 * 小说页面
 */
const Novel = () => {
  // 从 URL 获取作者名字
  const { author } = useParams<{ author: string }>();
  const { LANGUAGE } = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const [novelsList, setNovelsList] = useState<NovelInfo[]>([]);

  /**
   * 获取指定作者的所有小说
   * @param author - 作者名字
   */
  const getNovelsListByAuthor = async (author: string) => {
    const novelsData = await novelsService.getAllNovelsByAuthor(author);
    if (novelsData.success) {
      console.log(novelsData.data);
      setNovelsList(novelsData.data);
      dispatch(hideLoader());
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
    </div>
  );
};

const NovelListItem: FC<{ novel: NovelInfo }> = ({ novel }) => {
  const timer = useRef<null | number>(null);
  const [showDesState, setShowDesState] = useState(false);
  useEffect(() => {
    console.log(novel);
  }, []);

  const showDes = () => {
    timer.current = setTimeout(() => {
      setShowDesState(true);
    }, 2000);
  };

  const closeDes = () => {
    timer.current && clearTimeout(timer.current);
    setShowDesState(false);
  };

  return (
    <div className="novel-item-card" onMouseEnter={showDes} onMouseLeave={closeDes}>
      <div className="novel-item-cover">
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
