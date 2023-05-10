import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {SERVER_URL} from "../constants";

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

export async function userProfile(token) {
    const me = await fetch(`${SERVER_URL}auth/me`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    return me.json();
}

const authStore = (set) => ({
    jwtToken: null,
    userProfile: null,
    setJWT: (token) => set({jwtToken: token['access_token']}),
    setUserProfile: (data) => set({userProfile: data}),
});


const useAuthStore = create(
    devtools(
        persist(authStore, {
            name: 'Authentication'
        })
    )
)

export default useAuthStore;
