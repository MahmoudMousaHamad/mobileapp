import secureStore from "./secureStore";

export async function getUser() {
    return JSON.parse(await secureStore.get('user'));
}
