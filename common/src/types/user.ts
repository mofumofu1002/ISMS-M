/**
 * ユーザー管理の型定義
 */

export enum UserRole {
  ADMIN = '管理者',
  ISMS_OFFICE = 'ISMS事務局',
  DEPARTMENT_MANAGER = '部門責任者',
  AUDITOR = '監査担当者',
  EXECUTIVE = '役員',
  GENERAL_USER = '一般ユーザー',
}

export enum UserStatus {
  ACTIVE = '有効',
  INACTIVE = '無効',
  PENDING = '承認待ち',
  LOCKED = 'ロック',
}

export interface UserPermission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve')[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  roles: UserRole[];
  permissions: UserPermission[];
  status: UserStatus;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  phoneNumber?: string;
  profileImage?: string;
  notificationPreferences: {
    email: boolean;
    inApp: boolean;
    slack?: boolean;
  };
}
