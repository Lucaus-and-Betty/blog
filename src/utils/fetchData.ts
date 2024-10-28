import store from '@myStore/store';
import { hideLoader, errorLoader } from '@myStore/slices/loadingSlice';

async function fetchData<Data>(
  url: string,
  options: RequestInit,
  showLoader?: boolean
): Promise<{ message: 'success'; data: Data } | { message: 'fail'; data: string }>;

async function fetchData(url: string, options: RequestInit, showLoader: boolean = false) {
  // 这里的 try catch 用来捕获请求失败的情况，比如 404、500 等
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    if (showLoader) {
      store.dispatch(hideLoader());
    }
    return data;
  } catch (error) {
    if (showLoader) {
      store.dispatch(errorLoader());
    }
    return {
      message: 'fail',
      data: error
    };
  }
}

export default fetchData;
