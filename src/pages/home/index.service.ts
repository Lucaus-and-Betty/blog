import { ProjectList } from './type';
import tip from '@myUtils/tip';
import fetchData from '@myUtils/fetchData';

/**
 * @description 首页服务层
 */
class HomeService {
  private readonly baseUrl = '//localhost:3000/v1/projets';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  /**
   * @description 获取项目列表
   * @returns {Promise<{ success: true; data: ProjectList[] } | { success: false; data: null }>} 返回项目列表和是否成功
   */
  async getProjectList() {
    const projectListData = await fetchData<ProjectList[]>(this.baseUrl + '/all', {
      method: 'GET',
      headers: this.headers
    });
    if (projectListData.message === 'success') {
      return {
        success: true,
        data: projectListData.data
      };
    } else {
      tip.addmessage('error', '获取项目列表失败');
      return {
        success: false,
        data: null
      };
    }
  }

  async setProjectList(projectList: ProjectList) {
    const projectListData = await fetchData<ProjectList>(this.baseUrl + '/add', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(projectList)
    });
    if (projectListData.message === 'success') {
      tip.addmessage('success', '添加项目成功');
    } else {
      tip.addmessage('error', '添加项目失败');
    }
  }
}

export default new HomeService();
