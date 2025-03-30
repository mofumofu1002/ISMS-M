import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, signOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
// AWS Amplify v6ではタイプ定義が変更されています
type AuthUser = {
  username: string;
  userId: string;
  signInDetails?: {
    loginId?: string;
  };
};

// 認証コンテキストの型定義
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  signIn: (username: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  refreshUser: () => Promise<void>;
}

// デフォルト値
// デフォルト値
const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  signIn: async () => ({}),
  signOut: async () => ({}),
  refreshUser: async () => {}
};

// コンテキストの作成
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// コンテキストを使用するためのカスタムフック
export const useAuth = () => useContext(AuthContext);

// プロバイダーコンポーネント
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  // 現在のユーザー情報を取得する関数
  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // ログイン関数
  const handleSignIn = async (username: string, password: string) => {
    try {
      // Amplify v6のsignIn関数を使用
      const result = await signIn({ username, password });
      await refreshUser();
      return { success: true, user: result };
    } catch (error) {
      console.error('ログインエラー:', error);
      return { success: false, error };
    }
  };

  // ログアウト関数
  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error('ログアウトエラー:', error);
      return { success: false, error };
    }
  };

  // 認証状態の変更を監視
  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        await refreshUser();
      } catch (error) {
        console.error('ユーザー情報取得エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Amplify v6では認証イベントのリッスン方法が変更されています
    // ここでは単純に初期ロード時にユーザー情報を取得します
    checkUser();
  }, []);

  // コンテキスト値
  const value = {
    isAuthenticated,
    isLoading,
    user,
    signIn: handleSignIn,
    signOut: handleSignOut,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
