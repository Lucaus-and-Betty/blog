export interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string | null;
}

export type News = NewsItem[];

export interface ArticleKindType {
  id: string;
  name: string;
}