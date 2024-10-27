import http from "@/utils/http";

export const chatAPI = (content) => {
  return http({
    url: "/users/chat",
    method: "post",
    data: {
      content,
    },
  });
};

export const uploadAPI = (formData) => {
  return http({
    url: "/users/upload",
    method: "post",
    data: {
      formData,
    },
  });
};
