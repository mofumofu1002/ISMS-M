import React, { useState } from 'react';
import { 
  ClipboardDocumentCheckIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
// 一時的に型定義をインラインで定義
enum AuditStatus {
  PLANNED = '計画中',
  SCHEDULED = 'スケジュール済',
  IN_PROGRESS = '実施中',
  COMPLETED = '完了',
  REPORT_CREATED = '報告書作成済',
  REPORTED = '報告済',
  CLOSED = '終了'
}

enum AuditType {
  REGULAR = '定期監査',
  SPECIAL = '特別監査',
  FOLLOW_UP = 'フォローアップ監査'
}

enum AuditScope {
  FULL = '全範囲',
  PARTIAL = '部分的',
  SYSTEM = 'システム',
  PROCESS = 'プロセス'
}

enum ITControlCategory {
  ACCESS_CONTROL = 'アクセス制御',
  CHANGE_MANAGEMENT = '変更管理',
  INCIDENT_MANAGEMENT = 'インシデント管理',
  BUSINESS_CONTINUITY = '事業継続',
  SECURITY_AWARENESS = 'セキュリティ意識向上',
  RISK_MANAGEMENT = 'リスク管理',
  BACKUP_RECOVERY = 'バックアップと復元',
  SECURITY_MONITORING = 'セキュリティ監視'
}

// モックデータ
const mockAudits = [
  {
    id: 'audit-001',
    title: '2025年度第1四半期内部監査',
    type: AuditType.REGULAR,
    scope: AuditScope.FULL,
    targetDepartments: ['開発部', '営業部', '管理部'],
    auditPeriod: {
      startDate: '2025-04-10',
      endDate: '2025-04-20',
    },
    status: AuditStatus.PLANNED,
    leadAuditor: 'user-001',
    leadAuditorName: '鈴木 一郎',
    findingsCount: 0,
  },
  {
    id: 'audit-002',
    title: 'クラウドインフラ特別監査',
    type: AuditType.SPECIAL,
    scope: AuditScope.SYSTEM,
    targetDepartments: ['開発部', 'インフラ部'],
    auditPeriod: {
      startDate: '2025-05-15',
      endDate: '2025-05-20',
    },
    status: AuditStatus.SCHEDULED,
    leadAuditor: 'user-002',
    leadAuditorName: '佐藤 次郎',
    findingsCount: 0,
  },
  {
    id: 'audit-003',
    title: '2024年度第4四半期内部監査',
    type: AuditType.REGULAR,
    scope: AuditScope.FULL,
    targetDepartments: ['開発部', '営業部', '管理部', 'インフラ部'],
    auditPeriod: {
      startDate: '2025-01-10',
      endDate: '2025-01-20',
    },
    status: AuditStatus.COMPLETED,
    leadAuditor: 'user-001',
    leadAuditorName: '鈴木 一郎',
    findingsCount: 8,
  },
  {
    id: 'audit-004',
    title: 'アクセス制御監査',
    type: AuditType.SPECIAL,
    scope: AuditScope.PROCESS,
    targetDepartments: ['全部門'],
    auditPeriod: {
      startDate: '2025-02-05',
      endDate: '2025-02-10',
    },
    status: AuditStatus.REPORTED,
    leadAuditor: 'user-003',
    leadAuditorName: '田中 三郎',
    findingsCount: 5,
  },
  {
    id: 'audit-005',
    title: '2024年度第3四半期内部監査',
    type: AuditType.REGULAR,
    scope: AuditScope.FULL,
    targetDepartments: ['開発部', '営業部', '管理部'],
    auditPeriod: {
      startDate: '2024-10-10',
      endDate: '2024-10-20',
    },
    status: AuditStatus.CLOSED,
    leadAuditor: 'user-001',
    leadAuditorName: '鈴木 一郎',
    findingsCount: 6,
  },
];

// モックチェックリストデータ
const mockChecklistItems = [
  {
    id: 'check-001',
    question: 'アクセス権限の定期レビューが実施されているか',
    category: ITControlCategory.ACCESS_CONTROL,
    expectedEvidence: 'アクセス権限レビュー記録',
  },
  {
    id: 'check-002',
    question: 'システム変更時の承認プロセスが実施されているか',
    category: ITControlCategory.CHANGE_MANAGEMENT,
    expectedEvidence: '変更管理記録、承認メール',
  },
  {
    id: 'check-003',
    question: 'インシデント対応手順が文書化され、テストされているか',
    category: ITControlCategory.INCIDENT_MANAGEMENT,
    expectedEvidence: 'インシデント対応手順書、訓練記録',
  },
  {
    id: 'check-004',
    question: 'バックアップが定期的に実施され、復元テストが行われているか',
    category: ITControlCategory.BACKUP_RECOVERY,
    expectedEvidence: 'バックアップログ、復元テスト記録',
  },
  {
    id: 'check-005',
    question: 'セキュリティ監視が24時間体制で実施されているか',
    category: ITControlCategory.SECURITY_MONITORING,
    expectedEvidence: '監視ログ、アラート設定',
  },
];

const AuditManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('audits');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // フィルタリングされた監査リスト
  const filteredAudits = mockAudits.filter(audit => {
    const matchesSearch = audit.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || audit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ステータスに応じたバッジの色を取得
  const getStatusBadgeColor = (status: AuditStatus) => {
    switch (status) {
      case AuditStatus.PLANNED:
        return 'bg-gray-100 text-gray-800';
      case AuditStatus.SCHEDULED:
        return 'bg-blue-100 text-blue-800';
      case AuditStatus.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-800';
      case AuditStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case AuditStatus.REPORTED:
        return 'bg-purple-100 text-purple-800';
      case AuditStatus.CLOSED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">内部監査管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            内部監査の計画、実施、フォローアップを管理します
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            新規監査
          </button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            className={`${
              selectedTab === 'audits'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setSelectedTab('audits')}
          >
            監査一覧
          </button>
          <button
            className={`${
              selectedTab === 'checklists'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setSelectedTab('checklists')}
          >
            チェックリスト
          </button>
          <button
            className={`${
              selectedTab === 'findings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setSelectedTab('findings')}
          >
            指摘事項
          </button>
          <button
            className={`${
              selectedTab === 'schedule'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setSelectedTab('schedule')}
          >
            年間スケジュール
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
            placeholder="監査タイトルで検索..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">すべてのステータス</option>
              {Object.values(AuditStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
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

      {/* 監査一覧 */}
      {selectedTab === 'audits' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredAudits.map((audit) => (
              <li key={audit.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-500 mr-3" />
                      <p className="text-sm font-medium text-blue-600 truncate">{audit.title}</p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(audit.status)}`}>
                        {audit.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        監査種別: {audit.type}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        監査範囲: {audit.scope}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        期間: {new Date(audit.auditPeriod.startDate).toLocaleDateString('ja-JP')} 〜 {new Date(audit.auditPeriod.endDate).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        監査リーダー: {audit.leadAuditorName}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        対象部門: {audit.targetDepartments.join(', ')}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        指摘事項: {audit.findingsCount}件
                      </p>
                      <button
                        type="button"
                        className="ml-4 text-blue-600 hover:text-blue-900"
                      >
                        詳細
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

      {/* チェックリスト */}
      {selectedTab === 'checklists' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">監査チェックリスト</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">IT統制観点でのチェック項目一覧</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              チェック項目追加
            </button>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    チェック項目
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    カテゴリ
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    期待されるエビデンス
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">編集</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockChecklistItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.question}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.expectedEvidence}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900">
                        編集
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 指摘事項タブ */}
      {selectedTab === 'findings' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">指摘事項・是正措置</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">内部監査で特定された指摘事項と是正措置の進捗状況</p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <ClipboardDocumentCheckIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">指摘事項はありません</h3>
              <p className="mt-1 text-sm text-gray-500">監査を実施して指摘事項を登録してください。</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                  指摘事項を登録
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* スケジュールタブ */}
      {selectedTab === 'schedule' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">年間監査スケジュール</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">2025年度の監査計画</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['4-6月', '7-9月', '10-12月', '1-3月'].map((quarter, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">{quarter}</h4>
                  <ul className="space-y-3">
                    {index === 0 && (
                      <>
                        <li className="bg-blue-50 p-2 rounded text-sm">
                          <div className="font-medium">2025年度第1四半期内部監査</div>
                          <div className="text-gray-500 mt-1">4/10 - 4/20</div>
                        </li>
                        <li className="bg-blue-50 p-2 rounded text-sm">
                          <div className="font-medium">クラウドインフラ特別監査</div>
                          <div className="text-gray-500 mt-1">5/15 - 5/20</div>
                        </li>
                      </>
                    )}
                    {index === 1 && (
                      <li className="bg-blue-50 p-2 rounded text-sm">
                        <div className="font-medium">2025年度第2四半期内部監査</div>
                        <div className="text-gray-500 mt-1">7/10 - 7/20</div>
                      </li>
                    )}
                    {index === 2 && (
                      <li className="bg-blue-50 p-2 rounded text-sm">
                        <div className="font-medium">2025年度第3四半期内部監査</div>
                        <div className="text-gray-500 mt-1">10/10 - 10/20</div>
                      </li>
                    )}
                    {index === 3 && (
                      <li className="bg-blue-50 p-2 rounded text-sm">
                        <div className="font-medium">2025年度第4四半期内部監査</div>
                        <div className="text-gray-500 mt-1">1/10 - 1/20</div>
                      </li>
                    )}
                    <li className="border border-dashed border-gray-300 p-2 rounded text-sm text-gray-400 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-center">
                        <PlusIcon className="h-5 w-5 mr-1" />
                        <span>監査を追加</span>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditManagement;
