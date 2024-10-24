import { SvgIconComponent } from '@mui/icons-material';

export interface NavigationItem {
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
