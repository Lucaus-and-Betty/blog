import { Biotech, Store, Favorite, Info, Man, Woman } from '@mui/icons-material';
import { NavigationItem } from './type';

export const NavigationList: NavigationItem[] = [
  {
    title: 'Articles',
    key: 'articles',
    chidren: [
      {
        title: 'TECH',
        path: 'tech',
        key: 'tech',
        icon: Biotech
      },
      {
        title: 'Life',
        path: 'life',
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
        path: 'love',
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
        path: 'Lucaus',
        key: 'Lucaus',
        icon: Man
      },
      {
        title: 'Betty',
        path: 'Betty',
        key: 'Betty',
        icon: Woman
      },
      {
        title: 'Website',
        path: 'web',
        key: 'web',
        icon: Info
      }
    ]
  }
];
