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
    // 3.9 ダッシュボード・通知
    { name: 'ダッシュボード', href: '/', icon: HomeIcon, badge: null },
    
    // 3.1 情報資産の管理
    { 
      name: '情報資産管理', 
      href: '/assets', 
      icon: ServerIcon,
      badge: null,
      description: '情報資産の登録・編集・分類、重要度設定' 
    },
    
    // 3.2 リスクアセスメント管理
    { 
      name: 'リスクアセスメント', 
      href: '/risks', 
      icon: ExclamationTriangleIcon,
      badge: { count: 12, color: 'red' },
      description: 'リスクの評価・対応策管理・可視化' 
    },
    
    // 3.3 インシデント管理
    { 
      name: 'インシデント管理', 
      href: '/incidents', 
      icon: ShieldExclamationIcon,
      badge: { count: 3, color: 'orange' },
      description: 'インシデントの登録・対応管理' 
    },
    
    // 3.4 内部監査管理（★重点）
    { 
      name: '内部監査管理', 
      href: '/audits', 
      icon: ClipboardDocumentCheckIcon,
      badge: { count: 2, color: 'blue' },
      description: '監査計画・チェックリスト・是正措置管理',
      highlight: true 
    },
    
    // 3.5 教育・訓練管理
    { 
      name: '教育・訓練管理', 
      href: '/training', 
      icon: AcademicCapIcon,
      badge: null,
      description: '教材管理・受講記録・テスト管理' 
    },
    
    // 3.6 文書管理
    { 
      name: '文書管理', 
      href: '/documents', 
      icon: DocumentTextIcon,
      badge: null,
      description: 'ISMS文書のバージョン管理・履歴保存' 
    },
    
    // 3.7 マネジメントレビュー
    { 
      name: 'マネジメントレビュー', 
      href: '/reviews', 
      icon: ChatBubbleLeftRightIcon,
      badge: null,
      description: 'レビュー記録・決定事項のトラッキング' 
    },
    
    // 3.8 セキュリティチェックシート管理（★重点）
    { 
      name: 'セキュリティチェックシート', 
      href: '/checksheets', 
      icon: DocumentCheckIcon,
      badge: { count: 5, color: 'green' },
      description: 'チェックシートの管理・提出履歴',
      highlight: true 
    },
    
    // 3.10 ユーザー管理・アクセス制御
    { 
      name: 'ユーザー管理', 
      href: '/users', 
      icon: UsersIcon,
      badge: null,
      description: 'ユーザー・権限管理、SSO連携' 
    },
    
    // 通知設定
    { 
      name: '通知設定', 
      href: '/notifications', 
      icon: BellIcon,
      badge: null,
      description: 'メール・Slack連携、リマインダー設定' 
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* モバイルサイドバー */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-white">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="ISMS管理システム" />
              <span className="ml-2 text-xl font-semibold text-gray-800">ISMS-M</span>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto pt-5 pb-4">
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-gray-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${
                    item.highlight ? 'border-l-4 border-blue-500' : ''
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      location.pathname === item.href ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-4 flex-shrink-0 h-6 w-6`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {item.badge && item.badge.count > 0 && (
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full bg-${item.badge.color}-100 text-${item.badge.color}-800`}>
                          {item.badge.count}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <span className="text-xs text-gray-500 hidden group-hover:block">{item.description}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* デスクトップサイドバー */}
      <div className="flex flex-col w-64 fixed inset-y-0 border-r border-gray-200 bg-white">
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <img className="h-8 w-auto" src="/logo.svg" alt="ISMS管理システム" />
          <span className="ml-2 text-xl font-semibold text-gray-800">ISMS-M</span>
        </div>
        <nav className="flex-1 overflow-y-auto pt-5 pb-4">
          <div className="px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? 'bg-gray-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${
                  item.highlight ? 'border-l-4 border-blue-500' : ''
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    location.pathname === item.href ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 flex-shrink-0 h-5 w-5`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    {item.badge && item.badge.count > 0 && (
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full bg-${item.badge.color}-100 text-${item.badge.color}-800`}>
                        {item.badge.count}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <span className="text-xs text-gray-500 hidden group-hover:block">{item.description}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* メインコンテンツ */}
      <div className="pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-white shadow-sm lg:shadow-none">
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
