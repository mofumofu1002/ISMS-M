import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';

// Amplifyの初期化
export const configureAmplify = () => {
  Amplify.configure(awsExports);
};

// 必要に応じて追加の設定や関数をここに追加
