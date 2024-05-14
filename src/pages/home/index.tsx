import { useState, FC } from 'react';
import { Space } from '@myComponents/Space';
import { NavigationList, projectList } from './type.ts';
import { useNavigate, Outlet, useMatch } from 'react-router-dom';
import { Dns, Search, Settings, Notifications } from '@mui/icons-material';
import { logo } from '@myAssets/icon';
import './index.less';

const Home = () => {
  // home 页面滚动的距离
  const [homeScrollY, setHomeScrollY] = useState(0);

  // 检测滚动了多少距离
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    console.log('滚动了多少距离', e.currentTarget.scrollTop);
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
  const navigate = useNavigate();

  // 用来判断当前页面的路径，从而显示导航栏的样式
  const match = useMatch('/home/:pagePath');

  console.log('match', match?.params.pagePath);

  // 导航到指定页面
  const navToPage = (pagePath: string) => {
    return () => {
      navigate(pagePath);
    };
  };

  return (
    // home 发生滚动时，导航栏变得不透明
    <nav className={homeScrollY > 0 ? 'navigation navigation-scroll' : 'navigation'}>
      {/* 导航栏左侧部分 */}
      <div className="navigation-left">
        <div className="blog-logo">
          <div className="logo">{logo}</div>
          <Dns className="project"></Dns>
          <div className="project-list-container">
            <div className="project-list">
              {projectList.map(item => {
                return (
                  <div className="type-project" key={item.title}>
                    <div className="project-list-title">{item.title}</div>
                    <div className="personal-list">
                      {item.personalList.map(personal => {
                        return (
                          <div className="personal-list-item" key={personal.title}>
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
      {/* 导航栏中间部分 */}
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
      {/* 导航栏右边部分 */}
      <div className="navigation-right">
        <div>
          <div className="navigation-search">
            <Search />
            <span>Search...</span>
            <div>Ctrl+k</div>
          </div>
        </div>
        <div>
          <Notifications />
        </div>
        <div>
          <Settings />
        </div>
      </div>
    </nav>
  );
};

export { Home };
