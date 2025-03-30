import React from 'react';
import { ServerIcon } from '@heroicons/react/24/outline';

const AssetManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">情報資産管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            情報資産の登録・管理を行います
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center py-10">
            <ServerIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">情報資産が登録されていません</h3>
            <p className="mt-1 text-sm text-gray-500">新しい情報資産を登録してください</p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                情報資産を登録
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetManagement;
