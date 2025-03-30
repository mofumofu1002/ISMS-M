/**
 * インシデント管理の型定義
 */

export enum IncidentSeverity {
  LOW = '低',
  MEDIUM = '中',
  HIGH = '高',
  CRITICAL = '重大',
}

export enum IncidentStatus {
  REPORTED = '報告受付',
  INITIAL_RESPONSE = '初動対応中',
  INVESTIGATION = '調査中',
  CONTAINMENT = '封じ込め中',
  ERADICATION = '根絶中',
  RECOVERY = '復旧中',
  CLOSED = '完了',
}

export enum IncidentCategory {
  INFORMATION_LEAK = '情報漏洩',
  UNAUTHORIZED_ACCESS = '不正アクセス',
  MALWARE = 'マルウェア',
  DDOS = 'DDoS攻撃',
  PHYSICAL_SECURITY = '物理的セキュリティ侵害',
  HUMAN_ERROR = 'ヒューマンエラー',
  SYSTEM_FAILURE = 'システム障害',
  NATURAL_DISASTER = '自然災害',
  OTHER = 'その他',
}

export interface IncidentComment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  attachments?: string[]; // 添付ファイルのパス
}

export interface IncidentAction {
  id: string;
  description: string;
  assignedTo: string; // ユーザーID
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  completedDate?: string;
  notes?: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  status: IncidentStatus;
  reportedBy: string; // ユーザーID
  reportedDate: string;
  affectedAssets: string[]; // 資産ID
  affectedSystems: string[];
  impactDescription: string;
  detectionMethod: string;
  initialResponseActions: string;
  rootCause?: string;
  lessonLearned?: string;
  preventiveMeasures?: string;
  resolvedDate?: string;
  resolvedBy?: string; // ユーザーID
  comments: IncidentComment[];
  actions: IncidentAction[];
  attachments: string[]; // 添付ファイルのパス
  relatedIncidents?: string[]; // 関連インシデントID
  tags: string[];
}
