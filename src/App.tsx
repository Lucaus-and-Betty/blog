import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { show, hide } from '@myStore/slices/searchSlice';
import { SearchDialog } from '@myComponents/index';
import { Outlet, useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('render: ' + 'App rendered');
    navigate('/home');
  }, [navigate]);

  // 监听 ctrl + k 事件打开搜索框
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        dispatch(show());
      }
      if (e.key === 'Escape') {
        dispatch(hide());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, dispatch]);

  return (
    <>
      <SearchDialog />
      <Outlet></Outlet>
    </>
  );
};

export default App;
