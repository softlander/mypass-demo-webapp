FROM node:14-alpine

ENV APP_HOME=/app
ENV PORT=4000

WORKDIR $APP_HOME

COPY package.json $APP_HOME
COPY yarn.lock $APP_HOME

RUN yarn
RUN yarn global add nodemon

COPY . .

EXPOSE $PORT

CMD ["yarn", "start"]
