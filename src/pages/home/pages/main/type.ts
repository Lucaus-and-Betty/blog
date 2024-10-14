export interface NewsItem {
  id: string;
  title: string;
  description: string;
}

export type News = NewsItem[];

export interface ArticleKindType {
  id: string;
  name: string;
}