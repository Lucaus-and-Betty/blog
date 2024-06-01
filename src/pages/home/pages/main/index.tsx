import { Loading } from '@myComponents/loading';

const Main = () => {
  return (
    <div style={{ height: '2000px' }}>
      <h1>Main</h1>
      <div
        style={{
          width: '300px',
          height: '50px'
        }}
      >
        <Loading size="20px" gap="10px" count={10} />
      </div>
    </div>
  );
};

export { Main };
