import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { hideLoader } from '@myStore/slices/loadingSlice';
import { useDispatch } from 'react-redux';
import localforage from 'localforage';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { NovelHistoryType, NovelChapterType } from './type';
import novelService from './index.service';
import './index.less';

const NovelChapter = () => {
  // 获取根组件的返回顶部方法
  const backToTop = useOutletContext<() => void>();
  const dispatch = useDispatch();
  const { novelId } = useParams<{ novelId: string }>();
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [previousId, setPreviousId] = useState<string | null>(null);
  const [nextId, setNextId] = useState<string | null>(null);
  const [novelContent, setNovelContent] = useState<NovelChapterType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getCurrentId = async () => {
    // 看看是否有观看的记录
    const storage = await localforage.getItem<string>('novel_history');
    if (storage) {
      const history: NovelHistoryType[] = JSON.parse(storage || '[]');
      const current = history.find(item => item.novelId === novelId);
      if (current) {
        setCurrentId(current.chapterId);
      }
    } else {
      setCurrentId('');
    }
  };

  /**
   * @description 根据 currentId 获取小说内容
   * @param {string} currentId  当前章节id
   */
  const getNovelContent = async (currentId: string) => {
    setLoading(true);
    dispatch(hideLoader());
    if (!novelId) return;
    if (currentId === '') {
      const res = await novelService.getNovelContentByOrder(novelId, 1);
      if (res.success) {
        setNovelContent(res.data);
        localforage.setItem('novel_history', JSON.stringify([{ novelId, chapterId: res.data.id }]));
        setPreviousId(res.data.previousId);
        setCurrentId(res.data.id);
        getNextId(res.data.id);
      }
    } else {
      const res = await novelService.getNovelContentById(currentId);
      if (res.success) {
        setNovelContent(res.data);
        localforage.setItem('novel_history', JSON.stringify([{ novelId, chapterId: res.data.id }]));
        setPreviousId(res.data.previousId);
        setCurrentId(res.data.id);
        getNextId(res.data.id);
      }
    }
    setLoading(false);
  };

  const getNextId = async (id: string) => {
    try {
      if (!novelId) return;
      if (currentId === '' || currentId === null) return;
      const res = await novelService.getNovelChapterIdByPreviousId(id);
      if (res.success) {
        setNextId(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeChapter = (id: string) => {
    backToTop();
    setCurrentId(id);
  };

  useEffect(() => {
    // 获取要展示的当前章节id
    getCurrentId();
  }, []);

  useEffect(() => {
    if (currentId === null) return;
    getNovelContent(currentId);
  }, [currentId]);

  return (
    <div className="novel-chapter">
      {novelContent && <div className="novel-chapter-title">{`第${novelContent.order}章 ${novelContent.name}`}</div>}
      <div className="novel-chapter-content-area">{novelContent && JSON.parse(novelContent.content)}</div>
      <div className="novel-chapter-content-operation">
        {!previousId && <div className="novel-chapter-previous-next-space"></div>}
        {previousId && (
          <div
            style={{
              pointerEvents: loading ? 'none' : 'auto',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            className="novel-chapter-previous-next"
          >
            <ArrowBackIos
              onClick={() => {
                changeChapter(previousId);
              }}
            />
          </div>
        )}
        <div className="novel-chapter-choose">123</div>
        {!nextId && <div></div>}
        {nextId && (
          <div
            style={{
              pointerEvents: loading ? 'none' : 'auto',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            className="novel-chapter-previous-next"
          >
            <ArrowForwardIos
              onClick={() => {
                changeChapter(nextId);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NovelChapter;
