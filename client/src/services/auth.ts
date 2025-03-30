import { Amplify } from 'aws-amplify';
import {
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  getCurrentUser as amplifyGetCurrentUser,
  resetPassword,
  confirmResetPassword,
  signUp as amplifySignUp,
  confirmSignUp as amplifyConfirmSignUp,
  updatePassword,
  updateUserAttributes as amplifyUpdateUserAttributes
} from 'aws-amplify/auth';

// ユーザーログイン
export const signIn = async (username: string, password: string) => {
  try {
    const user = await amplifySignIn({ username, password });
    return {
      success: true,
      user
    };
  } catch (error) {
    console.error('ログインエラー:', error);
    return {
      success: false,
      error
    };
  }
};

// ユーザーログアウト
export const signOut = async () => {
  try {
    await amplifySignOut();
    return {
      success: true
    };
  } catch (error) {
    console.error('ログアウトエラー:', error);
    return {
      success: false,
      error
    };
  }
};

// 現在のユーザー情報を取得
export const getCurrentUser = async () => {
  try {
    const user = await amplifyGetCurrentUser();
    return {
      success: true,
      user
    };
  } catch (error) {
    console.error('ユーザー情報取得エラー:', error);
    return {
      success: false,
      error
    };
  }
};

// パスワードリセット要求
export const forgotPassword = async (username: string) => {
  try {
    await resetPassword({ username });
    return {
      success: true
    };
  } catch (error) {
    console.error('パスワードリセット要求エラー:', error);
    return {
      success: false,
      error
    };
  }
};

// パスワードリセット確認
export const forgotPasswordSubmit = async (
  username: string,
  code: string,
  newPassword: string
) => {
  try {
    await confirmResetPassword({ username, confirmationCode: code, newPassword });
    return {
      success: true
    };
  } catch (error) {
    console.error('パスワードリセット確認エラー:', error);
    return {
      success: false,
      error
    };
  }
};

// ユーザー登録（管理者用）
export const signUp = async (
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string,
  department: string
) => {
  try {
    const result = await amplifySignUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
          given_name: firstName,
          family_name: lastName,
          'custom:department': department
        }
      }
    });
    return {
      success: true,
      user: result
    };
  } catch (error) {
    console.error('ユーザー登録エラー:', error);
    return {
      success: false,
      error
    };
  }
};

// ユーザー登録確認
export const confirmSignUp = async (username: string, code: string) => {
  try {
    await amplifyConfirmSignUp({ username, confirmationCode: code });
    return {
      success: true
    };
  } catch (error) {
    console.error('ユーザー登録確認エラー:', error);
    return {
      success: false,
      error
    };
  }
};

// パスワード変更
export const changePassword = async (oldPassword: string, newPassword: string) => {
  try {
    await updatePassword({ oldPassword, newPassword });
    return {
      success: true
    };
  } catch (error) {
    console.error('パスワード変更エラー:', error);
    return {
      success: false,
      error
    };
  }
};

// ユーザー属性の更新
export const updateUserAttributes = async (attributes: Record<string, string>) => {
  try {
    await amplifyUpdateUserAttributes({ userAttributes: attributes });
    return {
      success: true
    };
  } catch (error) {
    console.error('ユーザー属性更新エラー:', error);
    return {
      success: false,
      error
    };
  }
};
