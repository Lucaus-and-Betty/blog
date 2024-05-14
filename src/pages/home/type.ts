interface NavigationItem {
  title: string;
  key: string;
  chidren: NavigationItemChild[];
}

interface NavigationItemChild {
  title: string;
  path: string;
  key: string;
}

export const NavigationList: NavigationItem[] = [
  {
    title: '文章',
    key: 'articles',
    chidren: [
      {
        title: '技术',
        path: 'tech',
        key: 'tech'
      },
      {
        title: '生活',
        path: 'life',
        key: 'life'
      }
    ]
  },
  {
    title: '我们的',
    key: 'our',
    chidren: [
      {
        title: '相册',
        path: 'photos',
        key: 'photos'
      },
      {
        title: '视频',
        path: 'videos',
        key: 'videos'
      }
    ]
  },
  {
    title: '关于',
    key: 'about',
    chidren: [
      {
        title: 'Lucuas',
        path: 'Lucaus',
        key: 'Lucaus'
      },
      {
        title: 'Betty',
        path: 'Betty',
        key: 'Betty'
      },
      {
        title: '本站',
        path: 'web',
        key: 'web'
      }
    ]
  }
];

interface ProjectList {
  title: string;
  personalList: PersonalList[];
}

interface PersonalList {
  id: number;
  title: string;
  link: string;
}

// mock data
export const projectList: ProjectList[] = [
  {
    title: "Lucaus's project",
    personalList: [
      {
        id: 1,
        title: "Lucuas's project123123123123",
        link: 'www.baidu.com'
      },
      {
        id: 2,
        title: "Lucuas's project",
        link: 'www.baidu.com'
      }
    ]
  },
  {
    title: "Betty's project",
    personalList: [
      {
        id: 3,
        title: "Betty's project",
        link: 'www.baidu.com'
      },
      {
        id: 4,
        title: "Betty's project",
        link: 'www.baidu.com'
      }
    ]
  },
  {
    title: 'Our project',
    personalList: [
      {
        id: 5,
        title: 'Our project',
        link: 'www.baidu.com'
      },
      {
        id: 6,
        title: 'Our project',
        link: 'www.baidu.com'
      }
    ]
  }
];

export interface SearchHistory {
  id: number;
  content: string;
}
