const { NODE_ENV } = process.env;

const LOCAL_IP_ADDRESS = process.env.LOCAL_IP_ADDRESS;

let serverEndpoint;

switch (NODE_ENV) {
  case 'production':
    serverEndpoint = 'http://167.172.133.156/';
    break;

  case 'staging':
    serverEndpoint = 'http://167.172.133.156/';
    break;

  default:
    console.log(process.env);

    if (!LOCAL_IP_ADDRESS) {
      throw Error("Please add LOCAL_IP_ADDRESS environment variable by creating \
      a .env file in the root of the project and add LOCAL_IP_ADDRESS=[YOUR_LOCAL_IP_ADDRESS]");
    }
    
    serverEndpoint = `http://${LOCAL_IP_ADDRESS}:3000/`;
    break;
}

console.log("Server Endpoint: ", serverEndpoint);

export default {
  SERVER_ENDPOINT: serverEndpoint,
  AUTH_API_URL: `${serverEndpoint}api/auth/`,
};
