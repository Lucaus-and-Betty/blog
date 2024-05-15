import { useEffect } from 'react';
import { themeType } from '@myTypes/index';
import { useDispatch } from 'react-redux';
import { changeToDark, changeToLight, changeToSystem } from '@myStore/slices/themeSlice';
import localforage from 'localforage';

/**
 * @description 查看缓存的主题是什么设置，并且更新全局变量 theme
 */
const useTheme = () => {
  const dispatch = useDispatch();
  const setTheme = async () => {
    const theme = await localforage.getItem<themeType>('theme');
    if (theme === 'system' || theme === null) {
      dispatch(changeToSystem());
    } else {
      if (theme === 'light') {
        dispatch(changeToLight());
      } else {
        dispatch(changeToDark());
      }
    }
  };
  useEffect(() => {
    setTheme();
  });
};

export { useTheme };
