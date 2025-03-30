/**
 * 内部監査管理の型定義（重点機能）
 */

export enum AuditStatus {
  PLANNED = '計画中',
  SCHEDULED = 'スケジュール済',
  IN_PROGRESS = '実施中',
  COMPLETED = '完了',
  REPORTED = '報告書作成済',
  CLOSED = '終了',
}

export enum AuditType {
  REGULAR = '定期監査',
  SPECIAL = '特別監査',
  FOLLOW_UP = 'フォローアップ監査',
}

export enum AuditScope {
  FULL = '全社',
  DEPARTMENT = '部門',
  PROCESS = 'プロセス',
  SYSTEM = 'システム',
}

export enum ITControlCategory {
  ACCESS_CONTROL = 'アクセス制御',
  CHANGE_MANAGEMENT = '変更管理',
  INCIDENT_MANAGEMENT = 'インシデント管理',
  BACKUP_RECOVERY = 'バックアップ・リカバリ',
  SECURITY_MONITORING = 'セキュリティ監視',
  VULNERABILITY_MANAGEMENT = '脆弱性管理',
  CONFIGURATION_MANAGEMENT = '構成管理',
  BUSINESS_CONTINUITY = '事業継続',
  COMPLIANCE = 'コンプライアンス',
  RISK_MANAGEMENT = 'リスク管理',
  VENDOR_MANAGEMENT = 'ベンダー管理',
  OTHER = 'その他',
}

export enum FindingSeverity {
  CRITICAL = '重大',
  MAJOR = '重要',
  MODERATE = '中程度',
  MINOR = '軽微',
  OBSERVATION = '観察事項',
}

export interface AuditChecklistItem {
  id: string;
  question: string;
  category: ITControlCategory;
  expectedEvidence: string;
  result?: 'conformity' | 'non-conformity' | 'observation' | 'not-applicable';
  evidence?: string;
  comments?: string;
  attachments?: string[]; // 添付ファイルのパス
}

export interface AuditFinding {
  id: string;
  title: string;
  description: string;
  category: ITControlCategory;
  severity: FindingSeverity;
  checklistItemId?: string;
  identifiedDate: string;
  responsiblePerson: string; // ユーザーID
  responsibleDepartment: string;
  correctiveAction?: string;
  actionDueDate?: string;
  actionStatus: 'open' | 'in-progress' | 'completed' | 'verified';
  actionCompletedDate?: string;
  verifiedBy?: string; // ユーザーID
  verifiedDate?: string;
  comments: {
    id: string;
    userId: string;
    content: string;
    timestamp: string;
  }[];
  attachments?: string[]; // 添付ファイルのパス
}

export interface Audit {
  id: string;
  title: string;
  type: AuditType;
  scope: AuditScope;
  targetDepartments: string[];
  targetProcesses?: string[];
  targetSystems?: string[];
  auditPeriod: {
    startDate: string;
    endDate: string;
  };
  status: AuditStatus;
  leadAuditor: string; // ユーザーID
  auditTeam: string[]; // ユーザーID配列
  objectives: string;
  criteria: string[];
  checklist: AuditChecklistItem[];
  findings: AuditFinding[];
  conclusion?: string;
  recommendations?: string;
  attachments?: string[]; // 添付ファイルのパス
  createdAt: string;
  updatedAt: string;
  scheduledNotifications: {
    id: string;
    date: string;
    recipients: string[]; // ユーザーID配列
    message: string;
    sent: boolean;
    sentAt?: string;
  }[];
}
