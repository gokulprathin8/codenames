import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {SERVER_URL, DEV} from "../constants";

function authenticateUser(username, password) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    fetch(`${SERVER_URL}auth/token`, {
        method: "POST",
        body: formData,
    })
        .then(response => {response.json()})
        .then((data) => {
            authStore.getState().setJWT(data.access_token);
        })
        .catch((error) => console.log(error));
}

const authStore = create((set) => ({
    jwtToken: 'value-1',
    // setJWT: (token) => set({jwtToken: token}),
    // performUserLogin: (username, password) => authenticateUser(username, password),
}));

const useAuthStore = create(
    devtools(
        persist(
            authStore, {
                name: "Authentication"
            }
        )
    )
)


export default useAuthStore;
