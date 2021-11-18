# 포팅 매뉴얼

## gitlab 소스 클론 이후 빌드 배포

#### Frontend

##### React-Native(0.66)

SDK version

```
Android SDK Platform 29

Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Android SDK Build-Tools 29.0.2
```

Node version

```
node v14.17.1
npm 6.14.13
```

How to run

```
npm install -g react-native-cli
npm install
npx react-native start
npx react-native run-android
```

package.json - customer

```json
  "dependencies": {
    "@babel/preset-env": "^7.16.0",
    "@react-native-async-storage/async-storage": "^1.15.11",
    "@react-native-community/geolocation": "^2.0.2",
    "@react-native-community/viewpager": "^5.0.11",
    "@react-native-firebase/analytics": "^13.0.1",
    "@react-native-firebase/app": "^13.0.1",
    "@react-native-firebase/messaging": "^13.0.1",
    "@react-navigation/bottom-tabs": "^6.0.9",
    "@react-navigation/drawer": "^6.1.8",
    "@react-navigation/material-top-tabs": "^6.0.6",
    "@react-navigation/native": "^6.0.6",
    "@react-navigation/native-stack": "^6.2.5",
    "axios": "^0.24.0",
    "dotenv": "^10.0.0",
    "react": "17.0.2",
    "react-native": "0.66.2",
    "react-native-config": "^1.4.5",
    "react-native-gesture-handler": "^1.10.3",
    "react-native-image-slider-box": "^1.1.10",
    "react-native-nmap": "0.0.66",
    "react-native-pager-view": "^5.4.9",
    "react-native-reanimated": "^2.2.4",
    "react-native-safe-area-context": "^3.3.2",
    "react-native-screens": "^3.9.0",
    "react-native-tab-view": "^3.1.1",
    "react-native-webview": "^11.14.3",
    "rnpm": "^1.9.0",
    "styled-components": "^5.3.3",
    "typescript": "^4.4.4"
  },
```

package.json - partner

```json
  "dependencies": {
    "@actbase/react-daum-postcode": "^1.0.1",
    "@react-native-async-storage/async-storage": "^1.15.11",
    "@react-native-community/datetimepicker": "^3.5.2",
    "@react-native-firebase/analytics": "^13.0.1",
    "@react-native-firebase/app": "^13.0.1",
    "@react-native-firebase/messaging": "^13.0.1",
    "@react-native-picker/picker": "^2.2.0",
    "@react-navigation/drawer": "^6.1.8",
    "@react-navigation/material-top-tabs": "^6.0.6",
    "@react-navigation/native": "^6.0.6",
    "@react-navigation/native-stack": "^6.2.5",
    "axios": "^0.24.0",
    "react": "17.0.2",
    "react-native": "0.66.2",
    "react-native-geocoding": "^0.5.0",
    "react-native-gesture-handler": "^1.10.3",
    "react-native-image-picker": "^4.3.0",
    "react-native-image-slider-box": "^1.1.10",
    "react-native-pager-view": "^5.4.9",
    "react-native-reanimated": "^2.2.4",
    "react-native-safe-area-context": "^3.3.2",
    "react-native-screens": "^3.9.0",
    "react-native-tab-view": "^3.1.1",
    "react-native-webview": "^11.14.2",
    "styled-components": "^5.3.3"
  },
```

.env

```
REACT_APP_BASE_URL=http://3.38.99.110:8080/
```

build.gradle - customer

```
buildscript {
    ext {
        buildToolsVersion = "30.0.2"
        minSdkVersion = 21
        compileSdkVersion = 30
        targetSdkVersion = 30
        ndkVersion = "21.4.7075529"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:4.2.2")
        // firebase
        classpath 'com.google.gms:google-services:4.3.10'
    }
}

allprojects {
    repositories {
        mavenCentral()
        mavenLocal()
        jcenter()
        maven {
            url 'https://naver.jfrog.io/artifactory/maven/'
        }
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url("$rootDir/../node_modules/react-native/android")
        }
        maven {
            // Android JSC is installed from npm
            url("$rootDir/../node_modules/jsc-android/dist")
        }

        google()
        maven { url 'https://www.jitpack.io' }
    }
}
```

