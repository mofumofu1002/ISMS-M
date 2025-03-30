/**
 * リスクアセスメント管理の型定義
 */

export enum RiskImpactLevel {
  NEGLIGIBLE = '軽微',
  MINOR = '小',
  MODERATE = '中',
  MAJOR = '大',
  SEVERE = '甚大',
}

export enum RiskProbabilityLevel {
  RARE = '稀',
  UNLIKELY = '低',
  POSSIBLE = '中',
  LIKELY = '高',
  ALMOST_CERTAIN = '確実',
}

export enum RiskStatus {
  IDENTIFIED = '特定済',
  ASSESSED = '評価済',
  TREATMENT_PLANNED = '対応計画中',
  TREATMENT_IN_PROGRESS = '対応中',
  TREATMENT_COMPLETED = '対応完了',
  ACCEPTED = '受容',
  MONITORED = '監視中',
}

export enum RiskTreatmentType {
  MITIGATE = '低減',
  TRANSFER = '移転',
  AVOID = '回避',
  ACCEPT = '受容',
}

export interface RiskTreatment {
  id: string;
  description: string;
  type: RiskTreatmentType;
  responsiblePerson: string; // ユーザーID
  deadline: string;
  status: string;
  completedDate?: string;
  notes?: string;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  assetIds: string[]; // 関連資産のID
  threatDescription: string;
  vulnerabilityDescription: string;
  impact: RiskImpactLevel;
  probability: RiskProbabilityLevel;
  riskLevel: number; // 計算値（影響度×発生可能性）
  status: RiskStatus;
  identifiedDate: string;
  identifiedBy: string; // ユーザーID
  treatments: RiskTreatment[];
  reviewDate: string;
  reviewBy?: string; // ユーザーID
  history: RiskHistoryEntry[];
  tags: string[];
  notes?: string;
}

export interface RiskHistoryEntry {
  id: string;
  date: string;
  userId: string;
  action: string;
  description: string;
  previousValues?: Partial<Risk>;
  newValues?: Partial<Risk>;
}
