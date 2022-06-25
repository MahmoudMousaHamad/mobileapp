import { useEffect, useState } from "react";
import secureStore from "./secureStore";

export default function () {
    const [user, setUser] = useState();

    useEffect(() => {
        async function getUser() {
            const user = await secureStore.get('user');
            setUser(user);
        }
        getUser();
    });

    return user;
}