import { ProjectList } from './type';
import fetchData from '@myUtils/fetchData';

class HomeService {
  private readonly baseUrl = '//localhost:3000/v1/projets';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

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
      // TODO: 后续用全局提示方式展示
      console.error('获取项目列表失败', projectListData.data);
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
      // TODO: 后续用全局提示方式展示
      console.log('添加项目成功', projectListData.data);
    } else {
      // TODO: 后续用全局提示方式展示
      console.error('添加项目失败', projectListData.data);
    }
  }
}

export default new HomeService();
