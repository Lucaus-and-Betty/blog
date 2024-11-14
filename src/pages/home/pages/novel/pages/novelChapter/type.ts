export interface NovelHistoryType {
  novelId: string;
  chapterId: string;
}

export interface NovelChapterType {
  id: string;
  time: string;
  content: string;
  order: number;
  novelId: string;
  previousId: string;
  name: string;
}

export interface chapterListItemType {
  id: string;
  name: string;
  order: number;
}
