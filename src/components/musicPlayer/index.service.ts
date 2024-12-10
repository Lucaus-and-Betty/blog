import fetchData from '@myUtils/fetchData';
import { SERVER_URL } from '@myConstants/server';
import { MusicInfoType } from './type';

class MusicService {
  private readonly baseUrl = SERVER_URL + '/musics';
  private readonly headers = {
    'Content-Type': 'application/json'
  };
  async getMusicList(): Promise<
    | {
        success: true;
        data: {
          mp3s: string[];
          count: number;
        };
      }
    | { success: false; data: null }
  > {
    const musicList = await fetchData<{
      mp3s: string[];
      count: number;
    }>(this.baseUrl + '/get-all-musics', {
      method: 'GET',
      headers: this.headers
    });
    if (musicList.message === 'success') {
      return {
        success: true,
        data: musicList.data
      };
    } else {
      return {
        success: false,
        data: null
      };
    }
  }

  async getMusicInfo(name: string): Promise<{ success: true; data: MusicInfoType } | { success: false; data: null }> {
    const musicInfo = await fetchData<MusicInfoType>(this.baseUrl + '/get-music-info', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name
      })
    });
    if (musicInfo.message === 'success') {
      return {
        success: true,
        data: musicInfo.data
      };
    } else {
      return {
        success: false,
        data: null
      };
    }
  }

  getMusicStream = async (name: string) => {
    const musicStream = await fetch(this.baseUrl + '/get-music-stream', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name
      })
    });
    if (musicStream.ok && musicStream.body) {
      return musicStream.body.getReader(); // 获取读取器
    }
  };
}

export default new MusicService();
