export interface MusicInfoType {
  id: number;
  img: string;
  cover?: {
    imageBuffer: {
      data: ArrayBuffer;
    };
  };
  duration: string;
  lyric: {
    text: string;
  }[];
  title: string;
}
