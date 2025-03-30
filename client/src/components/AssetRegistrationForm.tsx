import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CustomField {
  id: string;
  name: string;
  value: string;
}

interface AssetRegistrationFormProps {
  onSubmit?: (formData: any) => void;
  onCancel?: () => void;
}

const AssetRegistrationForm: React.FC<AssetRegistrationFormProps> = ({ onSubmit, onCancel }) => {
  const [assetName, setAssetName] = useState('');
  const [assetId, setAssetId] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [owner, setOwner] = useState('');
  const [manager, setManager] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      assetName,
      assetId,
      category,
      location,
      owner,
      manager,
      acquisitionDate,
      expiryDate,
      notes,
      customFields,
    };
    if (onSubmit) onSubmit(formData);
    resetForm();
  };

  const resetForm = () => {
    setAssetName('');
    setAssetId('');
    setCategory('');
    setLocation('');
    setOwner('');
    setManager('');
    setAcquisitionDate('');
    setExpiryDate('');
    setNotes('');
    setCustomFields([]);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { id: `field-${Date.now()}`, name: '', value: '' }]);
  };

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter((f) => f.id !== id));
  };

  const updateCustomField = (id: string, key: 'name' | 'value', value: string) => {
    setCustomFields(
      customFields.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  };

  const inputStyle =
    'block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3';

  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">情報資産登録</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="assetName" className="block text-base font-medium text-gray-700 mb-1">
                      資産名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="assetName"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                      required
                      placeholder="例）開発用ノートPC"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="assetId" className="block text-base font-medium text-gray-700 mb-1">
                      管理番号
                    </label>
                    <input
                      type="text"
                      id="assetId"
                      value={assetId}
                      onChange={(e) => setAssetId(e.target.value)}
                      placeholder="例）A-00123"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-base font-medium text-gray-700 mb-1">
                      区分
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={inputStyle}
                    >
                      <option value="">選択してください</option>
                      <option value="hardware">ハードウェア</option>
                      <option value="software">ソフトウェア</option>
                      <option value="data">データ</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="location" className="block text-base font-medium text-gray-700 mb-1">
                      保管場所
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="例）クラウド / 社内サーバールーム"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="owner" className="block text-base font-medium text-gray-700 mb-1">
                      所有者（責任者）
                    </label>
                    <input
                      type="text"
                      id="owner"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      placeholder="例）山田 太郎"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="manager" className="block text-base font-medium text-gray-700 mb-1">
                      管理者（担当）
                    </label>
                    <input
                      type="text"
                      id="manager"
                      value={manager}
                      onChange={(e) => setManager(e.target.value)}
                      placeholder="例）佐藤 花子"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="acquisitionDate" className="block text-base font-medium text-gray-700 mb-1">
                      取得日
                    </label>
                    <input
                      type="date"
                      id="acquisitionDate"
                      value={acquisitionDate}
                      onChange={(e) => setAcquisitionDate(e.target.value)}
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="expiryDate" className="block text-base font-medium text-gray-700 mb-1">
                      有効期限
                    </label>
                    <input
                      type="date"
                      id="expiryDate"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className={inputStyle}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="notes" className="block text-base font-medium text-gray-700 mb-1">
                      備考
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="特記事項など"
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium text-gray-700">カスタム項目</h3>
                  <button
                    type="button"
                    onClick={addCustomField}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" /> 追加
                  </button>
                </div>

                {customFields.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">カスタム項目を追加できます</p>
                ) : (
                  <div className="space-y-3">
                    {customFields.map((field) => (
                      <div key={field.id} className="flex space-x-2">
                        <input
                          type="text"
                          value={field.name}
                          onChange={(e) => updateCustomField(field.id, 'name', e.target.value)}
                          placeholder="項目名"
                          className={inputStyle}
                        />
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => updateCustomField(field.id, 'value', e.target.value)}
                          placeholder="値"
                          className={inputStyle}
                        />
                        <button
                          type="button"
                          onClick={() => removeCustomField(field.id)}
                          className="inline-flex items-center p-2 border border-transparent rounded-full text-red-600 hover:bg-red-100"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => (onCancel ? onCancel() : resetForm())}
                  className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  登録
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetRegistrationForm;
