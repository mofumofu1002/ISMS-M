/**
 * 情報資産管理の型定義
 */

export enum AssetType {
  INFORMATION = '情報',
  HARDWARE = 'ハードウェア',
  SOFTWARE = 'ソフトウェア',
  SERVICE = 'サービス',
  HUMAN = '人的資産',
  FACILITY = '施設・設備',
  INTANGIBLE = '無形資産',
}

export enum ConfidentialityLevel {
  PUBLIC = '公開',
  INTERNAL = '社内',
  CONFIDENTIAL = '機密',
  HIGHLY_CONFIDENTIAL = '極秘',
}

export enum IntegrityLevel {
  LOW = '低',
  MEDIUM = '中',
  HIGH = '高',
}

export enum AvailabilityLevel {
  LOW = '低',
  MEDIUM = '中',
  HIGH = '高',
}

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  description: string;
  owner: string; // ユーザーID
  department: string;
  location: string;
  confidentiality: ConfidentialityLevel;
  integrity: IntegrityLevel;
  availability: AvailabilityLevel;
  createdAt: string;
  updatedAt: string;
  relatedRiskIds: string[]; // 関連リスクのID
  tags: string[];
  notes?: string;
}
