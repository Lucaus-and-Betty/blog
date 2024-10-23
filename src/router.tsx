import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.tsx';
import { Error, Home, Article } from '@myPages/index.ts';
import { Lucaus, Betty, Life, Photos, Videos, Web, Tech, Main } from '@myPages/home/pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route caseSensitive path="home" element={<Home />}>
        <Route caseSensitive path="" element={<Main />} />
        <Route caseSensitive path="Lucaus" element={<Lucaus />} />
        <Route caseSensitive path="Betty" element={<Betty />} />
        <Route caseSensitive path="tech" element={<Tech />} />
        <Route caseSensitive path="life" element={<Life />} />
        <Route caseSensitive path="photos" element={<Photos />} />
        <Route caseSensitive path="videos" element={<Videos />} />
        <Route caseSensitive path="web" element={<Web />} />
      </Route>
      <Route caseSensitive path="article/:id" element={<Article />} />
    </Route>
  )
);
