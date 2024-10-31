import fetchData from '@myUtils/fetchData';
import { ArticleInfoType } from '@myTypes/index';
import { SERVER_URL } from '@myConstants/server';
import { ArticleKindType } from './type';

/**
 * @description 首页服务层
 */
class MainService {
  private readonly articlesBaseUrl = SERVER_URL + '/articles';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  private readonly labelsBaseUrl = SERVER_URL + '/labels';

  async getAllArticles(
    page: number,
    pageSize: number = 30
  ): Promise<
    { success: true; isOver: boolean; data: ArticleInfoType[] } | { success: false; isOver: true; data: null }
  > {
    const articleData = await fetchData<{ isOver: boolean; data: ArticleInfoType[] }>(
      this.articlesBaseUrl + '/get-page-article-info',
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          page,
          pageSize
        })
      }
    );
    if (articleData.message === 'success') {
      return {
        success: true,
        data: articleData.data.data,
        isOver: articleData.data.isOver
      };
    } else {
      console.error('获取文章列表失败', articleData.data);
      return {
        success: false,
        data: null,
        isOver: true
      };
    }
  }

  async getAllArticlesByLabel(
    labelId: string,
    page: number
  ): Promise<
    { success: true; isOver: boolean; data: ArticleInfoType[] } | { success: false; isOver: true; data: null }
  > {
    const articleData = await fetchData<{ isOver: boolean; data: ArticleInfoType[] }>(
      this.articlesBaseUrl + '/get-page-article-info-by-label',
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ labelId, page })
      }
    );
    if (articleData.message === 'success') {
      return {
        success: true,
        data: articleData.data.data,
        isOver: articleData.data.isOver
      };
    } else {
      console.error('获取文章列表失败', articleData.data);
      return {
        success: false,
        isOver: true,
        data: null
      };
    }
  }

  async getAllLabels(): Promise<{ success: true; data: ArticleKindType[] } | { success: false; data: null }> {
    const labelsData = await fetchData<ArticleKindType[]>(this.labelsBaseUrl + '/get-all-labels', {
      method: 'GET'
    });
    if (labelsData.message === 'success') {
      return {
        success: true,
        data: labelsData.data
      };
    } else {
      console.error('获取标签列表失败', labelsData.data);
      return {
        success: false,
        data: null
      };
    }
  }
}

export default new MainService();
