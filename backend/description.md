# ArchLab

A Dropwizard application integrated with MySQL and Lombok.

## Getting Started

1. Start the MySQL database container:
   \\\ash
   docker compose up -d
   \\\

2. Build and run the application:
   \\\ash
   mvn clean package
   java -jar target/ArchLab-1.0-SNAPSHOT.jar server config.yml
   \\\
