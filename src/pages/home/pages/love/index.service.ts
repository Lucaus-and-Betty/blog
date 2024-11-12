import fetchData from '@myUtils/fetchData';
import { LoveListItemType } from './type';
import { SERVER_URL } from '@myConstants/server';

/**
 * @description 情侣空间服务层
 */
class LoveService {
  private readonly loveBaseUrl = SERVER_URL + '/love';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  async getAllLoveList(): Promise<{ success: true; data: LoveListItemType[] } | { success: false; data: null }> {
    const loveListData = await fetchData<LoveListItemType[]>(this.loveBaseUrl + '/get-all-love-list', {
      method: 'GET',
      headers: this.headers
    });
    if (loveListData.message === 'success') {
      return {
        success: true,
        data: loveListData.data
      };
    } else {
      return {
        success: false,
        data: null
      };
    }
  }
}

export default new LoveService();
