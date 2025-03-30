import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AssetManagement from './pages/AssetManagement';
import RiskAssessment from './pages/RiskAssessment';
import IncidentManagement from './pages/IncidentManagement';
import AuditManagement from './pages/AuditManagement';
import TrainingManagement from './pages/TrainingManagement';
import DocumentManagement from './pages/DocumentManagement';
import ManagementReview from './pages/ManagementReview';
import SecurityChecksheet from './pages/SecurityChecksheet';
import UserManagement from './pages/UserManagement';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// 認証が必要なルートのラッパーコンポーネント（一時的に認証チェックをバイパス）
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 開発中は認証チェックをバイパス
  return <>{children}</>;
  
  /* 本来の実装（後で戻す）
  const { isAuthenticated, isLoading } = useAuth();

  // 認証状態の読み込み中
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 未認証の場合はログインページにリダイレクト
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 認証済みの場合は子コンポーネントを表示
  return <>{children}</>;
  */
};

// メインアプリケーションコンポーネント
const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="assets" element={<AssetManagement />} />
        <Route path="risks" element={<RiskAssessment />} />
        <Route path="incidents" element={<IncidentManagement />} />
        <Route path="audits" element={<AuditManagement />} />
        <Route path="training" element={<TrainingManagement />} />
        <Route path="documents" element={<DocumentManagement />} />
        <Route path="reviews" element={<ManagementReview />} />
        <Route path="checksheets" element={<SecurityChecksheet />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

// 認証プロバイダーでラップしたアプリケーション
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
