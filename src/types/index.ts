export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type themeType = 'system' | 'light' | 'dark';

export interface ArticleInfoType {
  id: string;
  title: string;
  des: string;
  publishTime: string;
  labels: {
    id: string;
    title: string;
  }[];
  cover: string;
}

export enum FetchStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
  LOADING = 'loading'
}
