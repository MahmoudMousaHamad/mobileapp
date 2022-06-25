import Constants from 'expo-constants';

const { NODE_ENV } = process.env;

let serverEndpoint;

switch (NODE_ENV) {
  case 'production':
    serverEndpoint = 'http://167.172.133.156/';
    break;

  case 'staging':
    serverEndpoint = 'http://167.172.133.156/';
    break;

  default:
    const LOCAL_IP_ADDRESS = Constants.manifest.extra.LOCAL_IP_ADDRESS

    if (!LOCAL_IP_ADDRESS) {
      throw Error(`
      Please add LOCAL_IP_ADDRESS environment variable by creating a .env file
      in the root of the project and add LOCAL_IP_ADDRESS=[YOUR_LOCAL_IP_ADDRESS].
      If you did that already and still can't reach the development server, then
      try running the application using "expo r -c"
      `);
    }
    
    serverEndpoint = `http://${LOCAL_IP_ADDRESS}:3000/`;
    break;
}

console.log("Server Endpoint: ", serverEndpoint);

export default {
  SERVER_ENDPOINT: serverEndpoint,
  AUTH_API_URL: `${serverEndpoint}api/auth/`,
};
