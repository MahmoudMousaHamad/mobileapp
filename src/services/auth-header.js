import secureStore from '../secureStore';

/* 
    Return auth header to access protected resources on the server.
    If there is a logged in user with accessToken (JWT), return HTTP Authorization header. 
    Otherwise, return an empty object.
*/
export default async function authHeader() {
    const user = JSON.parse(await secureStore.get('user'));
    if (user && user.token) {
      return { 'x-access-token': user.token };
    } else {
      return {};
    }
}