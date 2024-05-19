import { useEffect, useState, useRef } from 'react';
import { FullScreenMask } from '@myComponents/index';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearch, show, hide } from '@myStore/slices/searchSlice';
import { Search, Schedule, Close } from '@mui/icons-material';
import { selectLanguage } from '@myStore/slices/languageSlice';
import './index.less';

interface SearchHistory {
  id: number;
  content: string;
}

const searchHistory: SearchHistory[] = [
  {
    id: 1,
    content: 'Lucuas'
  },
  {
    id: 2,
    content: 'Betty'
  }
];

/**
 * @description 搜索弹框
 */
const SearchDialog = () => {
  const { LANGUAGE } = useSelector(selectLanguage);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  const [placeholderText, setPlaceholderText] = useState(LANGUAGE['Enter to search']);
  const [text, setText] = useState('');

  const setSearchDialog = (type: boolean) => {
    if (type) {
      dispatch(show());
    } else {
      dispatch(hide());
    }
  };

  useEffect(() => {
    if (search) {
      searchInputRef.current?.focus();
      setText('');
    }
  }, [search]);
  return (
    <FullScreenMask setClose={setSearchDialog} show={search}>
      <div
        className={search ? 'search-dialog search-dialog-show' : 'search-dialog'}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="search-dialog-close-container" onClick={() => dispatch(hide())}>
          <Close className="search-dialog-close" />
        </div>
        <div className="search-dialog-content">
          <Search />
          <div>
            <span className="search-dialog-title">{LANGUAGE['Search']}</span>
          </div>
        </div>
        <div className="search-dialog-input-container">
          <input
            ref={searchInputRef}
            className="search-dialog-input"
            type="text"
            placeholder={placeholderText}
            onFocus={() => setPlaceholderText('')}
            onBlur={() => setPlaceholderText(LANGUAGE['Enter to search'])}
            onChange={e => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className="search-dialog-line"></div>
        <div>
          <div className="search-dialog-content">
            <Schedule />
            <div>
              <span className="search-dialog-title">{LANGUAGE['Recent']}</span>
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

export { SearchDialog };
