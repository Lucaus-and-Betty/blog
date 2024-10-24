import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import { useEffect, useState, useRef, useCallback, FC } from 'react';
import { ArticleKindList } from './constant';
import { ReactSetState, ArticleInfoType } from '@myTypes/index';
import { ArticleItem } from '@myComponents/articleItem';
import ArticlePic from '@myAssets/pic/article-test.png';
import { TopNews, GuidanceArea } from './components/index';
import { Loading } from '@myComponents/index.ts';
import './index.less';

/**
 * @description 首页
 */
const Main = () => {
  return (
    <div className="home-main">
      <TopNews />
      <GuidanceArea />
      <ArticleListArea />
    </div>
  );
};

/**
 * @description 文章列表区域
 */
const ArticleListArea = () => {
  const [chooseKindId, setChooseKindId] = useState<string | null>(null);

  return (
    <div className="home-main-article-container">
      <ArticleKind setChooseKindId={setChooseKindId} chooseKindId={chooseKindId} />
      <ArticleList />
    </div>
  );
};

/**
 * @description 文章种类 bar
 * @param {ReactSetState<string | null>} setChooseKindId 设置当前选中的种类
 * @param {string | null} chooseKindId 当前选中的种类
 */
const ArticleKind: FC<{
  setChooseKindId: ReactSetState<string | null>;
  chooseKindId: string | null;
}> = ({ setChooseKindId, chooseKindId }) => {
  const kindContainerContentRef = useRef<HTMLDivElement>(null);
  const kindContainerScrollRef = useRef<HTMLDivElement>(null);
  const kindContainerRef = useRef<HTMLDivElement>(null);
  const [moreBtnShow, setMoreBtnShow] = useState<boolean>(false);

  /**
   * @description 监听内容宽度
   */
  const widthListener = useCallback(() => {
    if (!kindContainerContentRef.current) {
      return;
    }
    if (!kindContainerRef.current) {
      return;
    }
    //  如果内容宽度大于容器宽度，显示更多按钮
    if (kindContainerContentRef.current.clientWidth > kindContainerRef.current.clientWidth - 16) {
      setMoreBtnShow(true);
    } else {
      setMoreBtnShow(false);
    }
  }, []);

  /**
   * @description 判读横向滚动是否已经滚动到最右边
   */
  const scrollListener = useCallback(() => {
    if (!kindContainerScrollRef.current) {
      return;
    }
    if (!kindContainerContentRef.current) {
      return;
    }
    if (!kindContainerRef.current) {
      return;
    }
    if (
      kindContainerScrollRef.current.scrollLeft >=
      kindContainerContentRef.current.clientWidth - kindContainerRef.current.clientWidth + 14
    ) {
      setMoreBtnShow(false);
    } else {
      setMoreBtnShow(true);
    }
  }, []);

  const selectKind = (kindId: string) => {
    setChooseKindId(kindId);
  };

  useEffect(() => {
    setChooseKindId('0');
    widthListener();
    window.addEventListener('resize', widthListener);

    return () => {
      // 移除监听
      window.removeEventListener('resize', widthListener);
    };
  }, []);

  return (
    <div ref={kindContainerRef} className="home-main-article-kind-bar">
      {moreBtnShow && (
        <div className="home-main-article-kind-bar-more">
          <KeyboardDoubleArrowRight className="home-main-article-kind-bar-more-icon" />
        </div>
      )}
      <div ref={kindContainerScrollRef} onScroll={scrollListener} className="home-main-article-kind-container-scroll">
        <div ref={kindContainerContentRef} className="home-main-article-kind-container">
          {ArticleKindList.map(kind => {
            if (chooseKindId && kind.id === chooseKindId) {
              return (
                <div
                  key={kind.id}
                  className="home-main-article-kind-item home-main-article-kind-item-choose"
                  onClick={() => selectKind(kind.id)}
                >
                  {kind.name}
                </div>
              );
            }
            return (
              <div key={kind.id} className="home-main-article-kind-item" onClick={() => selectKind(kind.id)}>
                {kind.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ArticleList = () => {
  const testArticleInfo: ArticleInfoType = {
    id: '0',
    title: '测试文章',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Saepe ullam necessitatibus impedit ex maiores, doloribus quasi exercitationem dolor aliquid natus, nisi animi, distinctio mollitia? Repellendus ad pariatur qui possimus harum.Lorem ipsum dolor sit amet consectetur adipisicing elit.Saepe ullam necessitatibus impedit ex maiores, doloribus quasi exercitationem dolor aliquid natus, nisi animi, distinctio mollitia? Repellendus ad pariatur qui possimus harum.Lorem ipsum dolor sit amet consectetur adipisicing elit.Saepe ullam necessitatibus impedit ex maiores, doloribus quasi exercitationem dolor aliquid natus, nisi animi, distinctio mollitia? Repellendus ad pariatur qui possimus harum.Lorem ipsum dolor sit amet consectetur adipisicing elit.Saepe ullam necessitatibus impedit ex maiores, doloribus quasi exercitationem dolor aliquid natus, nisi animi, distinctio mollitia? Repellendus ad pariatur qui possimus harum.Lorem ipsum dolor sit amet consectetur adipisicing elit.Saepe ullam necessitatibus impedit ex maiores, doloribus quasi exercitationem dolor aliquid natus, nisi animi, distinctio mollitia? Repellendus ad pariatur qui possimus harum.',
    time: '2022-01-01 00:00:00',
    label: ['#测试标签1', '#测试标签2'],
    pic: ArticlePic
  };
  return (
    <>
      <div className="home-main-article-list">
        <ArticleItem articleInfo={testArticleInfo} />
        <ArticleItem articleInfo={testArticleInfo} />
        <ArticleItem articleInfo={testArticleInfo} />
        <ArticleItem articleInfo={testArticleInfo} />
        <ArticleItem articleInfo={testArticleInfo} />
        <ArticleItem articleInfo={testArticleInfo} />
        <ArticleItem articleInfo={testArticleInfo} />
      </div>
      <div className="home-main-article-list-loading">
        <Loading />
      </div>
    </>
  );
};

export { Main };
