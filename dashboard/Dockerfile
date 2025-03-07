FROM node:20

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "start" ]