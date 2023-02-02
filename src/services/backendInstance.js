import axios from "axios";

// export const auth_key = process.env.VUE_APP_AUTH_KEY ;
// export const auth = JSON.parse(localStorage.getItem(auth_key));

const backendInstance = axios.create({
    baseURL: "http://localhost:8000",
});

export default backendInstance;