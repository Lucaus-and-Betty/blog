export interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string | null;
}

export type News = NewsItem[];
