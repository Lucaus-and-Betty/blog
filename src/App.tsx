import { useEffect, useState } from 'react';
import { FullScreenMask } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearch, show, hide } from '@myStore/slices/searchSlice';
import { searchHistory } from './pages/home/type';
import { Search, Schedule } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.less';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('render: ' + 'App rendered');
    navigate('/home');
  }, [navigate]);

  // 监听 ctrl + k 事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        dispatch(show());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, dispatch]);

  return (
    <>
      <SearchDialog></SearchDialog>
      <Outlet></Outlet>
    </>
  );
};

const SearchDialog = () => {
  const dispatch = useDispatch();

  const search = useSelector(selectSearch);
  const [placeholderText, setPlaceholderText] = useState('回车进行搜索');

  const setSearchDialog = (type: boolean) => {
    if (type) {
      dispatch(show());
    } else {
      dispatch(hide());
    }
  };

  return (
    <FullScreenMask setClose={setSearchDialog} show={search}>
      <div
        className={search ? 'search-dialog search-dialog-show' : 'search-dialog'}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="search-dialog-content">
          <Search />
          <div>
            <span className="search-dialog-title">Search</span>
          </div>
        </div>
        <div className="search-dialog-input-container">
          <input
            className="search-dialog-input"
            type="text"
            placeholder={placeholderText}
            onFocus={() => setPlaceholderText('')}
            onBlur={() => setPlaceholderText('回车进行搜索')}
          />
        </div>
        <div className="search-dialog-line"></div>
        <div>
          <div className="search-dialog-content">
            <Schedule />
            <div>
              <span className="search-dialog-title">Recent</span>
            </div>
          </div>
          <div className="search-history-list">
            {searchHistory.map(item => {
              return (
                <div className="search-dialog-history-item" key={item.id}>
                  {item.content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </FullScreenMask>
  );
};
export default App;
