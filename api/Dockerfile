FROM node:20.17.0

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx drizzle-kit push

RUN npm run seed

EXPOSE 3333

CMD ["npm", "run", "start"]
