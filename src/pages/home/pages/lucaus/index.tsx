import { hideLoader } from '@myStore/slices/loadingSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './index.less';

const Lucaus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoader());
  });
  return (
    <div>
      <h1>Hello! Here is Lucaus</h1>
    </div>
  );
};

export default Lucaus;
