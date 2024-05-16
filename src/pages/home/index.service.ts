import { ProjectList } from './type';
import { ReactSetState } from '@myTypes/index';
import fetchData from '@myUtils/fetchData';

class HomeService {
  private readonly baseUrl = '//localhost:3000/v1/projets';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  async getProjectList(setState: ReactSetState<ProjectList[] | null>) {
    const projectListData = await fetchData<ProjectList[]>(this.baseUrl + '/all', {
      method: 'GET',
      headers: this.headers
    });
    if (projectListData.message === 'success') {
      setState(projectListData.data);
    } else {
      console.error('获取项目列表失败', projectListData.data);
    }
  }

  async setProjectList(projectList: ProjectList, setState: ReactSetState<ProjectList[] | null>) {
    const projectListData = await fetchData<ProjectList>(this.baseUrl + '/add', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(projectList)
    });
    if (projectListData.message === 'success') {
      console.log('添加项目成功', projectListData.data);
      this.getProjectList(setState);
    } else {
      console.error('添加项目失败', projectListData.data);
    }
  }
}

export default new HomeService();
