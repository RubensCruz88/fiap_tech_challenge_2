FROM 'node:22-alpine'

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_NAME
ARG DB_SSL
ARG JWT_SECRET

ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
ENV DB_SSL=$DB_SSL
ENV JWT_SECRET=$JWT_SECRET

RUN echo "DB_HOST=${DB_HOST}" > .env
RUN echo "DB_PORT=${DB_PORT}" > .env
RUN echo "DB_USERNAME=${DB_USERNAME}" > .env
RUN echo "DB_PASSWORD=${DB_PASSWORD}" > .env
RUN echo "DB_NAME=${DB_NAME}" > .env
RUN echo "DB_SSL=${DB_SSL}" > .env
RUN echo "JWT_SECRET=${JWT_SECRET}" > .env

RUN npm run build

EXPOSE 3000

CMD npm run migration:run && node dist/main.js
