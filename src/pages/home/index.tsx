import { useState, FC } from 'react';
import { Space } from '@myComponents/index.ts';
import { NavigationList, projectList } from './type.ts';
import { useNavigate, Outlet, useMatch } from 'react-router-dom';
import {
  Dns as DnsIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  SettingsBrightness as SettingsBrightnessIcon
} from '@mui/icons-material';
import { SideBar } from '@myComponents/index.ts';
import { logo } from '@myAssets/icon';
import { useDispatch, useSelector } from 'react-redux';
import { show } from '@myStore/slices/searchSlice';
import { changeToDark, changeToLight, changeToSystem } from '@myStore/slices/themeSlice.ts';
import { selectTheme } from '@myStore/slices/themeSlice.ts';
import './index.less';

const Home = () => {
  // home 页面滚动的距离
  const [homeScrollY, setHomeScrollY] = useState(0);

  // 检测滚动了多少距离
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setHomeScrollY(e.currentTarget.scrollTop);
  };

  return (
    <div className="home" onScroll={handleScroll}>
      <Navigation homeScrollY={homeScrollY} />
      <Space width="100%" height="60px"></Space>
      <div className="home-content">
        <Outlet />
      </div>
    </div>
  );
};

interface NavigationProps {
  homeScrollY: number;
}
const Navigation: FC<NavigationProps> = ({ homeScrollY }) => {
  return (
    // home 发生滚动时，导航栏变得不透明
    <nav className={homeScrollY > 0 ? 'navigation navigation-scroll' : 'navigation'}>
      <NavigationLeft />
      <NavigationMiddle />
      <NavigationRight />
    </nav>
  );
};

const NavigationLeft = () => {
  const navigate = useNavigate();

  // 导航到指定页面
  const navToPage = (pagePath: string) => {
    return () => {
      navigate(pagePath);
    };
  };

  return (
    <div className="navigation-left">
      <div className="blog-logo">
        <div className="logo">{logo}</div>
        <DnsIcon className="project"></DnsIcon>
        <div className="project-list-container">
          <div className="project-list">
            {projectList.map(item => {
              return (
                <div className="type-project" key={item.title}>
                  <div className="project-list-title">{item.title}</div>
                  <div className="personal-list">
                    {item.personalList.map(personal => {
                      return (
                        <div className="personal-list-item" key={personal.id}>
                          {personal.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="blog-title-container" onClick={navToPage('/home')}>
        <span className="blog-title">Lucuas & Betty</span>
        <span className="blog-title-link">home</span>
      </div>
    </div>
  );
};

const NavigationMiddle = () => {
  const navigate = useNavigate();

  // 用来判断当前页面的路径，从而显示导航栏的样式
  const match = useMatch('/home/:pagePath');

  // 导航到指定页面
  const navToPage = (pagePath: string) => {
    return () => {
      navigate(pagePath);
    };
  };
  return (
    <>
      {NavigationList.map(item => {
        return (
          <div className="navigation-list-item" key={item.key}>
            <div className="navigation-list-item-content">
              <span>{item.title}</span>
            </div>
            <div className="navigation-list-item-child">
              <div className="navigation-list-item-child-content">
                {item.chidren.map(child => {
                  return (
                    <div
                      key={child.key}
                      className={
                        match?.params.pagePath === child.path
                          ? 'navigation-list-item-child-content-item navigation-list-item-child-content-item-select'
                          : 'navigation-list-item-child-content-item'
                      }
                      onClick={navToPage(child.path)}
                    >
                      <span className="navigation-list-item-child-content-item-title">{child.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const NavigationRight = () => {
  const dispatch = useDispatch();
  const [settingsSideBarShow, setSettingsSideBarShow] = useState(false);
  const [settingsAnimation, setSettingsAnimation] = useState(false);
  const theme = useSelector(selectTheme);

  const changeTheme = (theme: string) => {
    return () => {
      if (theme === 'system') {
        dispatch(changeToSystem());
      } else if (theme === 'light') {
        dispatch(changeToLight());
      } else {
        dispatch(changeToDark());
      }
    };
  };

  return (
    <div className="navigation-right">
      <div>
        <div
          className="navigation-search"
          onClick={() => {
            dispatch(show());
          }}
        >
          <SearchIcon />
          <span className="search-tip">Search...</span>
          <div className="search-shortcut-key">Ctrl+k</div>
        </div>
      </div>
      <div
        className="navigation-settings"
        onClick={() => setSettingsSideBarShow(true)}
        onMouseEnter={() => setSettingsAnimation(true)}
        onMouseLeave={() => setSettingsAnimation(false)}
      >
        <SettingsIcon
          className={
            settingsAnimation
              ? 'navigation-settings-icon navigation-settings-icon-animation'
              : 'navigation-settings-icon'
          }
        />
        <SideBar show={settingsSideBarShow} setClose={setSettingsSideBarShow}>
          <div className="settings">
            <div className="settings-top">
              <div className="settings-title-container">
                <SettingsIcon className="navigation-settings-icon" />
                <span className="settings-title">Settings</span>
              </div>
              <div className="settings-close" onClick={() => setSettingsSideBarShow(false)}>
                <CloseIcon></CloseIcon>
              </div>
            </div>
            <div className="settings-content">
              <div className="settings-item">
                <span className="settings-secondary-title">Theme</span>
                <div className="settings-theme">
                  <div
                    className={
                      theme === 'system' ? 'settings-theme-icon settings-theme-icon-select' : 'settings-theme-icon'
                    }
                    onClick={changeTheme('system')}
                  >
                    <SettingsBrightnessIcon></SettingsBrightnessIcon>
                  </div>
                  <div
                    className={
                      theme === 'light' ? 'settings-theme-icon settings-theme-icon-select' : 'settings-theme-icon'
                    }
                    onClick={changeTheme('light')}
                  >
                    <LightModeIcon></LightModeIcon>
                  </div>
                  <div
                    className={
                      theme === 'dark' ? 'settings-theme-icon settings-theme-icon-select' : 'settings-theme-icon'
                    }
                    onClick={changeTheme('dark')}
                  >
                    <DarkModeIcon></DarkModeIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SideBar>
      </div>
    </div>
  );
};
export { Home };
