import { Biotech, Store, Favorite, Info, Man, Woman } from '@mui/icons-material';
import { NavigationItem } from './type';

export const NavigationList: NavigationItem[] = [
  {
    title: 'Articles',
    key: 'articles',
    chidren: [
      {
        title: 'TECH',
        path: '/home/tech',
        key: 'tech',
        icon: Biotech
      },
      {
        title: 'Life',
        path: '/home/life',
        key: 'life',
        icon: Store
      }
    ]
  },
  {
    title: 'Our',
    key: 'our',
    chidren: [
      {
        title: 'Love',
        path: '/home/love',
        key: 'love',
        icon: Favorite
      }
    ]
  },
  {
    title: 'About',
    key: 'about',
    chidren: [
      {
        title: 'Lucaus',
        path: '/home/Lucaus',
        key: 'Lucaus',
        icon: Man
      },
      {
        title: 'Betty',
        path: '/home/Betty',
        key: 'Betty',
        icon: Woman
      },
      {
        title: 'Website',
        path: '/home/web',
        key: 'web',
        icon: Info
      }
    ]
  }
];