build.gradle - partner

```
buildscript {
    ext {
        buildToolsVersion = "30.0.2"
        minSdkVersion = 26
        compileSdkVersion = 30
        targetSdkVersion = 30
        ndkVersion = "21.4.7075529"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:4.2.2")
        // firebase
        classpath 'com.google.gms:google-services:4.3.10'
    }
}

allprojects {
    repositories {
        mavenCentral()
        mavenLocal()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url("$rootDir/../node_modules/react-native/android")
        }
        maven {
            // Android JSC is installed from npm
            url("$rootDir/../node_modules/jsc-android/dist")
        }

        google()
        maven { url 'https://www.jitpack.io' }
    }
}

```

settings.gradle - customer

```
rootProject.name = 'customer'
include ':@react-native-community_viewpager'
project(':@react-native-community_viewpager').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-community/viewpager/android')
include ':react-native-config'
project(':react-native-config').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-config/android')
include ':react-native-webview'
project(':react-native-webview').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-webview/android')
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app'
```

settings.gradle - partner

```
rootProject.name = 'partner'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app'
```



### Backend

#### 설정 파일들

<img src="PortingMenual.assets/image-20211119052021825.png" alt="image-20211119052021825" style="zoom:25%;" />

 ```java
 // firebase-notification-key.json
 {
   "type": "service_account",
   "project_id": "runner-b31dd",
   "private_key_id": "3973feecb0b754c53952f1229487d0c699e6f8ec",
   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDtSPa65T0pfPXt\nYr/Hn6DkepliHriJHf10Sfptk8pb4IrXVh1XYJQUktqbvfDtst81t6WrWaQRlbOu\neCFXr0oTXc7brWoVWd77zZrxStnO8KiQizX1KWmlF1J3tikUW5SJPTpHw1a1PDii\n6z95QwIwjDdSg7Dm7OWummn/vhYsUNeZ/jwaGu37b6Hcbs60BZczTWNptrWMuCFz\nRPTsoscaL+oK9gx7STBol1V04sV24IKlLrt4UbrnIQMXmGhdq1MygyEb/gAWp6DJ\nWHu3oKj0K4MxJ0zieoo+A84fj0ZwGAINtwPR0PcgeIrKItF1CH/IhBL9jyrBTjjN\nHlD0ak49AgMBAAECggEAH8hjZf7BHb7DaRfORNSUli32wA4J3THjalFjZgyC8SIH\nLtc1yGejBgtylSRQsmIAZF9UJTq1T3asEd086BQOWcA5rjKQ8EmwpK0ySQoj2QRi\nq7O91zgEEs0oKmk/oN6wa16EYSrgwRdPJcFZZ+pqD2skmNyTVCccj7HWq18AdNBg\nOZLhH+CvRCeo46uinc2esZ4zsz8rfu+ZlZwqJbAsAeh/9FSBcCWS/9VbDRYIwCoe\ncf/nAbJsym4y8RK4mdGw+Elu/i5vTAyUn02ZqtLNGlWCtLBwNCsPCJNDQiO3vvGQ\nAhYy/XKlPV6JyWh2H2LDAp3vOPfDZpzPip4UGfNBGQKBgQD8L7bKrO7MjBP9K907\n87TGRsrmeQvhBgV/vTsFxFg2g9cZH3CvdlZH0Uldwrur01asg98a9My/np3OlVqK\negDthPllt8vdVfmbgXGf4LBaP33qPksbjMcf+WIEjC5sGKShfIzYZ0bjr6b6kStM\n9iY0qvCy9nHutvprmGmBbmZ4hQKBgQDw34/xmtjhcuOMgQSGf03zcEkk8xd0ilch\n2N3iIDYK/UNOG2o/oDoRvEP9ad6p/0KD4TcZytyFnWRGMgnoZsJh8hajr5HXjm2f\nri86Qcr1h1klxziGnmsbXRzrG9NKs68pqdLCMvj97N6uokCqK9/4gBUj+C7jpqRf\n2qPjxOFIWQKBgQDo160wSKdbmOJD2SI1XnjEsUxZq9258HNXVAKQ+o5wFx6dBZhn\niR10xdm1hjz9Eu5t7nwqSWhabDtMKD4mqSr+Is6aii7it6T1XXjpou1xBjpd8xIp\n57ta3EkR5dRe3gnzSCpLDGA5jU7g/vQ55PO1oTcIJd9gBvYELf8MEEDweQKBgAci\nR+wa7vN2aKDfrVeia5ebKr9qZ7Zu5ne9KY0p8Q/QQm8Mxs/NmgqubcESoqKcSccI\nI46jAHcAm1is4Lg+WuF1vw/oAkTFFiAVk5aBHla5RH2m8dii1n8/+bxI3bAntDdi\nrThNNCypGEtJyOqBVCfS+01Oa20YoWOpYRM84IM5AoGBAOEeWO1O6YTfIwm6ewHC\nmDXfuzm1C8eKv1oKfF1KnC9UV3+Xvq1dEOG//zByPLSUBZoqrXZliphcEo8Ziza9\nfVr1uxuGNqIuJHzGvioiXdIo1mNawDYbc4V51xD633Ijxdo9TysJMfdVxyqWPbzS\nF9urRZNGs7t/Q0AZuDxmbULE\n-----END PRIVATE KEY-----\n",
   "client_email": "firebase-adminsdk-f3bp1@runner-b31dd.iam.gserviceaccount.com",
   "client_id": "106372988017957816322",
   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
   "token_uri": "https://oauth2.googleapis.com/token",
   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-f3bp1%40runner-b31dd.iam.gserviceaccount.com"
 }
 
 ```

