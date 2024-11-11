import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.tsx';
import { Lucaus, Betty, Life, Love, Web, Novel, Article, Error, Main, Diary } from './routerLazyLoad.ts';
import { Home } from '@myPages/home/index';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route caseSensitive path="home" element={<Home />}>
        <Route caseSensitive path="" element={<Main />} />
        <Route caseSensitive path="Lucaus" element={<Lucaus />} />
        <Route caseSensitive path="Betty" element={<Betty />} />
        <Route caseSensitive path="novel/:author" element={<Novel />} />
        <Route caseSensitive path="life" element={<Life />} />
        <Route caseSensitive path="love" element={<Love />} />
        <Route caseSensitive path="web" element={<Web />} />
      </Route>
      <Route caseSensitive path="article/:id" element={<Article />} />
      <Route caseSensitive path="diary" element={<Diary />} />
    </Route>
  )
);
