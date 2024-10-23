import './index.less';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@myStore/slices/languageSlice.ts';
import { Typewriter } from '@myComponents/typeWriter';
import { useRef, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleInfoType } from '@myTypes/index';
interface ArticleItemProps {
  articleInfo: ArticleInfoType;
}
const ArticleItem: FC<ArticleItemProps> = ({ articleInfo }) => {
  const navigate = useNavigate();
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
        {show && <Typewriter text={articleInfo.desc} typingSpeed={5} className="article-item-des-content" />}
      </div>
      <div className="article-item-pic" style={{ opacity: show ? 0 : 1 }}>
        <img src={articleInfo.pic} alt={LANGUAGE['Article cover']} />
      </div>
      <div className="article-item-text" style={{ opacity: show ? 0 : 1 }}>
        <span className="article-item-title">{articleInfo.title}</span>
        <div className="article-item-label">
          {articleInfo.label.map((item, index) => (
            <span key={index} className="article-item-label-item">
              {item}
            </span>
          ))}
        </div>
        <div className="article-item-time">{articleInfo.time}</div>
      </div>
    </div>
  );
};

export { ArticleItem };
