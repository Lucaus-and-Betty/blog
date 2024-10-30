export interface ArticleInfoType {
  id: string;
  title: string;
  labels: {
    id: string;
    title: string;
  }[];
  publishTime: string;
  updateTime: string;
  readCount: number;
  content: string;
}
