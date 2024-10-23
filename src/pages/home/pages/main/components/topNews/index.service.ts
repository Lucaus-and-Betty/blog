import fetchData from '@myUtils/fetchData';
import { News } from './type';

/**
 * @description 首页服务层
 */
class MainService {
  private readonly newsBaseUrl = '//localhost:3000/v1/news';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  /**
   * @description 获取所有新闻
   * @return {Promise<{ success: true; data: News } | { success: false; data: null }>} 返回新闻列表和是否成功
   */
  async getAllNews(): Promise<{ success: true; data: News } | { success: false; data: null }> {
    const newsData = await fetchData<News>(this.newsBaseUrl + '/all', {
      method: 'GET',
      headers: this.headers
    });
    if (newsData.message === 'success') {
      return {
        success: true,
        data: newsData.data
      };
    } else {
      console.error('获取新闻列表失败', newsData.data);
      return {
        success: false,
        data: null
      };
    }
  }
}

export default new MainService();
