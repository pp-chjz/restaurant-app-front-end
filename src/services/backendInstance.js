import axios from "axios";

const backendInstance = axios.create({
    baseURL: "http://localhost:8000",
});

export default backendInstance;