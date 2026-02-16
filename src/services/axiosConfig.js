import axios from "axios";

const TOKEN_TEST = "TOKEN_DE_PRUEBA_LOCAL"; // token de prueba local o del json-server si quieres simularlo

const instance = axios.create({
  baseURL: "http://localhost:4000", // usamos json-server local
  headers: {
    Authorization: `Bearer ${TOKEN_TEST}`,
    "Content-Type": "application/json",
  },
});

export default instance;
