import { toast } from "react-toastify";


export const successMessage = (msg) => {
  toast.success(msg, {
    position: "top-right",
    style: { fontSize: "14px" },
  });
};

export const errorMessage = (msg) => {
  toast.error(msg, {
    position: "top-right",
    style: { fontSize: "14px" },
  });
};

// const api = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL,
//   withCredentials: true
// })

// api.interceptors.response.use(
//   (response)=>response,
//   (error)=> {
//     if(error.response?.status === 401){
//       console.warn("Access token expired!");
//       errorMessage("Access Token Expired!")
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken")
//       window.location.href = "/login"
//     }

//     return error
//   }
// )

// export default api;
