import fetchData from '@myUtils/fetchData';
import { LoveListItemType } from './type';
import { SERVER_URL } from '@myConstants/server';
import tip from '@myUtils/tip';

/**
 * @description 小说服务层
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
      console.log(123, loveListData);
      return {
        success: true,
        data: loveListData.data
      };
    } else {
      tip.addmessage('error', '获取恋爱清单列表失败');
      console.error('获取恋爱清单列表失败', loveListData.data);
      return {
        success: false,
        data: null
      };
    }
  }
}

export default new LoveService();
