# ベースイメージの選択
FROM node:20

# 作業ディレクトリの設定
WORKDIR /usr/src/app

# 依存関係のインストール
# package.json と package-lock.json をコピー
COPY package*.json ./
RUN npm install
COPY . .
# アプリケーションのコードをコピー


# アプリケーションの起動コマンド
# CMD ["npm", "start"]