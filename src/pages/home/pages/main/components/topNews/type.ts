export interface NewsItem {
  id: string;
  title: string;
  des: string;
  link: string | null;
  time: string;
}

export type News = NewsItem[];
