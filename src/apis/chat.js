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
