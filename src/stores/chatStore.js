import { defineStore } from "pinia";
import { ref } from "vue";
import { sendFileMessage, sendTextMessage, getChatMessages } from "@/apis/chat";

export const useChatStore = defineStore(
  "chat",
  () => {
    // 状态定义
    const messages = ref({}); // 存储所有聊天消息，格式: { chatId: [messages] }
    const currentChatId = ref(null); // 当前活动的聊天ID
    const loading = ref(false); // 加载状态标识
    const error = ref(null); // 错误信息
    const friendInfo = ref([]);

    /**
     * 添加新消息到聊天
     * @param {string} chatId - 聊天ID
     * @param {Object} message - 消息对象
     * @param {string} message.type - 消息类型 ('text'|'file')
     * @param {string} message.senderId - 发送者ID
     * @param {string} message.receiverId - 接收者ID
     * @param {string|File} message.content|file - 消息内容或文件
     */
    const addMessage = async (chatId, message) => {
      try {
        loading.value = true;
        let response;

        // 根据消息类型调用不同的API
        if (message.type === "text") {
          response = await sendTextMessage({
            senderId: message.senderId,
            receiverId: message.receiverId,
            chatId,
            content: message.content,
          });
        } else if (message.type === "file") {
          response = await sendFileMessage({
            senderId: message.senderId,
            receiverId: message.receiverId,
            chatId,
            file: message.file,
          });
        }

        // 处理发送成功的响应
        if (response?.success) {
          // 初始化聊天消息数组（如果不存在）
          if (!messages.value[chatId]) {
            messages.value[chatId] = [];
          }
          // 构造消息数据并添加到消息列表
          const messageData = {
            ...response.data,
            timestamp: response.data.created_at || new Date().toISOString(),
          };
          messages.value[chatId].push(messageData);
        }
      } catch (err) {
        error.value = err.message;
        throw err;
      } finally {
        loading.value = false;
      }
    };

    /**
     * 加载指定聊天的历史消息
     * @param {string} chatId - 聊天ID
     */
    const loadChatMessages = async (chatId) => {
      try {
        loading.value = true;
        const response = await getChatMessages(chatId);
        if (response.success) {
          // 处理每条消息的时间戳
          messages.value[chatId] = response.data.map((msg) => ({
            ...msg,
            timestamp: msg.created_at || new Date().toISOString(),
          }));
        }
      } catch (err) {
        error.value = err.message;
        throw err;
      } finally {
        loading.value = false;
      }
    };

    /**
     * 获取指定聊天的消息列表
     * @param {string} chatId - 聊天ID
     * @returns {Array} 消息列表
     */
    const getCurrentMessages = (chatId) => {
      return messages.value[chatId] || [];
    };

    return {
      messages,
      currentChatId,
      loading,
      error,
      friendInfo,
      getCurrentMessages,
      addMessage,
      loadChatMessages,
    };
  },
  {
    persist: true,
  }
);
