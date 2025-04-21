import axios from "axios";

// 创建axios实例
const http = axios.create({
  // 设置根地址
  baseURL: "https://api.kirii.site",
  // 设置响应时间
  timeout: 5000000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// axios请求拦截器
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 从 localStorage 中获取 token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 在请求头中附加 token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios响应式拦截器
// http.interceptors.response.use((e) => Promise.reject(e))

export default http;
