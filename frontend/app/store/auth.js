import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {SERVER_URL, DEV} from "../constants";

export async function authenticateUser(username, password) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const token = await fetch(`${SERVER_URL}auth/token`, {
        method: "POST",
        body: formData,
    })
    return await token.json();
}

export async function registerUser(username, password) {
    const user = await fetch(`${SERVER_URL}auth/users/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: username, password})
    });
    return await user.json();
}

const authStore = (set) => ({
    jwtToken: null,
    setJWT: (token) => set({jwtToken: token}),
});


const useAuthStore = create(
    devtools(
        persist(authStore, {
            name: 'Authentication'
        })
    )
)

export default useAuthStore;
