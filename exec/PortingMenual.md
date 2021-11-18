# 포팅 매뉴얼

## gitlab 소스 클론 이후 빌드 배포

#### Frontend

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







#### Backend

