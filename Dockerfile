FROM node:12

ARG environment=dev

WORKDIR /app
COPY package*.json ./

RUN npm install --environment=${environment}

COPY . .
