# 1. Build stage: Maven nutzt eigenes Image, um das Jar zu bauen
FROM maven:3.9.7-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# 2. Runtime stage: kleines Java-Image nur fürs Jar
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Spring Boot läuft auf Port 8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]