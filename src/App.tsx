import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { show, hide } from '@myStore/slices/searchSlice';
import { selectTheme } from '@myStore/slices/themeSlice';
import { SearchDialog, StarsCanvas } from '@myComponents/index';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme, useLanguage } from '@myHooks/index';
import './global.less';
import localforage from 'localforage';

const App = () => {
  useTheme();
  useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
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
    if (location.pathname === '/') {
      navigate('/home');
    }
  }, [navigate, location]);

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
          setRootTheme('theme-dark');
        } else {
          setRootTheme('theme-light');
        }
      }
    };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
    };
  });

  useEffect(() => {
    if (theme === 'system') {
      setRootTheme(systemTheme());
    } else if (theme === 'light') {
      setRootTheme('theme-light');
    } else {
      setRootTheme('theme-dark');
    }
  }, [theme]);

  return (
    <div id="app" className={rootTheme}>
      <SearchDialog />
      {rootTheme === 'theme-dark' && <StarsCanvas />}
      <Outlet></Outlet>
    </div>
  );
};

export default App;