```java

//application.yml
spring:
  profiles:
    include: API-KEY

  datasource:
    url: jdbc:mysql://3.38.99.110:3306/coffee_station?useSSL=false&allowPublicKeyRetrieval=true&characterEncoding=UTF-8&serverTimezone=UTC
    username: root
    password: ssafy
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    database: mysql
    database-platform: org.hibernate.spatial.dialect.mysql.MySQL56InnoDBSpatialDialect
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
        default_batch_fetch_size: 500
    open-in-view: false

logging.level:
  org.hibernate.SQL: debug

decorator:
  datasource:
    p6spy:
      enable-logging: true
jwt:
  secret: dyAeHubOOc8KaOfYB6XEQoEj1QzRlVgtjNL8PYs1A1tymZvvqkcEU7L1imkKHeDa

cloud:
  aws:
    s3:
      bucket: coffee-station
    region:
      static: ap-northeast-2
    stack:
      auto: false
```



```java
//application-API-KEY.properties
kakao-admin=3e407999a747d65a110a774338c57677
aws-accessKey=AKIA2ZWH2NHWYRRA2CR5
aws-secretKey=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

aws-s3-bucket=coffee-station
aws-s3-region=ap-northeast-2
  
```



#### 배포

Dockerfile

```dockerfile
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

```

Jenkins Pipeline script

