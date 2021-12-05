From maven:3.8.4-jdk-11

RUN mkdir /build
WORKDIR /build

COPY . /build
RUN cd /build

EXPOSE 8080
EXPOSE 3306

RUN mvn compile
RUN mvn package

CMD ./start.sh
