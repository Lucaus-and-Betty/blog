import fetchData from '@myUtils/fetchData';
import { NovelInfo } from './type';
import { SERVER_URL } from '@myConstants/server';
import tip from '@myUtils/tip';

/**
 * @description 小说服务层
 */
class MainService {
  private readonly novelsBaseUrl = SERVER_URL + '/novels';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  async getAllNovelsByAuthor(
    author: string
  ): Promise<{ success: true; data: NovelInfo[] } | { success: false; data: null }> {
    const novelsData = await fetchData<NovelInfo[]>(this.novelsBaseUrl + '/get-all-novels-by-author', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        author
      })
    });
    if (novelsData.message === 'success') {
      return {
        success: true,
        data: novelsData.data
      };
    } else {
      tip.addmessage('error', '获取小说列表失败');
      console.error('获取小说列表失败', novelsData.data);
      return {
        success: false,
        data: null
      };
    }
  }
}

export default new MainService();