```shell
pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                mattermostSend (
                    color: "#525252", 
                    message: "Build STARTED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                )
                git(
                    url: 'https://lab.ssafy.com/s05-final/S05P31B203/',
                    credentialsId: 'c4a0b1ea-cfa0-4178-9878-63fb130ff685',
                    branch: 'develop'
                )
    		}
        }
        
        stage('Build') {
            steps {
                dir('backend/runner') {
                    sh """
                    cat > src/main/resources/firebase/firebase-notification-key.json <<EOF
{
"type": "service_account",
"project_id": "runner-b31dd",
"private_key_id": "3973feecb0b754c53952f1229487d0c699e6f8ec",
"private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDtSPa65T0pfPXt\\nYr/Hn6DkepliHriJHf10Sfptk8pb4IrXVh1XYJQUktqbvfDtst81t6WrWaQRlbOu\\neCFXr0oTXc7brWoVWd77zZrxStnO8KiQizX1KWmlF1J3tikUW5SJPTpHw1a1PDii\\n6z95QwIwjDdSg7Dm7OWummn/vhYsUNeZ/jwaGu37b6Hcbs60BZczTWNptrWMuCFz\\nRPTsoscaL+oK9gx7STBol1V04sV24IKlLrt4UbrnIQMXmGhdq1MygyEb/gAWp6DJ\\nWHu3oKj0K4MxJ0zieoo+A84fj0ZwGAINtwPR0PcgeIrKItF1CH/IhBL9jyrBTjjN\\nHlD0ak49AgMBAAECggEAH8hjZf7BHb7DaRfORNSUli32wA4J3THjalFjZgyC8SIH\\nLtc1yGejBgtylSRQsmIAZF9UJTq1T3asEd086BQOWcA5rjKQ8EmwpK0ySQoj2QRi\\nq7O91zgEEs0oKmk/oN6wa16EYSrgwRdPJcFZZ+pqD2skmNyTVCccj7HWq18AdNBg\\nOZLhH+CvRCeo46uinc2esZ4zsz8rfu+ZlZwqJbAsAeh/9FSBcCWS/9VbDRYIwCoe\\ncf/nAbJsym4y8RK4mdGw+Elu/i5vTAyUn02ZqtLNGlWCtLBwNCsPCJNDQiO3vvGQ\\nAhYy/XKlPV6JyWh2H2LDAp3vOPfDZpzPip4UGfNBGQKBgQD8L7bKrO7MjBP9K907\\n87TGRsrmeQvhBgV/vTsFxFg2g9cZH3CvdlZH0Uldwrur01asg98a9My/np3OlVqK\\negDthPllt8vdVfmbgXGf4LBaP33qPksbjMcf+WIEjC5sGKShfIzYZ0bjr6b6kStM\\n9iY0qvCy9nHutvprmGmBbmZ4hQKBgQDw34/xmtjhcuOMgQSGf03zcEkk8xd0ilch\\n2N3iIDYK/UNOG2o/oDoRvEP9ad6p/0KD4TcZytyFnWRGMgnoZsJh8hajr5HXjm2f\\nri86Qcr1h1klxziGnmsbXRzrG9NKs68pqdLCMvj97N6uokCqK9/4gBUj+C7jpqRf\\n2qPjxOFIWQKBgQDo160wSKdbmOJD2SI1XnjEsUxZq9258HNXVAKQ+o5wFx6dBZhn\\niR10xdm1hjz9Eu5t7nwqSWhabDtMKD4mqSr+Is6aii7it6T1XXjpou1xBjpd8xIp\\n57ta3EkR5dRe3gnzSCpLDGA5jU7g/vQ55PO1oTcIJd9gBvYELf8MEEDweQKBgAci\\nR+wa7vN2aKDfrVeia5ebKr9qZ7Zu5ne9KY0p8Q/QQm8Mxs/NmgqubcESoqKcSccI\\nI46jAHcAm1is4Lg+WuF1vw/oAkTFFiAVk5aBHla5RH2m8dii1n8/+bxI3bAntDdi\\nrThNNCypGEtJyOqBVCfS+01Oa20YoWOpYRM84IM5AoGBAOEeWO1O6YTfIwm6ewHC\\nmDXfuzm1C8eKv1oKfF1KnC9UV3+Xvq1dEOG//zByPLSUBZoqrXZliphcEo8Ziza9\\nfVr1uxuGNqIuJHzGvioiXdIo1mNawDYbc4V51xD633Ijxdo9TysJMfdVxyqWPbzS\\nF9urRZNGs7t/Q0AZuDxmbULE\\n-----END PRIVATE KEY-----",
"client_email": "firebase-adminsdk-f3bp1@runner-b31dd.iam.gserviceaccount.com",
"client_id": "106372988017957816322",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-f3bp1%40runner-b31dd.iam.gserviceaccount.com"
}
                    """
                    sh """
                    cat > src/main/resources/application-API-KEY.properties <<EOF
                    kakao-admin=3e407999a747d65a110a774338c57677
                    aws-accessKey=AKIA2ZWH2NHWYRRA2CR5
                    aws-secretKey=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
                    
                    aws-s3-bucket=coffee-station
                    aws-s3-region=ap-northeast-2
                    """
                    sh"""
                    cat > src/main/resources/application.yml <<EOF
                    spring:
                      profiles:
                        include: API-KEY
                      datasource:
                        url: jdbc:mysql://3.38.99.110:3306/coffee_station?useSSL=false&allowPublicKeyRetrieval=true&characterEncoding=UTF-8&serverTimezone=UTC
                        username: root
                        password: ssafy
                        driver-class-name: com.mysql.cj.jdbc.Driver
                      jpa:
                        database: mysql
                        hibernate:
                          ddl-auto: update
                        properties:
                          hibernate:
                            dialect: org.hibernate.spatial.dialect.mysql.MySQL56InnoDBSpatialDialect
                            format_sql: true
                            default_batch_fetch_size: 500
                        open-in-view: false
                    
                    logging.level:
                      org.hibernate.SQL: debug
                    
                    decorator:
                      datasource:
                        p6spy:
                          enable-logging: true
                    jwt:
                      secret: dyAeHubOOc8KaOfYB6XEQoEj1QzRlVgtjNL8PYs1A1tymZvvqkcEU7L1imkKHeDa
                    
                    cloud:
                      aws:
                        s3:
                          bucket: coffee-station
                        region:
                          static: ap-northeast-2
                        stack:
                          auto: false
                    """
                    
                    // sh 'cp src/main/resources/application.yml src/main/resources/application.yml'
                    // sh 'cp src/main/resources/application-API-KEY.properties src/main/resources/application-API-KEY.properties'
                    sh 'docker build -t runner_spring .'
                }
    		}
        }
        
        stage('Deploy') {
            steps {
                sh "docker-compose up -d"
    		}
        }
        
        
    }
    post {
        success {
            mattermostSend (
                color: "good", 
                message: "Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
            )
        }
        failure {
            mattermostSend (
                color: "danger", 
                message: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
            )
        }
    }
}
```



