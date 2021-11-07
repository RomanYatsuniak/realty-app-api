FROM node:14.16.0-alpine
WORKDIR /app
ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install
ADD . /app
CMD ["npm", "start"]
