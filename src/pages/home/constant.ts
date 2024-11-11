import { MenuBook, Favorite, Info, Man, Woman } from '@mui/icons-material';
import { NavigationItem } from './type';

export const NavigationList: NavigationItem[] = [
  {
    title: 'Novel',
    key: 'novel',
    chidren: [
      {
        title: 'Stark',
        path: '/home/novel/Stark',
        key: 'Stark',
        icon: MenuBook
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
