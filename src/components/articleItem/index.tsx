import './index.less';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@myStore/slices/languageSlice.ts';
import { Typewriter } from '@/routerLazyLoad';
import { useRef, useState, FC } from 'react';
import { useBeforeNav } from '@myHooks/useBeforeNav';
import { ArticleInfoType } from '@myTypes/index';
import { SERVER_IMG_URL } from '@myConstants/server';
interface ArticleItemProps {
  articleInfo: ArticleInfoType;
}
const ArticleItem: FC<ArticleItemProps> = ({ articleInfo }) => {
  const navigate = useBeforeNav();
  const { LANGUAGE } = useSelector(selectLanguage);
  const timer = useRef<null | number>(null);
  const [show, setShow] = useState<boolean>(false);

  const showDes = () => {
    timer.current = setTimeout(() => {
      setShow(true);
    }, 2000);
  };

  const closeDes = () => {
    timer.current && clearTimeout(timer.current);
    setShow(false);
  };

  const toArticle = () => {
    console.log(articleInfo);
    navigate(`/article/${articleInfo.id}`);
  };

  return (
    <div className="article-item-container" onMouseEnter={showDes} onMouseLeave={closeDes} onClick={toArticle}>
      <div style={{ opacity: show ? 1 : 0 }} className="article-item-des">
        {show && <Typewriter text={articleInfo.des} typingSpeed={5} className="article-item-des-content" />}
      </div>
      <div className="article-item-pic" style={{ opacity: show ? 0 : 1 }}>
        <img src={SERVER_IMG_URL + articleInfo.cover} alt={LANGUAGE['Article cover']} />
      </div>
      <div className="article-item-text" style={{ opacity: show ? 0 : 1 }}>
        <span className="article-item-title">{articleInfo.title}</span>
        <div className="article-item-label">
          {articleInfo.labels.map(item => (
            <span key={item.id} className="article-item-label-item">
              {item.title}
            </span>
          ))}
        </div>
        <div className="article-item-time">{articleInfo.publishTime}</div>
      </div>
    </div>
  );
};

export default ArticleItem;
