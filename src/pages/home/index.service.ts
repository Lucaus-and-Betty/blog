import { ProjectList } from './type';
import fetchData from '@myUtils/fetchData';
import { SERVER_URL } from '@myConstants/server';

/**
 * @description 首页服务层
 */
class HomeService {
  private readonly baseUrl = SERVER_URL + '/projets';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  /**
   * @description 获取项目列表
   * @returns {Promise<{ success: true; data: ProjectList[] } | { success: false; data: null }>} 返回项目列表和是否成功
   */
  async getProjectList() {
    const projectListData = await fetchData<ProjectList[]>(this.baseUrl + '/get-all-projects', {
      method: 'GET',
      headers: this.headers
    });
    if (projectListData.message === 'success') {
      return {
        success: true,
        data: projectListData.data
      };
    } else {
      return {
        success: false,
        data: null
      };
    }
  }
}

export default new HomeService();
