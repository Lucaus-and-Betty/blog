import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import store from '@myStore/store.ts';
import { Provider } from 'react-redux';
import { Suspense } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Suspense>
);
