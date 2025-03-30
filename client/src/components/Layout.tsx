import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ServerIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  DocumentCheckIcon,
  UsersIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'ダッシュボード', href: '/', icon: HomeIcon },
    { name: '情報資産管理', href: '/assets', icon: ServerIcon },
    { name: 'リスクアセスメント', href: '/risks', icon: ExclamationTriangleIcon },
    { name: 'インシデント管理', href: '/incidents', icon: ShieldExclamationIcon },
    { name: '内部監査管理', href: '/audits', icon: ClipboardDocumentCheckIcon },
    { name: '教育・訓練管理', href: '/training', icon: AcademicCapIcon },
    { name: '文書管理', href: '/documents', icon: DocumentTextIcon },
    { name: 'マネジメントレビュー', href: '/reviews', icon: ChatBubbleLeftRightIcon },
    { name: 'セキュリティチェックシート', href: '/checksheets', icon: DocumentCheckIcon },
    { name: 'ユーザー管理', href: '/users', icon: UsersIcon },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* デスクトップサイドバー */}
      <div className="flex flex-col w-64 fixed inset-y-0 border-r border-gray-200 bg-white">
        <div className="flex items-center h-16 px-4 bg-blue-600">
          <span className="text-xl font-bold text-white">ISMS管理システム</span>
        </div>
        <nav className="flex-1 overflow-y-auto pt-5 pb-4 bg-gray-50">
          <div className="px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    location.pathname === item.href
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-blue-500'
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* メインコンテンツ */}
      <div className="pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex-1 lg:ml-0"></div>
            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <button className="flex text-sm rounded-full focus:outline-none">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  </button>
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">山田 太郎</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <footer className="bg-white py-4 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">© 2025 ISMS管理システム</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;