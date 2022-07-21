const LOCAL_IP_ADDRESS = require("ip").address().toString();

export default {
    name: 'mobileapp',
    version: '1.0.3',
    owner: "mahmoudmousahamad",
    extra: {
      LOCAL_IP_ADDRESS,
    },
    android: {
      package: "com.jobapplier.app",
      versionCode: 3,
    }
};