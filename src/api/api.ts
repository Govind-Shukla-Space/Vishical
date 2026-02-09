import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:8080", // change if needed
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  withCredentials: true,
});

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = "/login";
      console.log(error.response);
    }
    return Promise.reject(new Error(message));
  }
);
// export function getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return parts.pop()?.split(';').shift() || null;
//   }
//   return null;
// }
