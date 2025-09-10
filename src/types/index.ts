import type { IconType } from 'react-icons';

export interface ModuleSidebar {
  name: string;
  icon: IconType;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
}
