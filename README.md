# Coffee SNS - コーヒー愛好者のためのコンパスアプリケーション

## 環境構築

1. リポジトリをクローンする
2. プロジェクトディレクトリへ移動する
3. .env を作成する
   ```shell
   cp .env.example .env
   ```
4. .env の内容を適宜書き換える
5. コンテナを立ち上げる
   ```shell
   docker compose up -d
   ```
6. DB のマイグレーションを実行する
   ```shell
   docker compose exec app npm run migration:deploy
   ```
7. ブラウザでアクセスし表示を確認する
   - [http://localhost](http://localhost)

## テストについて

このプロジェクトでは、テストをテスト対象のファイルと同じディレクトリに `[target-file-name].(s|m|l).test.ts` の形式で作成します。

テストに使用される `s, m, l` のプレフィックスはテストのサイズを表しており、以下のサイズが設定されています:

- `s` (Small): 小規模テスト
- `m` (Medium): 中規模テスト
- `l` (Large): 大規模テスト

各テストサイズの詳細は以下のとおりです:

| Feature              | Small | Medium         | Large |
| -------------------- | ----- | -------------- | ----- |
| Network access       | No    | localhost only | Yes   |
| Database             | No    | Yes            | Yes   |
| File system access   | No    | Yes            | Yes   |
| Use external systems | No    | Discouraged    | Yes   |
| Multiple threads     | No    | Yes            | Yes   |
| Sleep statements     | No    | Yes            | Yes   |
| System properties    | No    | Yes            | Yes   |
| Time limit (seconds) | 60    | 300            | 900+  |
