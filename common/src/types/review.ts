/**
 * マネジメントレビューの型定義
 */

export enum ReviewStatus {
  PLANNED = '計画中',
  IN_PROGRESS = '実施中',
  COMPLETED = '完了',
  FOLLOW_UP = 'フォローアップ中',
  CLOSED = '終了',
}

export enum ReviewDecisionType {
  IMPROVEMENT = '改善事項',
  RESOURCE_ALLOCATION = '資源配分',
  POLICY_CHANGE = '方針変更',
  PROCESS_CHANGE = 'プロセス変更',
  RISK_ACCEPTANCE = 'リスク受容',
  OTHER = 'その他',
}

export interface ReviewAgendaItem {
  id: string;
  title: string;
  description: string;
  presenter: string; // ユーザーID
  documents: string[]; // 文書ID
  duration: number; // 分単位
  order: number;
}

export interface ReviewDecision {
  id: string;
  type: ReviewDecisionType;
  description: string;
  responsiblePerson: string; // ユーザーID
  dueDate: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  completedDate?: string;
  verifiedBy?: string; // ユーザーID
  verifiedDate?: string;
  comments: {
    id: string;
    userId: string;
    content: string;
    timestamp: string;
  }[];
}

export interface ReviewAttendee {
  userId: string;
  role: 'chair' | 'secretary' | 'member' | 'guest';
  required: boolean;
  attended: boolean;
}

export interface Review {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: ReviewStatus;
  agenda: ReviewAgendaItem[];
  attendees: ReviewAttendee[];
  inputDocuments: {
    id: string;
    title: string;
    documentId: string;
    description: string;
  }[];
  minutes: string;
  decisions: ReviewDecision[];
  attachments: string[]; // 添付ファイルのパス
  createdBy: string; // ユーザーID
  createdAt: string;
  updatedAt: string;
  nextReviewDate?: string;
}
