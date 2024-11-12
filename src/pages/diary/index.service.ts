import fetchData from '@myUtils/fetchData';
import { SERVER_URL } from '@myConstants/server';
import { DiaryInfoType } from './type';

/**
 * @description 首页服务层
 */
class DiaryService {
  private readonly baseUrl = SERVER_URL + '/diaries';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  getDiariesByPage = async (
    page: number,
    pageSize: number = 20
  ): Promise<
    { success: true; data: DiaryInfoType[]; isOver: boolean } | { success: false; data: null; isOver: true }
  > => {
    const res = await fetchData<{ data: DiaryInfoType[]; isOver: boolean }>(this.baseUrl + '/get-page-diaries', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ page, pageSize })
    });
    if (res.message === 'success') {
      return {
        success: true,
        data: res.data.data,
        isOver: res.data.isOver
      };
    } else {
      return {
        success: false,
        data: null,
        isOver: true
      };
    }
  };
}

export default new DiaryService();
