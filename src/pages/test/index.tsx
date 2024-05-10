import { selectCount } from '@myStore/slices/countSlice';
import { useSelector } from 'react-redux';

const Test = () => {
  const count = useSelector(selectCount);
  return <div>{count}</div>;
};

export { Test };
