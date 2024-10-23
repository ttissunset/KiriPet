import http from "@/utils/http";

// 注册的接口函数
export const registerAPI = (user_name, password, email, code) => {
  return http({
    url: "users/register",
    method: "post",
    data: {
      user_name,
      password,
      email,
      code,
    },
  });
};

// 发送验证码的接口函数
export const sendVerificationCodeAPI = (email) => {
  return http({
    url: "/users/send_verification_code",
    method: "POST",
    data: {
      email,
    },
  });
};

// 登录的接口函数函数
export const loginAPI = (user_name, password) => {
  return http({
    url: "/users/login",
    method: "POST",
    data: {
      user_name,
      password,
    },
  });
};

export const test = (code) => {
  return http({
    url: "/users/test",
    method: "POST",
    data: {
      code,
    },
  });
};