#### DataBase

mysql://3.38.99.110:3306/coffee_station

ID: root/ PW: ssafy

ERD

![image-20211119051912271](PortingMenual.assets/image-20211119051912271.png)



#### Version

AWS  `Ubuntu 20.04 LTS (GNU/Linux 5.4.0-1018-aws x86_64)`

Java

```
java 11.0.11 2021-04-20 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.11+9-LTS-194)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.11+9-LTS-194, mixed mode)
```

Spring Boot

`'2.5.5'`

Docker

```
docker --version
Docker version 20.10.9, build c2ea9bc
```

MySQL

```
mysql -V      
mysql  Ver 8.0.27 for Linux on x86_64 (MySQL Community Server - GPL)
```

IntelliJ

```
IntelliJ IDEA 2021.1.3 (Ultimate Edition)
Build #IU-211.7628.21, built on June 30, 2021
Licensed to JEONGJUN LEE
Subscription is active until July 26, 2022.
For educational use only.
Runtime version: 11.0.11+9-b1341.60 x86_64
VM: OpenJDK 64-Bit Server VM by JetBrains s.r.o.
macOS 11.5.2
GC: ParNew, ConcurrentMarkSweep
Memory: 1981M
Cores: 8
Non-Bundled Plugins: monokai-pro (1.3.2), idea.plugin.protoeditor (2.3.1)
Kotlin: 211-1.4.32-release-IJ7628.19
```



## 2. 프로젝트에서 사용하는 외부 서비스 정보 문서

