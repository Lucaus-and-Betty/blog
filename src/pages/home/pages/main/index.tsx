import { ArrowForward } from '@mui/icons-material';
import { useEffect, useState, useRef } from 'react';
import newsService from './index.service';
import tip from '@myUtils/tip';
import { News } from './type';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@myStore/slices/languageSlice';
import { useWindowSize } from '@uidotdev/usehooks';
import './index.less';

/**
 * @description 首页
 */
const Main = () => {
  return (
    <div className="home-main">
      <NewsTopNav />
      <div></div>
      <div></div>
    </div>
  );
};

/**
 * @description 顶部新闻
 */
const NewsTopNav = () => {
  const windowSize = useWindowSize();
  const { LANGUAGE } = useSelector(selectLanguage);

  // 新闻列表
  const [newsList, setNewsList] = useState<News>([
    {
      id: '0',
      title: '暂无',
      description: '暂无新闻'
    }
  ]);
  // 新闻展示列表队列
  const showNewsList = useRef<News>([]);
  // 鼠标是否进入
  const mouseEnter = useRef<boolean>(false);
  // 用于计算是否内容宽度超出的新闻容器
  const newsContainerRef = useRef<HTMLDivElement>(null);
  // 用于添加新闻的父容器
  const newsParentsRef = useRef<HTMLDivElement>(null);
  // 新闻容器的宽度
  const newsContainerWidth = useRef<number>(0);

  /**
   * @description 从服务器获取新闻列表
   */
  const getAllNews = async () => {
    const newsData = await newsService.getAllNews();
    if (newsData.success) {
      // 如果没有新闻，就不赋值了
      if (newsData.data.length === 0) {
        return;
      }
      setNewsList(newsData.data);

      // 是否大于两条新闻
      if (newsData.data.length > 2) {
        // 剩下的加入展示队列
        newsData.data.slice(2).forEach((newsItem) => {
          showNewsList.current.push(newsItem);
        });
      }
    } else {
      tip.addmessage('error', '获取新闻列表失败');
    }
  };

  /**
   * @description 鼠标进入滚动新闻
   * @param {'enter' | 'leave'} type 操作类型
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event 事件对象
   */
  const enterNews = (type: 'enter' | 'leave', event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (type === 'enter') {
      // 鼠标进入
      mouseEnter.current = true;
      // 获取 classList 是否有 news-description-content-center 查看新闻长度是否超过容器长度，没超过不滚动
      if (event.currentTarget.classList.contains('news-description-content-center')) {
        return;
      }
      // 添加滚动类
      event.currentTarget.classList.add('news-description-content-move');
    } else {
      // 鼠标离开
      mouseEnter.current = false;
      // 移除滚动类
      event.currentTarget.classList.remove('news-description-content-move');
    }
  };

  /**
   * @description 创建新闻节点
   * @param {string} des 新闻描述
   * @param {string} id 新闻 id
   * @param {string} top 新闻 top
   */
  const createNewsNode = (des: string, id: string, top: string) => {
    const newElement = document.createElement('div');
    newElement.className = 'news-description-content';
    newElement.style.top = top;
    newElement.innerHTML = des;
    newElement.onmouseenter = (e) => enterNews('enter', (e as unknown) as React.MouseEvent<HTMLDivElement, MouseEvent>);
    newElement.onmouseleave = (e) => enterNews('leave', (e as unknown) as React.MouseEvent<HTMLDivElement, MouseEvent>);
    newElement.setAttribute('data-id', id);
    newsParentsRef.current?.appendChild(newElement);
    // 查看新闻长度是否超过容器长度
    if (newElement.clientWidth < newsContainerWidth.current) {
      newElement.classList.add('news-description-content-center');
    }
  };

  /**
   * @description 初始化获取新闻列表
   */
  useEffect(() => {
    getAllNews();
  }, []);

  /**
   * @description 计算新闻列表的宽度
   */
  useEffect(() => {
    if (newsContainerRef.current) {
      newsContainerWidth.current = newsContainerRef.current.clientWidth - 20 - 60 - 18 - 24;
    }
  }, [newsList, windowSize]);

  /**
   * @description 初始化新闻滚动前两条
   */
  useEffect(() => {
    if (newsParentsRef.current === null) {
      return;
    }
    if (newsList.length <= 1) {
      newsParentsRef.current.innerHTML = '';
      createNewsNode(newsList[0].description, newsList[0].id, '0%');
      return;
    }
    // 创建两个新闻
    newsParentsRef.current.innerHTML = '';
    createNewsNode(newsList[0].description, newsList[0].id, '0%');
    createNewsNode(newsList[1].description, newsList[1].id, '100%');
  }, [newsList]);

  /**
   * @description 新闻定时滚动
   */
  useEffect(() => {
    // 只有一个新闻时不滚动
    if (newsList.length === 1) {
      return;
    }

    // 三秒滚动一下
    const timer = setInterval(() => {
      // 鼠标在预览新闻时锁定滚动
      if (mouseEnter.current) {
        return;
      }

      // 滚动
      const newsElements = document.querySelectorAll('.news-description-content');
      newsElements.forEach((element) => {
        // 正则只得到现在的 top 中的数字
        const top = parseInt((element as HTMLDivElement).style.top.match(/\d+/)![0]);
        const newTop = top - 100;

        // 判断是否已经没有存在的必要，500 毫秒后删除该新闻
        if (newTop < 0) {
          setTimeout(() => {
            // 根据 id 从新闻列表中找到该新闻并加入展示队列
            const newId = element.getAttribute('data-id');
            newsList.forEach((newsItem) => {
              if (newsItem.id === newId) {
                showNewsList.current.push(newsItem);
              }
            });

            // 删除该新闻
            element.remove();

            // 从展示队列中取出新闻加入新闻列表
            if (showNewsList.current.length === 0) {
              // 展示队列为空，直接将刚删除的新闻加入新闻列表
              (element as HTMLDivElement).style.top = '100%';
              newsParentsRef.current?.appendChild(element);
            } else {
              // 从展示队列中取出新闻加入新闻列表
              const newNews = showNewsList.current.shift();
              createNewsNode(newNews!.description, newNews!.id, '100%');
            }
          }, 500);
        }
        // 减 100% 高度
        (element as HTMLDivElement).style.top = `${newTop}%`;
      });
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [newsList]);

  return (
    <div className="news" ref={newsContainerRef}>
      <span className="news-title">{LANGUAGE['News :']}</span>
      <div className="news-description" ref={newsParentsRef}></div>
      <ArrowForward className="enter-new"></ArrowForward>
    </div>
  );
};

export { Main };
