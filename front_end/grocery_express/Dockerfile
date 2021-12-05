From node:12-alpine

RUN mkdir /build
WORKDIR /build

COPY . /build
RUN cd /build

EXPOSE 3000

RUN npm install
RUN npm run build 
CMD ["sh", "-c", "npm start"]