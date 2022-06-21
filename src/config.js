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
    serverEndpoint = 'http://167.172.133.156/';
    break;
}

console.log("Server Endpoint: ", serverEndpoint);

export default {
  SERVER_ENDPOINT: serverEndpoint,
  AUTH_API_URL: `${serverEndpoint}api/auth/`,
};
