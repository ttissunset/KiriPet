import http from "@/utils/http";

// ai聊天api
export const chatAPI = (content) => {
  return http({
    url: "/chat/chat",
    method: "post",
    data: {
      content,
    },
  });
};

// 发送文本消息api
export const sendTextMessage = async (data) => {
  try {
    const response = await http.post("/chat/send-msg", {
      sender_id: data.senderId,
      receiver_id: data.receiverId,
      chat_id: data.chatId,
      content: data.content,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "发送消息失败，请重试");
  }
};

// 发送文件消息api
export const sendFileMessage = async (data) => {
  try {
    const formData = new FormData();
    formData.append("sender_id", data.senderId);
    formData.append("receiver_id", data.receiverId);
    formData.append("chat_id", data.chatId);
    formData.append("file", data.file);

    const response = await http.post("/chat/send-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "文件上传失败，请重试");
  }
};

// 获取聊天记录api
export const getChatMessages = async (chatId) => {
  try {
    const response = await http.get(`/chat/get-msgs/${chatId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "获取聊天记录失败");
  }
};
