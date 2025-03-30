// AWS Amplify設定ファイル
// 注意: 実際の環境では、AWS Amplify CLIを使用して自動生成されます
// このファイルは開発用のサンプルです

const awsmobile = {
    "aws_project_region": "ap-northeast-1",
    "aws_cognito_identity_pool_id": "ap-northeast-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "aws_cognito_region": "ap-northeast-1",
    "aws_user_pools_id": "ap-northeast-1_XXXXXXXXX",
    "aws_user_pools_web_client_id": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
    "oauth": {},
    "aws_appsync_graphqlEndpoint": "https://xxxxxxxxxxxxxxxxxxxxxxxxxx.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    "aws_appsync_region": "ap-northeast-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_cloud_logic_custom": [
        {
            "name": "ismsApi",
            "endpoint": "https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev",
            "region": "ap-northeast-1"
        }
    ],
    "aws_user_files_s3_bucket": "isms-m-storage-dev",
    "aws_user_files_s3_bucket_region": "ap-northeast-1"
};

export default awsmobile;
