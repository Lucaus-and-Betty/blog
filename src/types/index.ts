export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type themeType = 'system' | 'light' | 'dark';

export interface ArticleInfoType {
  id: string;
  title: string;
  desc: string;
  time: string;
  label: string[];
  pic: string;
}
