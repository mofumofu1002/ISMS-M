/**
 * 文書管理の型定義
 */

export enum DocumentType {
  POLICY = '方針',
  PROCEDURE = '手順書',
  STANDARD = '標準',
  GUIDELINE = 'ガイドライン',
  FORM = '様式',
  RECORD = '記録',
  PLAN = '計画書',
  REPORT = '報告書',
  MANUAL = 'マニュアル',
  OTHER = 'その他',
}

export enum DocumentStatus {
  DRAFT = 'ドラフト',
  REVIEW = 'レビュー中',
  APPROVED = '承認済',
  PUBLISHED = '公開中',
  OBSOLETE = '廃止',
  ARCHIVED = 'アーカイブ',
}

export interface DocumentVersion {
  versionNumber: string;
  createdBy: string; // ユーザーID
  createdAt: string;
  filePath: string;
  changeDescription: string;
  approvedBy?: string; // ユーザーID
  approvedAt?: string;
  status: DocumentStatus;
}

export interface DocumentReview {
  id: string;
  reviewerId: string;
  requestedAt: string;
  completedAt?: string;
  status: 'pending' | 'approved' | 'rejected' | 'changes-requested';
  comments?: string;
}

export interface Document {
  id: string;
  title: string;
  documentNumber: string;
  type: DocumentType;
  description: string;
  owner: string; // ユーザーID
  department: string;
  tags: string[];
  accessLevel: 'public' | 'internal' | 'restricted' | 'confidential';
  authorizedRoles: string[];
  authorizedUsers: string[];
  versions: DocumentVersion[];
  currentVersion: string;
  reviews: DocumentReview[];
  relatedDocuments: string[]; // 関連文書ID
  nextReviewDate?: string;
  createdAt: string;
  updatedAt: string;
}
