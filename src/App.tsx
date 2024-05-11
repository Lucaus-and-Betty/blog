import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('render: ' + 'App rendered');
    navigate('/home');
  }, [navigate]);
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default App;
