export function getUser(obj) {
    if (obj["_W"]) {
        return JSON.parse(obj["_W"].user);
    } else if (obj.user) {
        return obj.user;
    }

    return null;
}