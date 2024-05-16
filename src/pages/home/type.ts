import {
  SvgIconComponent,
  Biotech,
  Store,
  PhotoSizeSelectActual,
  VideoCameraBack,
  Info,
  Man,
  Woman
} from '@mui/icons-material';

interface NavigationItem {
  title: string;
  key: string;
  chidren: NavigationItemChild[];
}

interface NavigationItemChild {
  title: string;
  path: string;
  key: string;
  icon: SvgIconComponent;
}

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
        title: 'Photos',
        path: 'photos',
        key: 'photos',
        icon: PhotoSizeSelectActual
      },
      {
        title: 'Videos',
        path: 'videos',
        key: 'videos',
        icon: VideoCameraBack
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

export interface ProjectList {
  title: string;
  personalList: PersonalList[];
}

interface PersonalList {
  id: number;
  title: string;
  link: string;
}

export interface SearchHistory {
  id: number;
  content: string;
}
