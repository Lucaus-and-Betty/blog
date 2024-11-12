import fetchData from '@myUtils/fetchData';
import { SERVER_URL } from '@myConstants/server';
import { NovelChapterType } from './type';

/**
 * @description 小说服务层
 */
class novelService {
  private readonly novelsBaseUrl = SERVER_URL + '/novels';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  async getNovelContentById(
    id: string
  ): Promise<{ success: true; data: NovelChapterType } | { success: false; data: null }> {
    const novelData = await fetchData<NovelChapterType>(this.novelsBaseUrl + '/get-novel-chapter-by-id', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        id
      })
    });
    if (novelData.message === 'success') {
      return {
        success: true,
        data: novelData.data
      };
    } else {
      return {
        success: false,
        data: null
      };
    }
  }

  async getNovelContentByOrder(
    novelId: string,
    order: number
  ): Promise<{ success: true; data: NovelChapterType } | { success: false; data: null }> {
    const novelData = await fetchData<NovelChapterType>(this.novelsBaseUrl + '/get-novel-chapter-by-order', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        novelId,
        order
      })
    });
    if (novelData.message === 'success') {
      return {
        success: true,
        data: novelData.data
      };
    } else {
      return {
        success: false,
        data: null
      };
    }
  }

  async getNovelChapterIdByPreviousId(
    previousId: string
  ): Promise<{ success: true; data: string } | { success: false; data: null }> {
    const novelData = await fetchData<string>(this.novelsBaseUrl + '/get-novel-chapter-id-by-previous-id', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        previousId
      })
    });
    if (novelData.message === 'success') {
      return {
        success: true,
        data: novelData.data
      };
    } else {
      return {
        success: false,
        data: null
      };
    }
  }
}

export default new novelService();
