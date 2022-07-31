const LOCAL_IP_ADDRESS = require("ip").address().toString();

export default {
    // name: 'mobileapp',
    // slug: "JobApplier",
    version: '1.0.5',
    owner: "mahmoudmousahamad",
    extra: {
      LOCAL_IP_ADDRESS,
    },
    android: {
      package: "com.jobapplier.app",
      versionCode: 5,
      googleServicesFile: "./google-services.json",
      permissions: ["RECEIVE_BOOT_COMPLETED"],
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    }
};