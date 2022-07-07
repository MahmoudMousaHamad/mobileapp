const LOCAL_IP_ADDRESS = require("ip").address().toString();

export default {
    name: 'mobileapp',
    version: '0.1.0',
    extra: {
      LOCAL_IP_ADDRESS,
    },
    android: {
      package: "com.jobapplier.androidapp",
    }
};