/**
 * セキュリティチェックシート管理の型定義（重点機能）
 */

export enum ChecksheetStatus {
  DRAFT = 'ドラフト',
  REVIEW = 'レビュー中',
  APPROVED = '承認済',
  SUBMITTED = '提出済',
  ARCHIVED = 'アーカイブ',
}

export enum ChecksheetFormat {
  EXCEL = 'Excel',
  WEB_FORM = 'Webフォーム',
  PDF = 'PDF',
  WORD = 'Word',
  OTHER = 'その他',
}

export enum QuestionType {
  YES_NO = 'はい/いいえ',
  MULTIPLE_CHOICE = '選択式',
  TEXT = 'テキスト',
  DATE = '日付',
  FILE_UPLOAD = 'ファイルアップロード',
  RATING = '評価',
}

export interface ChecksheetQuestion {
  id: string;
  section: string;
  number: string;
  question: string;
  description?: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
  evidenceRequired: boolean;
  notes?: string;
}

export interface ChecksheetAnswer {
  questionId: string;
  answer: string | string[];
  evidenceFiles?: string[]; // 添付ファイルのパス
  notes?: string;
  answeredBy: string; // ユーザーID
  answeredAt: string;
  updatedBy?: string; // ユーザーID
  updatedAt?: string;
}

export interface ChecksheetVersion {
  versionNumber: string;
  createdBy: string; // ユーザーID
  createdAt: string;
  description: string;
  questions: ChecksheetQuestion[];
  status: ChecksheetStatus;
  approvedBy?: string; // ユーザーID
  approvedAt?: string;
}

export interface ChecksheetSubmission {
  id: string;
  checksheetId: string;
  versionNumber: string;
  submittedTo: string; // 提出先組織名
  submittedBy: string; // ユーザーID
  submittedAt: string;
  dueDate?: string;
  status: 'draft' | 'submitted' | 'accepted' | 'rejected' | 'revision-requested';
  answers: ChecksheetAnswer[];
  attachments: string[]; // 添付ファイルのパス
  comments: {
    id: string;
    userId: string;
    content: string;
    timestamp: string;
  }[];
  reviewedBy?: string; // ユーザーID
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface SecurityChecksheet {
  id: string;
  title: string;
  description: string;
  format: ChecksheetFormat;
  category: string;
  tags: string[];
  versions: ChecksheetVersion[];
  currentVersion: string;
  submissions: ChecksheetSubmission[];
  templateFile?: string; // テンプレートファイルのパス（Excel等）
  createdBy: string; // ユーザーID
  createdAt: string;
  updatedAt: string;
  expiryDate?: string;
  reminderSettings?: {
    enabled: boolean;
    daysBeforeDue: number[];
    message: string;
  };
}
