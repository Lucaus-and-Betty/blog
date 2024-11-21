import { hideLoader } from '@myStore/slices/loadingSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Betty = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoader());
  });
  return (
    <div>
      <h1>Betty</h1>
    </div>
  );
};

export default Betty;
