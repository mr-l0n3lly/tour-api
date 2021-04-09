FROM node

WORKDIR /app

COPY . .

RUN npm install
RUN node ./dataTemp/import-data.js --import

ENTRYPOINT [ "node", "server.js" ]
