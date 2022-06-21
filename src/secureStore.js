import * as SecureStore from 'expo-secure-store';

async function set(key, value) {
    await SecureStore.setItemAsync(key, value);
}
  
async function get(key) {
    return await SecureStore.getItemAsync(key);
}

async function remove(key) {
    let result = await SecureStore.deleteItemAsync(key);
    if (result) {
        alert("Valye deleted.");
    } else {
        return null;
    }
}

export default {
    set,
    get,
    remove
}