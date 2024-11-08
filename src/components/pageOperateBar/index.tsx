import { changeToDark, changeToLight, selectTheme, changeToSystem } from '@myStore/slices/themeSlice.ts';
import { ArrowUpward, LightMode, DarkMode, SettingsBrightness, Home } from '@mui/icons-material';
import { useState, FC, useEffect } from 'react';
import { useBeforeNav } from '@myHooks/useBeforeNav';
import { useDispatch, useSelector } from 'react-redux';
import './index.less';

const PageOperateBar: FC<{
  customRef: React.RefObject<HTMLDivElement>;
}> = ({ customRef }) => {
  const dispatch = useDispatch();
  const navigate = useBeforeNav();
  const theme = useSelector(selectTheme);
  const [upShow, setUpShow] = useState<boolean>(false);

  useEffect(() => {
    if (!customRef.current) {
      return;
    }
    customRef.current.addEventListener('scroll', listenScroll);
  }, [customRef.current]);

  /**
   * @description 监听滚动
   * @param {React.UIEvent<HTMLDivElement>} e 滚动事件
   */
  const listenScroll = (e: Event) => {
    if (!e.currentTarget) {
      return;
    }
    const scrollTop = (e.currentTarget as HTMLDivElement).scrollTop;
    if (scrollTop > 300) {
      setUpShow(true);
    } else {
      setUpShow(false);
    }
  };

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
   * @description 滚动到顶部
   */
  const scrollToTop = () => {
    if (!customRef.current) {
      return;
    }
    customRef.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
      <div
        style={{
          transform: upShow ? 'scale(1)' : 'scale(0)'
        }}
        className="page-operate-bar-up"
        onClick={scrollToTop}
      >
        <ArrowUpward />
      </div>
      <div className="page-operate-bar-theme" onClick={changeTheme}>
        {theme === 'dark' && <DarkMode />}
        {theme === 'light' && <LightMode />}
        {theme === 'system' && <SettingsBrightness />}
      </div>
      <div className="page-operate-bar-to-home" onClick={toHome}>
        <Home />
      </div>
    </>
  );
};

export default PageOperateBar;
