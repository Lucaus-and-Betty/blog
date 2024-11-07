import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { showLoader } from '@myStore/slices/loadingSlice';
import { useRef } from 'react';

/**
 * @description 返回一个新的导航钩子，用来拦截导航
 * @returns 导航函数
 */
const useBeforeNav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timer = useRef<undefined | number>(undefined);
  /**
   * @description 导航前拦截
   * @param {string} to 导航目标
   * @param {string} failMessage 导航失败提示
   */
  const beforeNav = (to: string) => {
    if (to === location.pathname) {
      navigate(to);
    } else {
      dispatch(showLoader());
      timer.current = setTimeout(() => {
        navigate(to);
        clearTimeout(timer.current);
      }, 1500);
    }
  };
  return beforeNav;
};
export { useBeforeNav };
