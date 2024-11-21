import { hideLoader } from '@myStore/slices/loadingSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Web = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoader());
  });
  return (
    <div>
      <h1>Web</h1>
    </div>
  );
};

export default Web;
