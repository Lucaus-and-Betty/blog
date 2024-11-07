import { CalendarMonth, Update, Visibility } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, errorLoader } from '@myStore/slices/loadingSlice.ts';
import { ArticleInfoType } from './type.ts';
import articleService from './index.service.ts';
import { PageOperateBar } from '@/routerLazyLoad.ts';
import './index.less';
import { SERVER_IMG_URL } from '@myConstants/server.ts';

/**
 * @description 文章组件
 */
const Article = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const artcleContainerRef = useRef<HTMLDivElement>(null);
  const [articleInfo, setArticleInfo] = useState<ArticleInfoType | null>(null);

  /**
   * @description 获取文章
   * @param {string} id
   */
  const getArticleById = async (id: string) => {
    const article = await articleService.getArticleContentById(id);
    if (article.success) {
      dispatch(hideLoader());
      setArticleInfo(article.data);
    } else {
      dispatch(errorLoader());
    }
  };

  useEffect(() => {
    const id = param.id;
    if (!id) {
      dispatch(errorLoader());
      return;
    }
    getArticleById(id);
  }, []);

  return (
    <div className="artcle-container" ref={artcleContainerRef}>
      <PageOperateBar customRef={artcleContainerRef} />
      {articleInfo && (
        <div className="artcle-text">
          <span className="artcle-title">{articleInfo.title}</span>
          <div className="artcle-label">
            {articleInfo.labels.map(label => {
              return <span key={label.id}>{label.title}</span>;
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
      <div className="artcle-cover">{articleInfo && <img src={SERVER_IMG_URL + articleInfo.cover} alt="cover" />}</div>
      {articleInfo && <div className="artcle-content" dangerouslySetInnerHTML={{ __html: articleInfo.content }}></div>}
    </div>
  );
};

export default Article;
