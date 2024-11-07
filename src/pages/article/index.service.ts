import { ArticleInfoType } from './type';
import fetchData from '@myUtils/fetchData';
import { SERVER_URL } from '@myConstants/server';
import tip from '@myUtils/tip.ts';

class ArticleService {
  private readonly newsBaseUrl = SERVER_URL + '/articles';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  /**
   * @description 通过文章 id 获取文章详情
   * @param {string} id
   * @return {Promise<{ success: true; data: News } | { success: false; data: null }>} 返回获取的文章和是否成功
   */
  async getArticleContentById(
    id: string
  ): Promise<{ success: true; data: ArticleInfoType } | { success: false; data: null }> {
    const articleData = await fetchData<ArticleInfoType>(this.newsBaseUrl + '/get-article-content-by-id', {
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
      tip.addmessage('error', '获取文章内容失败');
      console.error('获取文章失败', articleData.data);
      return {
        success: false,
        data: null
      };
    }
  }
}

export default new ArticleService();
