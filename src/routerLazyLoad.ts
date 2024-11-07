import { lazy } from 'react';

// 首页下的小页面
export const Main = lazy(() => import('@myPages/home/pages/main/index.tsx'));
export const Lucaus = lazy(() => import('@myPages/home/pages/lucaus/index.tsx'));
export const Betty = lazy(() => import('@myPages/home/pages/betty/index.tsx'));
export const Life = lazy(() => import('@myPages/home/pages/life/index.tsx'));
export const Love = lazy(() => import('@myPages/home/pages/love/index.tsx'));
export const Web = lazy(() => import('@myPages/home/pages/web/index.tsx'));
export const Tech = lazy(() => import('@myPages/home/pages/tech/index.tsx'));

// 大页面
export const Article = lazy(() => import('@myPages/article/index.tsx'));
export const Error = lazy(() => import('@myPages/error/index.tsx'));
export const Diary = lazy(() => import('@myPages/diary/index.tsx'));

// 组件
export const StarsCanvas = lazy(() => import('@myComponents/starsCanvas/index.tsx'));
export const Typewriter = lazy(() => import('@myComponents/typeWriter/index.tsx'));
export const Wave = lazy(() => import('@myComponents/wave/index.tsx'));
export const FullScreenMask = lazy(() => import('@myComponents/fullScreenMask/index.tsx'));
export const Loading = lazy(() => import('@myComponents/loading/index.tsx'));
export const FullScreenLoading = lazy(() => import('@myComponents/fullScreenLoading/index.tsx'));
export const SideBar = lazy(() => import('@myComponents/sideBar/index.tsx'));
export const SearchDialog = lazy(() => import('@myComponents/search/index.tsx'));
export const Space = lazy(() => import('@myComponents/space/index.tsx'));
export const ArticleItem = lazy(() => import('@myComponents/articleItem/index.tsx'));
export const PageOperateBar = lazy(() => import('@myComponents/pageOperateBar/index.tsx'));
