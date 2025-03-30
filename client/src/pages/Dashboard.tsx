import React, { useState } from 'react';
import { 
  HomeIcon, 
  ServerIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  ClipboardDocumentCheckIcon,
  DocumentCheckIcon,
  ArrowPathIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  // 表示期間の状態
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'quarter'>('month');
  
  // 最終更新日時
  const lastUpdated = new Date().toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* ヘッダー */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-800">ダッシュボード</h1>
            <div className="flex items-center space-x-4">
              {/* 期間選択 */}
              <div className="flex bg-blue-100 rounded-lg">
                <button
                  onClick={() => setPeriod('day')}
                  className={`px-3 py-1 text-sm rounded-l-lg ${
                    period === 'day' ? 'bg-blue-600 text-white' : 'text-blue-800'
                  }`}
                >
                  今日
                </button>
                <button
                  onClick={() => setPeriod('week')}
                  className={`px-3 py-1 text-sm ${
                    period === 'week' ? 'bg-blue-600 text-white' : 'text-blue-800'
                  }`}
                >
                  今週
                </button>
                <button
                  onClick={() => setPeriod('month')}
                  className={`px-3 py-1 text-sm ${
                    period === 'month' ? 'bg-blue-600 text-white' : 'text-blue-800'
                  }`}
                >
                  今月
                </button>
                <button
                  onClick={() => setPeriod('quarter')}
                  className={`px-3 py-1 text-sm rounded-r-lg ${
                    period === 'quarter' ? 'bg-blue-600 text-white' : 'text-blue-800'
                  }`}
                >
                  四半期
                </button>
              </div>
              {/* 更新ボタン */}
              <button className="p-1 rounded-full text-blue-600 hover:bg-blue-100">
                <ArrowPathIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">最終更新: {lastUpdated}</p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* サマリーカードセクション */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* リスク管理カード */}
          <div className="bg-white shadow rounded-lg p-5 border-l-4 border-blue-600">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">未対応リスク</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <ExclamationTriangleIcon className="h-10 w-10 text-blue-600" />
            </div>
            <div className="mt-4">
              <a href="/risks" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                詳細を見る →
              </a>
            </div>
          </div>

          {/* インシデント管理カード */}
          <div className="bg-white shadow rounded-lg p-5 border-l-4 border-orange-500">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">対応中インシデント</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <ShieldExclamationIcon className="h-10 w-10 text-orange-500" />
            </div>
            <div className="mt-4">
              <a href="/incidents" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                詳細を見る →
              </a>
            </div>
          </div>

          {/* 内部監査カード */}
          <div className="bg-white shadow rounded-lg p-5 border-l-4 border-blue-600">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">実施中監査</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <ClipboardDocumentCheckIcon className="h-10 w-10 text-blue-600" />
            </div>
            <div className="mt-4">
              <a href="/audits" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                詳細を見る →
              </a>
            </div>
          </div>

          {/* セキュリティチェックシートカード */}
          <div className="bg-white shadow rounded-lg p-5 border-l-4 border-blue-600">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">提出待ちチェックシート</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <DocumentCheckIcon className="h-10 w-10 text-blue-600" />
            </div>
            <div className="mt-4">
              <a href="/checklists" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                詳細を見る →
              </a>
            </div>
          </div>
        </div>

        {/* 追加情報カードセクション */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
          {/* 情報資産カード */}
          <div className="bg-white shadow rounded-lg p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">情報資産登録数</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <ServerIcon className="h-10 w-10 text-blue-600" />
            </div>
            <div className="mt-4">
              <a href="/assets" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                詳細を見る →
              </a>
            </div>
          </div>

          {/* 教育・訓練カード */}
          <div className="bg-white shadow rounded-lg p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">教育・訓練状況</p>
                <p className="text-2xl font-bold text-gray-900">未受講: 5名</p>
              </div>
              <AcademicCapIcon className="h-10 w-10 text-blue-600" />
            </div>
            <div className="mt-4">
              <a href="/trainings" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                詳細を見る →
              </a>
            </div>
          </div>

          {/* 文書管理カード */}
          <div className="bg-white shadow rounded-lg p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">文書管理</p>
                <p className="text-2xl font-bold text-gray-900">レビュー待ち: 3件</p>
              </div>
              <DocumentTextIcon className="h-10 w-10 text-blue-600" />
            </div>
            <div className="mt-4">
              <a href="/documents" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                詳細を見る →
              </a>
            </div>
          </div>

          {/* マネジメントレビューカード */}
          <div className="bg-white shadow rounded-lg p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">マネジメントレビュー</p>
                <p className="text-2xl font-bold text-gray-900">次回: 4/15</p>
              </div>
              <ChatBubbleLeftRightIcon className="h-10 w-10 text-blue-600" />
            </div>
            <div className="mt-4">
              <a href="/reviews" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                詳細を見る →
              </a>
            </div>
          </div>
        </div>

        {/* 重要タスクセクション */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">重要タスク</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              <li>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">第2四半期内部監査の実施</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          期限: 4/10
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <ClipboardDocumentCheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          内部監査
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">セキュリティチェックシートの回収</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          期限切れ
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <DocumentCheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          セキュリティチェックシート
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">リスク対応計画の更新</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          期限: 4/20
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <ExclamationTriangleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          リスクアセスメント
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );



  


  // 最近のアクティビティデータ
  const recentActivities = [
    { id: 1, type: 'リスク', title: '新規リスク「サーバー脆弱性」が登録されました', date: '2025/03/29' },
    { id: 2, type: 'インシデント', title: 'インシデント「不審メール受信」が報告されました', date: '2025/03/28' },
    { id: 3, type: '監査', title: '内部監査「Q1定期監査」が完了しました', date: '2025/03/27' },
    { id: 4, type: 'チェックシート', title: '取引先Aのセキュリティチェックシートが提出されました', date: '2025/03/26' },
    { id: 5, type: '教育', title: '「セキュリティ意識向上研修」が追加されました', date: '2025/03/25' },
  ];

  // 期限切れ・近いタスクデータ
  const upcomingTasks = [
    { id: 1, title: 'リスク対応「クラウドセキュリティ強化」', dueDate: '2025/04/05', status: '対応中' },
    { id: 2, title: '内部監査「開発部門」', dueDate: '2025/04/10', status: '計画中' },
    { id: 3, title: 'セキュリティチェックシート「取引先B」提出', dueDate: '2025/04/15', status: '作成中' },
    { id: 4, title: 'インシデント対応訓練', dueDate: '2025/04/20', status: 'スケジュール済' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-sm text-gray-500">最終更新: {lastUpdated}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setPeriod('day')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                period === 'day' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-200`}
            >
              今日
            </button>
            <button
              type="button"
              onClick={() => setPeriod('week')}
              className={`px-4 py-2 text-sm font-medium ${
                period === 'week' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-gray-200`}
            >
              今週
            </button>
            <button
              type="button"
              onClick={() => setPeriod('month')}
              className={`px-4 py-2 text-sm font-medium ${
                period === 'month' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-gray-200`}
            >
              今月
            </button>
            <button
              type="button"
              onClick={() => setPeriod('quarter')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                period === 'quarter' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-200`}
            >
              四半期
            </button>
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={() => window.location.reload()}
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* リスクカード */}
        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-red-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">未対応リスク</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">12件</div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-red-600 font-medium mr-2">高: 5</span>
                      <span className="text-xs text-orange-500 font-medium mr-2">中: 4</span>
                      <span className="text-xs text-green-600 font-medium">低: 3</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/risks" className="font-medium text-blue-600 hover:text-blue-500">詳細を見る</a>
            </div>
          </div>
        </div>

        {/* インシデントカード */}
        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-orange-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                <ShieldExclamationIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">進行中インシデント</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">3件</div>
                    <div className="flex items-center mt-1">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-orange-100 text-orange-800">初動対応中: 2</span>
                      <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">分析中: 1</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/incidents" className="font-medium text-blue-600 hover:text-blue-500">詳細を見る</a>
            </div>
          </div>
        </div>

        {/* 監査カード */}
        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">実施中監査</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">2件</div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-600">次回予定: 4/15 開発部門</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/audits" className="font-medium text-blue-600 hover:text-blue-500">詳細を見る</a>
            </div>
          </div>
        </div>

        {/* チェックシートカード */}
        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <DocumentCheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">提出待ちチェックシート</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">5件</div>
                    <div className="flex items-center mt-1">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">期限近い: 2</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/checksheets" className="font-medium text-blue-600 hover:text-blue-500">詳細を見る</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* 追加サマリーカード */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* 情報資産カード */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gray-100 rounded-md p-3">
                <ServerIcon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">情報資産登録数</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">156件</div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-600">重要度高: 45件</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/assets" className="font-medium text-blue-600 hover:text-blue-500">詳細を見る</a>
            </div>
          </div>
        </div>

        {/* 教育・訓練カード */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <AcademicCapIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">教育・訓練状況</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">3コース実施中</div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-red-600">未受講者: 12名</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/training" className="font-medium text-blue-600 hover:text-blue-500">詳細を見る</a>
            </div>
          </div>
        </div>

        {/* 文書管理カード */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <DocumentTextIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">文書管理</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">42文書</div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-orange-600">レビュー待ち: 3件</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/documents" className="font-medium text-blue-600 hover:text-blue-500">詳細を見る</a>
            </div>
          </div>
        </div>

        {/* マネジメントレビューカード */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">マネジメントレビュー</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">次回: 5/20</div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-blue-600">準備中議題: 5件</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/reviews" className="font-medium text-blue-600 hover:text-blue-500">詳細を見る</a>
            </div>
          </div>
        </div>
      </div>

      {/* グラフセクション */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* リスクレベル分布 */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">リスクレベル分布</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                全体: 55件
              </span>
            </div>
            <div className="mt-4 h-64 flex items-center justify-center">
              <div className="w-64 h-64">
<div className="text-center text-gray-500">
                  リスクレベル分布グラフ
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/risks" className="font-medium text-blue-600 hover:text-blue-500">リスクアセスメントを見る</a>
            </div>
          </div>
        </div>

        {/* 監査進捗状況 */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">監査進捗状況</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                年間計画: 23件
              </span>
            </div>
            <div className="mt-4 h-64">
              <div className="text-center text-gray-500">
                監査進捗状況グラフ
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/audits" className="font-medium text-blue-600 hover:text-blue-500">監査計画を見る</a>
            </div>
          </div>
        </div>
        
        {/* セキュリティチェックシート提出状況 */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">チェックシート提出状況</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                全体: 28件
              </span>
            </div>
            <div className="mt-4 h-64 flex items-center justify-center">
              <div className="w-64 h-64">
<div className="text-center text-gray-500">
                  チェックシート提出状況グラフ
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/checksheets" className="font-medium text-blue-600 hover:text-blue-500">チェックシートを見る</a>
            </div>
          </div>
        </div>
      </div>

      {/* 最近のアクティビティと期限切れタスク */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">最近のアクティビティ</h3>
            <div className="mt-4 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {activity.type === 'リスク' && <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />}
                        {activity.type === 'インシデント' && <ShieldExclamationIcon className="h-6 w-6 text-orange-500" />}
                        {activity.type === '監査' && <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-500" />}
                        {activity.type === 'チェックシート' && <DocumentCheckIcon className="h-6 w-6 text-green-500" />}
                        {activity.type === '教育' && <CalendarIcon className="h-6 w-6 text-purple-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">すべてのアクティビティを見る</a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">期限切れ・期限近いタスク</h3>
            <div className="mt-4 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {upcomingTasks.map((task) => (
                  <li key={task.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-500 mr-2">期限: {task.dueDate}</p>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">すべてのタスクを見る</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
