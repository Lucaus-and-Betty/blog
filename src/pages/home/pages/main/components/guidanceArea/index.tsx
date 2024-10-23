import { useSelector } from 'react-redux';
import { selectLanguage } from '@myStore/slices/languageSlice.ts';
import './index.less';

const GuidanceArea = () => {
  const { LANGUAGE } = useSelector(selectLanguage);

  return (
    <div className="home-main-guidance">
      <div className="home-main-guidance-left">123</div>
      <div className="home-main-guidance-right">
        <div className="home-main-guidance-right-text">
          <span>{LANGUAGE['Diary']}</span>
        </div>
      </div>
    </div>
  );
};

export { GuidanceArea };
