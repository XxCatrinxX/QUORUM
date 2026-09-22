import axios from "axios";

const api = axios.create({
  // Mismo origen. Vite envía /api, /login, /logout y /sanctum al backend.
  baseURL: "",

  // Necesario para que el navegador envíe la cookie de sesión.
  withCredentials: true,

  // Axios copiará XSRF-TOKEN al encabezado X-XSRF-TOKEN.
  withXSRFToken: true,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;
