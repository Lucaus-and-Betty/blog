import {
  CalendarMonth,
  Update,
  Visibility,
  // Comment,
  ArrowUpward,
  LightMode,
  DarkMode,
  SettingsBrightness,
  Home
} from '@mui/icons-material';
import { FetchStatus } from '@myTypes/index.ts';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArticleInfoType } from './type.ts';
import { useNavigate } from 'react-router-dom';
import articleService from './index.service.ts';
import { FullScreenLoading } from '@myComponents/index.ts';
import { changeToDark, changeToLight, selectTheme, changeToSystem } from '@myStore/slices/themeSlice.ts';
import './index.less';

/**
 * @description 文章组件
 */
const Article = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
  const artcleContainerRef = useRef<HTMLDivElement>(null);
  const [upShow, setUpShow] = useState<boolean>(false);
  const [articleInfo, setArticleInfo] = useState<ArticleInfoType | null>(null);

  const toHome = () => {
    navigate('/home');
  };

  /**
   * @description 切换主题
   */
  const changeTheme = () => {
    if (theme === 'light') {
      dispatch(changeToDark());
    } else if (theme === 'dark') {
      dispatch(changeToSystem());
    } else {
      dispatch(changeToLight());
    }
  };

  /**
   * @description 监听滚动
   * @param {React.UIEvent<HTMLDivElement>} e 滚动事件
   */
  const listenScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 300) {
      setUpShow(true);
    } else {
      setUpShow(false);
    }
  };

  /**
   * @description 滚动到顶部
   */
  const scrollToTop = () => {
    if (!artcleContainerRef.current) {
      return;
    }
    artcleContainerRef.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * @description 获取文章
   * @param {string} id
   */
  const getArticleById = async (id: string) => {
    setFetchStatus(FetchStatus.LOADING);
    const article = await articleService.getArticleInfoById(id);
    if (article.success) {
      setArticleInfo(article.data);
      setFetchStatus(FetchStatus.SUCCESS);
    } else {
      setFetchStatus(FetchStatus.FAIL);
    }
  };

  useEffect(() => {
    getArticleById('1');
  }, []);

  return (
    <div className="artcle-container" ref={artcleContainerRef} onScroll={listenScroll}>
      <FullScreenLoading status={fetchStatus} failMessage="获取文章失败" />
      <div
        style={{
          transform: upShow ? 'scale(1)' : 'scale(0)'
        }}
        className="artcle-up"
        onClick={scrollToTop}
      >
        <ArrowUpward />
      </div>
      <div className="artcle-theme" onClick={changeTheme}>
        {theme === 'dark' && <DarkMode />}
        {theme === 'light' && <LightMode />}
        {theme === 'system' && <SettingsBrightness />}
      </div>
      <div className="artcle-to-home" onClick={toHome}>
        <Home />
      </div>
      {articleInfo && (
        <div className="artcle-text">
          <span className="artcle-title">{articleInfo.title}</span>
          <div className="artcle-label">
            {articleInfo.label.map((label, index) => {
              return <span key={index}>{label}</span>;
            })}
          </div>
          <div className="artcle-time">
            <div className="artcle-publish-time">
              <div className="artcle-publish-time-title">
                <CalendarMonth className="artcle-publish-time-icon1" />
                <span>发布时间：</span>
              </div>
              <span>{articleInfo.publishTime}</span>
            </div>
            <div className="artcle-publish-time">
              <div className="artcle-publish-time-title">
                <Update className="artcle-publish-time-icon2" />
                <span>更新时间：</span>
              </div>
              <span>{articleInfo.updateTime}</span>
            </div>
          </div>
          <div className="artcle-number">
            <div className="artcle-view">
              <div className="artcle-view-title">
                <Visibility className="artcle-view-icon1" />
                <span>阅读量：{articleInfo.readCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="artcle-cover">
        <img src="/src/assets/pic/diary-cover.jpg" alt="cover" />
      </div>
      {articleInfo && <div className="artcle-content" dangerouslySetInnerHTML={{ __html: articleInfo.content }}></div>}
    </div>
  );
};

export { Article };