1. 사업자 등록 확인 API
- 사용이유 : 점주 판별을 위함
- https://www.data.go.kr/data/15081808/openapi.do#/%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A0%95%EB%B3%B4%20%EC%A7%84%EC%9C%84%ED%99%95%EC%9D%B8%20API/validate

2. 카카오 결제 API
- 사용이유 : 주문 결제 로직 구현을 위함
- https://developers.kakao.com/docs/latest/ko/kakaopay/common

3. FireBase Cloud Messaging

- 파트너와 고객간 주문 상태 변경에 따른 푸쉬 알림 기능을 위해 사용
- https://firebase.google.com/docs/cloud-messaging?hl=ko

4. Naver Map API - Mobile Dynamic Map 
- 사용이유: customer앱의 내 근처 카페 확인 
- https://www.ncloud.com/product/applicationService/maps

5. AWS -S3
- 사용이유 : 가게 및 메뉴 사진 스토리지 관리를 위함
- https://aws.amazon.com/ko/s3/?nc2=type_a 

6. KAKAO POSTCODE
- 사용이유 : 사업자의 매장 주소 등록에 사용
- https://postcode.map.daum.net/guide 



## 3. 데이터베이스 덤프 파일

dump_2021119 폴더 확인



## 4. 시연 시나리오

Customer App

1. 메인 페이지 및 지도

   - 현재 위치를 GPS 로 인지한다.
   - 반경 ?? km 에 있는 카페들을 찾아서 목록으로 반환해준다.(기본값 500m)
   
   
   
2. 카페 상세메뉴

   - 메뉴와 가게소개 두개의 탭으로 나눠져 있다.

   - 메뉴는 3개의 상태를 가진다(SALE, SOLD_OUT, NOT_SALE)

   - SALE, SOLD_OUT만이 메뉴리스트에 노출되며 SALE 만 조회 후 옵션 선택, 장바구니 추가가 가능하다.

   - 가게소개 탭에서는 사진, 위치, 영업정보 등의 다양한 정보가 확인 가능하다.

   - 가게로 전화걸기와 가게 찜, 메뉴 찜이 가능하다.

     

3. 실제 주문 과정

   - 메뉴를 선택한다.

   - 사이즈와 옵션, 수량을 선택한다.

   - 장바구니에 추가 후,(좋아요 버튼이 있다는 것만 설명 탭에 넣어두기)

   - 장바구니 탭으로 이동해서, 주문 하기를 누르고, 요청사항을 작성한다.

   - 카카오 페이 결제를 완료 하면, OrderStatus가 PAID로 바뀌고, 파트너에게 푸쉬알림이 간다.

   - 파트너가 주문을 수락하면 PREPARING,  메뉴 준비가 완료되면 READY, 픽업을 완료하면 COMPLETE로 주문 상태가 변경된다.

   - 주문 상태가 변경될때마다 푸쉬 알림이 온다.

     

4. 주문 내역

   - 그동안의 주문 내역이 확인가능하다.

   - PAID => 주문결제만 한 상태

   - PREPARING => 가게에서 메뉴를 준비중인 상태

   - READY => 메뉴 준비 완료 후, 픽업 되기 전 상태

   - COMPLETED => 픽업까지 완료

   - 주문 내역을 클릭하면, 어떤 메뉴를 주문했었는지 확인 가능하다.

     

5. 기타

   - 내가 좋아요한 가게와 메뉴도 깔끔하게 확인 가능하다.
   - 가게 검색으로도 카페를 찾을 수 있다.



Partner APP

회원가입 -> 가게 등록의 과정을 거쳐야 서비스 이용이 가능하다. 사업자등록번호 인증이 필수 이다.

- 가게 정보 조회 및 수정
- 진행 중인 주문( 미수락건/ 수락 후 준비중인건)
- 완료된 주문
- 메뉴 관리
  - 매장에 등록된 메뉴의 상태를 변경하거나, 모든 정보를 핸들링할 수 있다.
-  매출 관리
  - API 는 존재, 추후 프론트 구현 예정