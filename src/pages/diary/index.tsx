import diaryService from './index.service';
import { useDispatch } from 'react-redux';
import { errorLoader, hideLoader } from '@myStore/slices/loadingSlice';
import { useEffect, useRef, useState } from 'react';
import { DiaryInfoType } from './type';
import { SERVER_IMG_URL } from '@myConstants/server';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import { Loading, PageOperateBar } from '@/routerLazyLoad';
import './index.less';

const Diary = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // 列表容器宽度
  const [listContainerWidth, setListContainerWidth] = useState(0);
  // 列表容器
  const listRef = useRef<HTMLDivElement>(null);
  // 日记数据列表
  const [diaryList, setDiaryList] = useState<DiaryInfoType[] | null>(null);
  // 列表容器中的列数
  const [clumnCount, setClumnCount] = useState(0);
  // 加载状态
  const [status, setStatus] = useState<'loading' | 'error' | 'done'>('loading');
  const [page, setPage] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 0, pageSize: 30 });
  const [isOver, setIsOver] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [moreRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      setPage(pre => {
        return { page: pre.page + 1, pageSize: pre.pageSize };
      });
    }
  }, [entry?.isIntersecting]);

  useEffect(() => {
    getDiariesByPage(page);
  }, [page]);

  /**
   * 通过分页获取日记列表
   * @param {number} page 页码
   * @param pageSize 一页的日记数量
   */
  const getDiariesByPage = async (page: { page: number; pageSize: number }) => {
    setStatus('loading');
    const res = await diaryService.getDiariesByPage(page.page, page.pageSize);
    if (res.success) {
      setStatus('done');
      if (page.page === 1) {
        setDiaryList(res.data);
      } else {
        setDiaryList(pre => [...(pre || []), ...res.data]);
      }
      setIsOver(res.isOver);
      dispatch(hideLoader());
    } else {
      setStatus('error');
      setDiaryList(null);
      dispatch(errorLoader());
    }
  };

  // 监听 clumnCount 的变化赋值数据
  useEffect(() => {
    // 如果列数小于 2 说明没有完成条件判断
    if (clumnCount < 2) return;
    // 没有数据就请求，有数据就从第一页请求
    if (!diaryList) {
      getDiariesByPage(page);
    } else {
      setPage({ page: 1, pageSize: 30 });
    }
  }, [clumnCount]);

  // 监听窗口变化，更新 listContainerWidth
  useEffect(() => {
    if (listRef.current) {
      const width = listRef.current.getBoundingClientRect().width;
      setListContainerWidth(width);
    }

    const getListContainerWidth = () => {
      if (listRef.current) {
        const width = listRef.current.getBoundingClientRect().width;
        setListContainerWidth(width);
      }
    };

    window.addEventListener('resize', getListContainerWidth);

    return () => {
      window.removeEventListener('resize', () => {
        if (listRef.current) {
          const width = listRef.current.getBoundingClientRect().width;
          setListContainerWidth(width);
        }
      });
    };
  }, [listRef.current]);

  // 根据 listContainerWidth 的值，创建对应的 clumns div
  useEffect(() => {
    createClumnsCondition();
  }, [listContainerWidth]);

  // 数据变化的时候重新计算每个列表的布局
  useEffect(() => {
    if (!diaryList) return;
    const clumns = document.querySelectorAll('.diary-list-item');
    diaryList.forEach(item => {
      let minHeighNode: Element = clumns[0];
      // 获取所有的 clumns
      // 遍历每个 clumns 看谁的高度最小
      for (let i = 0; i < clumns.length; i++) {
        const clumn = clumns[i];
        const height = clumn.getBoundingClientRect().height;
        if (height < minHeighNode.getBoundingClientRect().height) {
          minHeighNode = clumn;
        }
      }
      const diaryitemNode = createDiartItemNode(item);
      insertNode(minHeighNode, diaryitemNode);
    });
  }, [diaryList, listContainerWidth]);

  /**
   * 将 diaryNode 插入到 listNode 中
   * @param {Element} listNode 列表节点
   * @param {Element} diaryNode 日记节点
   */
  const insertNode = (listNode: Element, diaryNode: Element) => {
    listNode.appendChild(diaryNode);
  };

  /**
   * 根据当前 listContainerWidth 的值，创建对应的
   * clumns,并将其天添加到 listRef.current 上
   */
  const createClumnsCondition = () => {
    if (listContainerWidth > 1000) {
      // 先删除所有节点
      if (listRef.current) {
        listRef.current.innerHTML = '';
      }
      // 再新创建四个
      for (let i = 0; i < 4; i++) {
        const node = createNode([`diary-list-${i}`, 'diary-list-item']);
        listRef.current?.appendChild(node);
      }
      setClumnCount(4);
      return;
    }
    if (listContainerWidth > 800) {
      // 先删除所有节点
      if (listRef.current) {
        listRef.current.innerHTML = '';
      }
      // 再新创建三个
      for (let i = 0; i < 3; i++) {
        const node = createNode([`diary-list-${i}`, 'diary-list-item']);
        listRef.current?.appendChild(node);
      }
      setClumnCount(3);
      return;
    }
    if (listContainerWidth > 0) {
      // 先删除所有节点
      if (listRef.current) {
        listRef.current.innerHTML = '';
      }
      // 再新创建两个
      for (let i = 0; i < 2; i++) {
        const node = createNode([`diary-list-${i}`, 'diary-list-item']);
        listRef.current?.appendChild(node);
      }
      setClumnCount(2);
      return;
    }
  };

  /**
   * @description 生成一个自定义节点
   * @param {string} className 节点的 className
   * @param {string} type 节点的类型
   * @return {HTMLElement} 生成的节点
   */
  const createNode = (className: string[], type: string = 'div'): HTMLElement => {
    const node = document.createElement(type);
    node.className = className.join(' ');
    return node;
  };

  /**
   * @description 生成一个 diaryItem 节点
   * @param {DiaryInfoType} diaryInfo 日记信息
   * @return {HTMLElement} 生成的节点
   */
  const createDiartItemNode = (diaryInfo: DiaryInfoType): HTMLElement => {
    console.log(diaryInfo);
    const node = document.createElement('div');
    node.className = 'diary-item';

    const content = document.createElement('div');
    content.className = 'diary-item-content';
    content.innerHTML = diaryInfo.content;
    node.appendChild(content);

    const imgContainer = document.createElement('div');
    imgContainer.className = 'diary-item-img-container';
    node.appendChild(imgContainer);

    const line = document.createElement('div');
    line.className = 'diary-item-line';
    node.appendChild(line);

    diaryInfo.imgs.forEach(item => {
      const img = document.createElement('img');
      img.className = 'diary-item-img';
      img.src = SERVER_IMG_URL + item;
      imgContainer.appendChild(img);
    });

    const time = document.createElement('div');
    time.className = 'diary-item-time';
    time.innerHTML = diaryInfo.time;
    node.appendChild(time);
    return node;
  };

  return (
    <div ref={containerRef} className="diary-container">
      <PageOperateBar customRef={containerRef} />
      <h1>Diary</h1>
      <div ref={listRef} className="diary-list"></div>
      <div className="diary-loading">
        {isOver && <div className="diary-none">暂无更多内容</div>}
        {status === 'loading' && <Loading />}
        {status === 'error' && (
          <div className="diary-reload" onClick={() => getDiariesByPage(page)}>
            加载失败，点击重新加载
          </div>
        )}
      </div>
      {!isOver && <div ref={moreRef} className="diary-more"></div>}
    </div>
  );
};

export default Diary;
