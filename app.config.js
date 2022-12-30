const LOCAL_IP_ADDRESS = require("ip").address().toString();

export default {
    name: 'JobApplier',
    slug: "mobileapp",
    version: '1.0.13',
    owner: "mahmoudmousahamad",
    extra: {
      LOCAL_IP_ADDRESS,
    },
    sdkVersion: "45.0.0",
    icon: "./assets/icon.png",
    backgroundColor: "#0C6CDC",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0C6CDC"
    },
    ios: {
      bundleIdentifier: "com.useapplier.jobapplier",
      "supportsTablet": true
    },
    android: {
      package: "com.jobapplier.app",
      versionCode: 13,
      googleServicesFile: "./google-services.json",
      permissions: ["RECEIVE_BOOT_COMPLETED"],
      "adaptiveIcon": {
        "backgroundImage": "./assets/icon.png",
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#0C6CDC",
      },
    },
    "plugins": [
      [
        "expo-notifications",
        {
          icon: "./assets/icon.png",
          color: "#0C6CDC",
          mode: "production",
          sounds: [],
        }
      ]
    ],
};