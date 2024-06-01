import './index.less';
import { useLanguage } from '@myHooks/index';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@myStore/slices/languageSlice';

const Error = () => {
  useLanguage();
  const language = useSelector(selectLanguage);

  return (
    <div className="not-found">
      <div className="text">{language.LANGUAGE['404 Page Not Found']}</div>
      <div className="lamp">
        <div className="light-line"></div>
        <div className="lampshade"></div>
        <div className="lampshade-oval-big"></div>
        <div className="lampshade-oval-small-mask">
          <div className="lampshade-oval-small"></div>
        </div>
        <div className="light"></div>
      </div>
    </div>
  );
};

export { Error };
