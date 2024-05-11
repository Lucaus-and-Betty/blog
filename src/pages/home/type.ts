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
