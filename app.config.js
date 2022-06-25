const LOCAL_IP_ADDRESS = require("ip").address().toString();

export default {
    name: 'mobileapp',
    version: '1.0.0',
    extra: {
      LOCAL_IP_ADDRESS,
    },
};