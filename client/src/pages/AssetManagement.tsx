import React, { useState } from 'react';
import { ServerIcon, PlusIcon } from '@heroicons/react/24/outline';
import AssetRegistrationForm from '../components/AssetRegistrationForm';

const AssetManagement: React.FC = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [assets, setAssets] = useState<any[]>([]); // 実際のアプリケーションでは適切な型定義が必要

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">情報資産管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            情報資産の登録・管理を行います
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setShowRegistrationForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            情報資産を登録
          </button>
        </div>
      </div>
      
      {showRegistrationForm ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="p-4 sm:p-6">
            <AssetRegistrationForm 
              onSubmit={(formData) => {
                console.log('受け取ったデータ:', formData);
                // 実際のアプリではここでAPIを呼び出してデータを保存する
                setAssets([...assets, formData]);
                setShowRegistrationForm(false);
              }}
              onCancel={() => setShowRegistrationForm(false)}
            />
          </div>
        </div>
      ) : assets.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* 登録された情報資産の一覧表示 */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">資産名</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">管理番号</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">区分</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">権限</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">取得日</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">有効期限</th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">編集</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assets.map((asset, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.assetName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.assetId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.permission}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.acquisitionDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.expiryDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900">編集</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center py-10">
              <ServerIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">情報資産が登録されていません</h3>
              <p className="mt-1 text-sm text-gray-500">新しい情報資産を登録してください</p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowRegistrationForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  情報資産を登録
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetManagement;
