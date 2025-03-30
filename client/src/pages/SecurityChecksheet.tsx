import React, { useState } from 'react';
import { 
  DocumentCheckIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  EllipsisHorizontalIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
// 一時的に型定義をインラインで定義
enum ChecksheetStatus {
  DRAFT = '下書き',
  PUBLISHED = '公開中',
  SUBMITTED = '提出済み',
  OVERDUE = '期限切れ',
  REVIEWED = 'レビュー済み',
  ARCHIVED = 'アーカイブ'
}

enum ChecksheetFormat {
  EXCEL = 'Excel',
  PDF = 'PDF',
  ONLINE = 'オンラインフォーム',
  WEB_FORM = 'Webフォーム'
}

// モックデータ
const mockChecksheets = [
  {
    id: 'check-001',
    title: '取引先向けセキュリティチェックシート（標準）',
    description: '取引先に提出する標準的なセキュリティ対策状況確認用チェックシート',
    format: ChecksheetFormat.EXCEL,
    category: '取引先提出用',
    tags: ['標準', '取引先'],
    currentVersion: '1.2',
    submissionCount: 8,
    createdBy: 'user-001',
    createdByName: '鈴木 一郎',
    createdAt: '2024-12-15',
    updatedAt: '2025-02-20',
  },
  {
    id: 'check-002',
    title: '金融機関向けセキュリティチェックシート',
    description: '金融機関取引先向けの強化されたセキュリティチェックシート',
    format: ChecksheetFormat.EXCEL,
    category: '取引先提出用',
    tags: ['金融', '強化版'],
    currentVersion: '2.0',
    submissionCount: 3,
    createdBy: 'user-002',
    createdByName: '佐藤 次郎',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-10',
  },
  {
    id: 'check-003',
    title: 'クラウドサービス利用状況チェックシート',
    description: '社内で利用しているクラウドサービスのセキュリティ状況確認用',
    format: ChecksheetFormat.WEB_FORM,
    category: '社内利用',
    tags: ['クラウド', '内部'],
    currentVersion: '1.0',
    submissionCount: 5,
    createdBy: 'user-001',
    createdByName: '鈴木 一郎',
    createdAt: '2025-02-05',
    updatedAt: '2025-02-05',
  },
  {
    id: 'check-004',
    title: 'テレワークセキュリティチェックシート',
    description: '在宅勤務時のセキュリティ対策状況確認用',
    format: ChecksheetFormat.WEB_FORM,
    category: '社内利用',
    tags: ['テレワーク', '内部'],
    currentVersion: '1.1',
    submissionCount: 42,
    createdBy: 'user-003',
    createdByName: '田中 三郎',
    createdAt: '2024-11-20',
    updatedAt: '2025-01-15',
  },
];

// モック提出履歴データ
const mockSubmissions = [
  {
    id: 'sub-001',
    checksheetId: 'check-001',
    checksheetTitle: '取引先向けセキュリティチェックシート（標準）',
    versionNumber: '1.2',
    submittedTo: '株式会社ABC商事',
    submittedBy: 'user-002',
    submittedByName: '佐藤 次郎',
    submittedAt: '2025-03-15',
    status: 'submitted',
    responseRate: '100%',
  },
  {
    id: 'sub-002',
    checksheetId: 'check-001',
    checksheetTitle: '取引先向けセキュリティチェックシート（標準）',
    versionNumber: '1.1',
    submittedTo: '株式会社ABC商事',
    submittedBy: 'user-002',
    submittedByName: '佐藤 次郎',
    submittedAt: '2024-09-10',
    status: 'accepted',
    responseRate: '100%',
  },
  {
    id: 'sub-003',
    checksheetId: 'check-002',
    checksheetTitle: '金融機関向けセキュリティチェックシート',
    versionNumber: '2.0',
    submittedTo: 'XYZ銀行',
    submittedBy: 'user-001',
    submittedByName: '鈴木 一郎',
    submittedAt: '2025-02-20',
    status: 'accepted',
    responseRate: '100%',
  },
  {
    id: 'sub-004',
    checksheetId: 'check-001',
    checksheetTitle: '取引先向けセキュリティチェックシート（標準）',
    versionNumber: '1.2',
    submittedTo: 'DEF株式会社',
    submittedBy: 'user-003',
    submittedByName: '田中 三郎',
    submittedAt: '2025-03-01',
    status: 'revision-requested',
    responseRate: '95%',
  },
  {
    id: 'sub-005',
    checksheetId: 'check-001',
    checksheetTitle: '取引先向けセキュリティチェックシート（標準）',
    versionNumber: '1.2',
    submittedTo: 'GHIシステムズ',
    submittedBy: 'user-002',
    submittedByName: '佐藤 次郎',
    submittedAt: '2025-03-25',
    status: 'draft',
    responseRate: '80%',
  },
];

const SecurityChecksheet: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // フィルタリングされたチェックシートリスト
  const filteredChecksheets = mockChecksheets.filter(checksheet => {
    const matchesSearch = checksheet.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || checksheet.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // 提出状況に応じたバッジの色を取得
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'revision-requested':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 提出状況の日本語表示
  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft':
        return 'ドラフト';
      case 'submitted':
        return '提出済';
      case 'accepted':
        return '受理済';
      case 'rejected':
        return '却下';
      case 'revision-requested':
        return '修正依頼';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">セキュリティチェックシート管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            セキュリティチェックシートのテンプレート管理と提出履歴を管理します
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            新規テンプレート
          </button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            className={`${
              selectedTab === 'templates'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setSelectedTab('templates')}
          >
            テンプレート
          </button>
          <button
            className={`${
              selectedTab === 'submissions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setSelectedTab('submissions')}
          >
            提出履歴
          </button>
          <button
            className={`${
              selectedTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setSelectedTab('analytics')}
          >
            分析・レポート
          </button>
        </nav>
      </div>

      {/* 検索・フィルターセクション */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="チェックシート名で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sm:w-64">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">すべてのカテゴリ</option>
              <option value="取引先提出用">取引先提出用</option>
              <option value="社内利用">社内利用</option>
            </select>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
          更新
        </button>
      </div>

      {/* テンプレートタブ */}
      {selectedTab === 'templates' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredChecksheets.map((checksheet) => (
              <li key={checksheet.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DocumentCheckIcon className="h-6 w-6 text-green-500 mr-3" />
                      <p className="text-sm font-medium text-blue-600 truncate">{checksheet.title}</p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        v{checksheet.currentVersion}
                      </span>
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {checksheet.format}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        カテゴリ: {checksheet.category}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        タグ: {checksheet.tags.join(', ')}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        作成: {new Date(checksheet.createdAt).toLocaleDateString('ja-JP')} / 更新: {new Date(checksheet.updatedAt).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        作成者: {checksheet.createdByName}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        提出数: {checksheet.submissionCount}件
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm sm:mt-0">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        ダウンロード
                      </button>
                      <button
                        type="button"
                        className="ml-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        編集
                      </button>
                      <button
                        type="button"
                        className="ml-2 text-gray-400 hover:text-gray-500"
                      >
                        <EllipsisHorizontalIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 提出履歴タブ */}
      {selectedTab === 'submissions' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">提出履歴</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">取引先などへの提出履歴と状況</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowUpTrayIcon className="-ml-1 mr-2 h-5 w-5" />
              新規提出
            </button>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    提出先
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    チェックシート
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    バージョン
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    提出日
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    提出者
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状況
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">詳細</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockSubmissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission.submittedTo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {submission.checksheetTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      v{submission.versionNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.submittedAt).toLocaleDateString('ja-JP')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.submittedByName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(submission.status)}`}>
                        {getStatusText(submission.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 分析・レポートタブ */}
      {selectedTab === 'analytics' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">分析・レポート</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">セキュリティチェックシートの回答傾向分析</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">提出状況サマリー</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">提出総数</span>
                    <span className="text-lg font-medium">15件</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">受理済</span>
                    <span className="text-lg font-medium text-green-600">10件</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">提出済（審査中）</span>
                    <span className="text-lg font-medium text-blue-600">3件</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">修正依頼</span>
                    <span className="text-lg font-medium text-yellow-600">2件</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">ドラフト</span>
                    <span className="text-lg font-medium text-gray-600">1件</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">提出先分布</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">株式会社ABC商事</span>
                    <span className="text-lg font-medium">3件</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">XYZ銀行</span>
                    <span className="text-lg font-medium">2件</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">DEF株式会社</span>
                    <span className="text-lg font-medium">1件</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">GHIシステムズ</span>
                    <span className="text-lg font-medium">1件</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">その他</span>
                    <span className="text-lg font-medium">8件</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 md:col-span-2">
                <h4 className="text-lg font-medium text-gray-900 mb-4">回答傾向分析</h4>
                <p className="text-sm text-gray-500 mb-6">
                  最も「いいえ」回答が多い質問トップ5（全チェックシート集計）
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-800">クラウドサービス利用時の多要素認証を導入していますか？</span>
                      <span className="text-sm font-medium text-red-600">68%が「いいえ」</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-800">定期的な第三者によるペネトレーションテストを実施していますか？</span>
                      <span className="text-sm font-medium text-red-600">62%が「いいえ」</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-800">情報セキュリティインシデント対応訓練を年1回以上実施していますか？</span>
                      <span className="text-sm font-medium text-red-600">55%が「いいえ」</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-800">特権アカウントの操作ログを取得・監視していますか？</span>
                      <span className="text-sm font-medium text-red-600">51%が「いいえ」</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '51%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-800">サプライチェーンリスク評価を定期的に実施していますか？</span>
                      <span className="text-sm font-medium text-red-600">47%が「いいえ」</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '47%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityChecksheet;
