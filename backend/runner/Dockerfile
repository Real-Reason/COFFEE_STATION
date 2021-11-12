FROM openjdk:11-jdk AS build
WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
COPY src/main/resources/application.yml src/main/resources/application.yml
COPY src/main/resources/application-API-KEY.properties src/main/resources/application-API-KEY.properties
COPY src/main/resources/firebase/firebase-notification-key.json src/main/resources/firebase/firebase-notification-key.json
RUN cat src/main/resources/firebase/firebase-notification-key.json
RUN cat src/main/resources/application.yml
RUN cat src/main/resources/application-API-KEY.properties
RUN chmod +x gradlew
RUN rm -rf build/generated
RUN ["./gradlew", "clean", "build", "--stacktrace", "--exclude-task", "test"]

FROM openjdk:11-jdk
COPY --from=build /app/build/libs/runner-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT java -jar app.jar
