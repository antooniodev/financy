FROM node:20-alpine

# WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production=false

COPY . .

RUN yarn build

CMD ["sh", "-c", "sleep 5 && npx drizzle-kit push && node dist/config/db/seed.js && yarn start"]
