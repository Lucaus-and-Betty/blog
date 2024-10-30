import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback, FC } from 'react';
import { ReactSetState, ArticleInfoType } from '@myTypes/index';
import { ArticleItem, Loading } from '@/routerLazyLoad';
import { TopNews, GuidanceArea } from './components/index';
import { useDispatch } from 'react-redux';
import { hideLoader } from '@myStore/slices/loadingSlice';
import mainService from './index.service.ts';
import { ArticleKindType } from './type';
import tip from '@myUtils/tip';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import './index.less';

/**
 * @description 首页
 */
const Main = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(hideLoader());
    }, 1000);
  }, [location]);
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
  const [chooseKindId, setChooseKindId] = useState<string>('0');

  return (
    <div className="home-main-article-container">
      <ArticleKind setChooseKindId={setChooseKindId} chooseKindId={chooseKindId} />
      <ArticleList chooseKindId={chooseKindId} />
    </div>
  );
};

/**
 * @description 文章种类 bar
 * @param {ReactSetState<string | null>} setChooseKindId 设置当前选中的种类
 * @param {string | null} chooseKindId 当前选中的种类
 */
const ArticleKind: FC<{
  setChooseKindId: ReactSetState<string>;
  chooseKindId: string | null;
}> = ({ setChooseKindId, chooseKindId }) => {
  const kindContainerContentRef = useRef<HTMLDivElement>(null);
  const kindContainerScrollRef = useRef<HTMLDivElement>(null);
  const kindContainerRef = useRef<HTMLDivElement>(null);
  const [moreBtnShow, setMoreBtnShow] = useState<boolean>(false);
  const [articleKindList, setArticleKindList] = useState<ArticleKindType[]>([
    {
      id: '0',
      title: '全部'
    }
  ]);

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

  const getAllLabels = async () => {
    const { success, data } = await mainService.getAllLabels();
    if (success) {
      setArticleKindList([
        {
          id: '0',
          title: '全部'
        },
        ...data
      ]);
    } else {
      tip.addmessage('error', '获取标签列表失败');
    }
  };

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
    getAllLabels();
  }, []);

  useEffect(() => {
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
          {articleKindList.map(kind => {
            if (chooseKindId && kind.id === chooseKindId) {
              return (
                <div
                  key={kind.id}
                  className="home-main-article-kind-item home-main-article-kind-item-choose"
                  onClick={() => selectKind(kind.id)}
                >
                  {kind.title}
                </div>
              );
            }
            return (
              <div key={kind.id} className="home-main-article-kind-item" onClick={() => selectKind(kind.id)}>
                {kind.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ArticleList: FC<{ chooseKindId: string }> = ({ chooseKindId }) => {
  const [articles, setArticles] = useState<ArticleInfoType[]>([]);
  const [status, setStatus] = useState<'empty' | 'loading' | 'error' | 'done'>('loading');
  const [page, setPage] = useState<{ page: number; pageSize: number }>({ page: 0, pageSize: 30 });
  const [isOver, setIsOver] = useState<boolean>(false);
  const [firstTime, setFirstTime] = useState<boolean>(true);

  const [moreRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.8
  });

  const getAllArticles = async () => {
    setStatus('loading');
    const res = await mainService.getAllArticles(page.page, page.pageSize);
    if (res.success) {
      if (res.data.length === 0) {
        setStatus('empty');
      } else {
        setStatus('done');
      }
      if (res.isOver) {
        setIsOver(true);
        setStatus('empty');
      }
      setArticles(pre => [...pre, ...res.data]);
    } else {
      setArticles([]);
      tip.addmessage('error', '获取文章列表失败');
      setStatus('error');
    }
  };

  const getAllArticlesByLabel = async (labelId: string) => {
    setStatus('loading');
    const res = await mainService.getAllArticlesByLabel(labelId, page.page);
    if (res.success) {
      console.log('123', res.isOver);
      if (res.data.length === 0) {
        setStatus('empty');
      } else {
        setStatus('done');
      }
      if (res.isOver) {
        setIsOver(true);
        setStatus('empty');
      }
      setArticles(pre => [...pre, ...res.data]);
    } else {
      setArticles([]);
      tip.addmessage('error', '获取该类文章列表失败');
      setStatus('error');
    }
  };

  const getData = async () => {
    if (chooseKindId === '0') {
      getAllArticles();
    } else {
      getAllArticlesByLabel(chooseKindId);
    }
  };

  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log('entry', entry);
      if (firstTime) {
        setFirstTime(false);
        return;
      }
      setPage(pre => {
        return { page: pre.page + 1, pageSize: pre.pageSize };
      });
    }
  }, [entry?.isIntersecting]);

  useEffect(() => {
    console.log('chooseKindId', chooseKindId);
    setArticles([]);
    setPage({ page: 1, pageSize: 30 });
    setIsOver(false);
    setStatus('loading');
  }, [chooseKindId]);

  useEffect(() => {
    console.log('Effect', page);
    getData();
  }, [page]);
  return (
    <>
      <div className="home-main-article-list">
        {articles.map(item => {
          return <ArticleItem key={item.id} articleInfo={item} />;
        })}
      </div>
      <div className="home-main-article-list-loading">
        {status === 'loading' && <Loading />}
        {status === 'empty' && <div className="home-main-article-list-loading-empty">暂无更多内容</div>}
        {status === 'error' && (
          <div className="home-main-article-list-loading-error" onClick={getData}>
            加载失败，点击重新加载
          </div>
        )}
      </div>
      {!isOver && articles.length > 0 && <div ref={moreRef} className="home-main-article-list-more"></div>}
    </>
  );
};

export default Main;
