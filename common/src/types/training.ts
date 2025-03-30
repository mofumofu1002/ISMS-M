/**
 * 教育・訓練管理の型定義
 */

export enum TrainingType {
  SECURITY_AWARENESS = 'セキュリティ意識向上',
  POLICY_PROCEDURE = '方針・手順',
  INCIDENT_RESPONSE = 'インシデント対応',
  TECHNICAL_SECURITY = '技術的セキュリティ',
  COMPLIANCE = 'コンプライアンス',
  ROLE_SPECIFIC = '役割別研修',
  NEW_EMPLOYEE = '新入社員研修',
  OTHER = 'その他',
}

export enum TrainingFormat {
  ONLINE = 'オンライン',
  CLASSROOM = '教室',
  WORKSHOP = 'ワークショップ',
  SELF_STUDY = '自己学習',
  SIMULATION = 'シミュレーション',
  MIXED = '複合形式',
}

export enum TrainingStatus {
  PLANNED = '計画中',
  SCHEDULED = 'スケジュール済',
  IN_PROGRESS = '実施中',
  COMPLETED = '完了',
  CANCELLED = 'キャンセル',
}

export interface TrainingMaterial {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'presentation' | 'quiz' | 'other';
  filePath: string;
  version: string;
  uploadedBy: string; // ユーザーID
  uploadedAt: string;
  tags: string[];
}

export interface TrainingQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export interface TrainingQuiz {
  id: string;
  title: string;
  description: string;
  questions: TrainingQuizQuestion[];
  passingScore: number; // パーセンテージ
}

export interface TrainingAttendee {
  userId: string;
  status: 'invited' | 'registered' | 'attended' | 'completed' | 'no-show';
  registrationDate?: string;
  completionDate?: string;
  quizResults?: {
    quizId: string;
    score: number;
    passedStatus: boolean;
    attemptCount: number;
    lastAttemptDate: string;
  }[];
  feedback?: string;
  certificateIssued: boolean;
  certificateIssuedDate?: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  type: TrainingType;
  format: TrainingFormat;
  targetAudience: string[];
  requiredForRoles: string[];
  requiredForDepartments: string[];
  schedule: {
    startDate: string;
    endDate: string;
    sessions?: {
      id: string;
      date: string;
      startTime: string;
      endTime: string;
      location?: string;
      instructor?: string;
    }[];
  };
  status: TrainingStatus;
  materials: TrainingMaterial[];
  quizzes: TrainingQuiz[];
  attendees: TrainingAttendee[];
  reminderSettings: {
    enabled: boolean;
    daysBeforeTraining: number[];
    message: string;
  };
  createdBy: string; // ユーザーID
  createdAt: string;
  updatedAt: string;
  tags: string[];
}
