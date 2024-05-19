import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeToEN, changeToCN } from '@myStore/slices/languageSlice';
import localforage from 'localforage';

/**
 * @description 查看缓存的语言是什么设置，并且更新全局变量 language
 */
const useLanguage = () => {
  const dispatch = useDispatch();
  const setTheme = async () => {
    const language = await localforage.getItem<'EN' | 'CN'>('language');
    if (language === 'EN' || language === null) {
      dispatch(changeToEN());
    } else {
      dispatch(changeToCN());
    }
  };
  useEffect(() => {
    setTheme();
  });
};

export { useLanguage };
