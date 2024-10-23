import { useState, FC, useEffect } from 'react';
import { Space, SideBar } from '@myComponents/index.ts';
import { NavigationList, ProjectList } from './type.ts';
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
import { logo } from '@myAssets/icon';
import { useDispatch, useSelector } from 'react-redux';
import { show } from '@myStore/slices/searchSlice';
import { changeToDark, changeToLight, changeToSystem, selectTheme } from '@myStore/slices/themeSlice.ts';
import { changeToCN, changeToEN, selectLanguage } from '@myStore/slices/languageSlice.ts';
import homeService from './index.service.ts';
import './index.less';

/**
 * @description 主页面
 */
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
      <div className="home-content">
        <Space width="100%" height="60px"></Space>
        <Outlet />
      </div>
    </div>
  );
};

interface NavigationProps {
  homeScrollY: number;
}
/**
 * @description 导航栏
 * @param {number} homeScrollY home 页面滚动的距离
 */
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

/**
 * @description 导航栏左侧部分
 */
const NavigationLeft = () => {
  const { LANGUAGE } = useSelector(selectLanguage);
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState<ProjectList[] | null>(null);

  // 导航到指定页面
  const navToPage = (pagePath: string) => {
    return () => {
      navigate(pagePath);
    };
  };

  // 获取最新的项目列表
  const getNewProjectListFetch = async () => {
    const newProjectList = await homeService.getProjectList();
    if (newProjectList.success) {
      setProjectList(newProjectList.data);
    }
  };

  useEffect(() => {
    getNewProjectListFetch();
  }, []);

  return (
    <div className="navigation-left">
      <div className="blog-logo">
        <div className="logo">{logo}</div>
        <DnsIcon className="project"></DnsIcon>
        {projectList && (
          <div className="project-list-container">
            <div className="project-list">
              {projectList.map(item => {
                return (
                  <div className="type-project" key={item.title}>
                    <div className="project-list-title">{LANGUAGE[item.title]}</div>
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
        )}
      </div>
      <div className="blog-title-container" onClick={navToPage('/home')}>
        <span className="blog-title">Lucuas & Betty</span>
        <span className="blog-title-link">{LANGUAGE['home']}</span>
      </div>
    </div>
  );
};

/**
 * @description 导航栏中间部分
 */
const NavigationMiddle = () => {
  const { LANGUAGE } = useSelector(selectLanguage);
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
              <span>{LANGUAGE[item.title]}</span>
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
                      <div className="navigation-list-item-child-content-item-icon">
                        <child.icon></child.icon>
                      </div>
                      <span className="navigation-list-item-child-content-item-title">{LANGUAGE[child.title]}</span>
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

/**
 * @description 导航栏右侧部分
 */
const NavigationRight = () => {
  const { LANGUAGE, languageType } = useSelector(selectLanguage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  // 用来判断当前页面的路径，从而显示导航栏的样式
  const match = useMatch('/home/:pagePath');

  const [settingsSideBarShow, setSettingsSideBarShow] = useState(false);
  const [navSideBarShow, setNavSideBarShow] = useState(false);

  // 导航到指定页面
  const navToPage = (pagePath: string) => {
    navigate(pagePath);
  };

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
          <span className="search-tip">{LANGUAGE['Search']}...</span>
          <div className="search-shortcut-key">Ctrl+k</div>
        </div>
      </div>
      <div className="navigation-side-list">
        <div
          className="navigation-side-list-icon"
          onClick={() => {
            setNavSideBarShow(true);
          }}
        >
          <div className="navigation-side-list-icon-line list-icon-line-top"></div>
          <div className="navigation-side-list-icon-line list-icon-line-middle"></div>
          <div className="navigation-side-list-icon-line list-icon-line-bottom"></div>
        </div>
        <SideBar show={navSideBarShow} setClose={setNavSideBarShow}>
          <div className="nav">
            <div className="nav-top">
              <div className="nav-title-container">
                <SettingsIcon className="navigation-nav-icon" />
                <span className="nav-title">{LANGUAGE['Navigation']}</span>
              </div>
              <div className="nav-close" onClick={() => setNavSideBarShow(false)}>
                <CloseIcon></CloseIcon>
              </div>
            </div>
            <div className="nav-content">
              {NavigationList.map(item => {
                return (
                  <div className="nav-item" key={item.key}>
                    <span className="nav-secondary-title">{LANGUAGE[item.title]}</span>
                    <div className="nav-item-item">
                      {item.chidren.map(child => {
                        return (
                          <div
                            className={
                              match?.params.pagePath === child.path
                                ? 'nav-item-item-card nav-item-item-card-select'
                                : 'nav-item-item-card'
                            }
                            key={child.key}
                            onClick={() => {
                              navToPage(child.path);
                              setNavSideBarShow(false);
                            }}
                          >
                            <div className="nav-item-item-card-icon">
                              <div className="nav-item-item-card-icon-animation">
                                <child.icon></child.icon>
                              </div>
                            </div>
                            <div className="nav-item-item-card-title">{LANGUAGE[child.title]}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SideBar>
      </div>
      <div className="navigation-settings" onClick={() => setSettingsSideBarShow(true)}>
        <SettingsIcon className="navigation-settings-icon" />
        <SideBar show={settingsSideBarShow} setClose={setSettingsSideBarShow}>
          <div className="settings">
            <div className="settings-top">
              <div className="settings-title-container">
                <SettingsIcon className="navigation-settings-icon" />
                <span className="settings-title">{LANGUAGE['Settings']}</span>
              </div>
              <div className="settings-close" onClick={() => setSettingsSideBarShow(false)}>
                <CloseIcon></CloseIcon>
              </div>
            </div>
            <div className="settings-content">
              <div className="settings-item">
                <span className="settings-secondary-title">{LANGUAGE['Theme']}</span>
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
              <div className="settings-item">
                <span className="settings-secondary-title">{LANGUAGE['Language']}</span>
                <div className="settings-language">
                  <div
                    className={
                      languageType === 'CN'
                        ? 'settings-language-item settings-language-item-select'
                        : 'settings-language-item'
                    }
                    onClick={() => dispatch(changeToCN())}
                  >
                    简体中文
                  </div>
                  <div
                    className={
                      languageType === 'EN'
                        ? 'settings-language-item settings-language-item-select'
                        : 'settings-language-item'
                    }
                    onClick={() => dispatch(changeToEN())}
                  >
                    English
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
