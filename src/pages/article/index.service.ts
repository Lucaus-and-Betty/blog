import { ArticleInfoType } from './type';
import fetchData from '@myUtils/fetchData';

class ArticleService {
  private readonly newsBaseUrl = '//localhost:3000/v1/articles';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  /**
   * @description 获取所有新闻
   * @return {Promise<{ success: true; data: News } | { success: false; data: null }>} 返回新闻列表和是否成功
   */
  async getArticleInfoById(
    id: string
  ): Promise<{ success: true; data: ArticleInfoType } | { success: false; data: null }> {
    const articleData = await fetchData<ArticleInfoType>(this.newsBaseUrl + '/get-article-info-by-id', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ id })
    });
    if (articleData.message === 'success') {
      return {
        success: true,
        data: articleData.data
      };
    } else {
      console.error('获取文章失败', articleData.data);
      return {
        success: false,
        data: null
      };
    }
  }
}

export default new ArticleService();
