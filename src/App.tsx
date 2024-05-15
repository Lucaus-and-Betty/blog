import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { show, hide } from '@myStore/slices/searchSlice';
import { selectTheme } from '@myStore/slices/themeSlice';
import { SearchDialog } from '@myComponents/index';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '@myHooks/useTheme';
import './global.less';
import localforage from 'localforage';

const App = () => {
  useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const rootRef = useRef<HTMLDivElement>(null);
  const [rootTheme, setRootTheme] = useState<'theme-dark' | 'theme-light'>('theme-light');

  /**
   * @description 获取系统主题工具函数
   * @returns 系统主题
   */
  const systemTheme = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'theme-dark';
    } else {
      return 'theme-light';
    }
  };

  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  // 监听 ctrl + k 事件打开搜索框
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        dispatch(show());
      }
      if (e.key === 'Escape') {
        dispatch(hide());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, dispatch]);

  // 网站浏览过程中监听系统主题变化，因为使用全局变量 theme 判断会有执行顺序 bug 所以直接从 localforage 中获取
  useEffect(() => {
    const handleThemeChange = async () => {
      const themeColor = await localforage.getItem<string>('theme');
      if (themeColor === 'system') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          rootRef.current!.className = 'theme-dark';
        } else {
          rootRef.current!.className = 'theme-light';
        }
      }
    };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
    };
  });

  // 好奇怪，明明 theme 变了，但是 rootTheme 不会变。所以只能用 ref 来改变。目测是框架或者 浏览器 bug
  useEffect(() => {
    if (theme === 'system') {
      setRootTheme(systemTheme());
      rootRef.current!.className = systemTheme();
    } else if (theme === 'light') {
      setRootTheme('theme-light');
      rootRef.current!.className = 'theme-light';
    } else {
      setRootTheme('theme-dark');
      rootRef.current!.className = 'theme-dark';
    }
  }, [theme]);

  return (
    <div ref={rootRef} className={rootTheme}>
      <SearchDialog />
      <Outlet></Outlet>
    </div>
  );
};

export default App;
