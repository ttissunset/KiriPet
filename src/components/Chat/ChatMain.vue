<script setup>
import { onMounted, ref, nextTick, watch } from "vue";
import { chatAPI } from "../../apis/chat";
import { identity } from "@vueuse/core";

const newMessage = ref("");
const messages = ref([]);

// 发送消息的处理方法
const sendMessage = () => {
  messages.value.push({
    id: "1",
    content: newMessage.value,
  }); // 将新消息添加到 messages 数组

  if (newMessage.value.trim() !== "") {
    chatAPI(newMessage.value)
      .then((result) => {
        const { data } = result;
        // reply.value = data.result.chatReply;
        console.log(data.result.chatReply);
        messages.value.push({
          id: "2",
          content: data.result.chatReply,
        });
      })
      .catch((error) => {
        console.error("获取数据时发生错误:", error);
      });

    newMessage.value = ""; // 清空输入框
  }
};
</script>

<template>
  <div class="chat-main-container">
    <div class="chat-area">
      <div class="chat-area-header">
        <div class="chat-area-title">[勢いにまかせて！]鬼塚夏美</div>
      </div>
      <div class="chat-area-main">
        <!-- 默认消息 -->
        <div class="chat-msg">
          <div class="chat-msg-profile">
            <img
              class="chat-msg-img"
              src="https://kiripet.tos-cn-beijing.volces.com/image/a1.png"
            />
          </div>
          <div class="chat-msg-content">
            <div class="chat-msg-text">
              我是kiri，很高兴认识你！有什么我能帮到你的吗？
            </div>
          </div>
        </div>

        <!-- 消息渲染 -->
        <div
          class="chat-msg"
          v-for="(message, index) in messages"
          :key="index"
          :class="[{ owner: message.id === '1' }]"
        >
          <div class="chat-msg-profile">
            <img
              v-if="message.id == 2"
              class="chat-msg-img"
              src="https://kiripet.tos-cn-beijing.volces.com/image/a1.png"
            />
            <img
              v-else
              class="chat-msg-img"
              src="https://kiripet.tos-cn-beijing.volces.com/image/a2.png"
            />
          </div>
          <div class="chat-msg-content">
            <!-- 遍历并显示消息 -->
            <div class="chat-msg-text">
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>

      <!-- 信息发送区 -->
      <div class="chat-area-footer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-video"
        >
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-image"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-plus-circle"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-paperclip"
        >
          <path
            d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
          />
        </svg>
        <input
          type="text"
          placeholder="说些什么吧 ฅ^•ﻌ•^ฅ"
          v-model="newMessage"
        />
        <button @click="sendMessage">发送</button>
      </div>
    </div>

    <!-- 联系人详情 -->
    <div class="detail-area">
      <div class="detail-area-header">
        <div class="msg-profile">
          <img
            src="https://kiripet.tos-cn-beijing.volces.com/image/a1.png"
            alt=""
          />
        </div>
        <div class="detail-title">[勢いにまかせて！]鬼塚夏美</div>
        <div class="detail-subtitle">私立結ヶ丘女子高等学校 1年级</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-main-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  overflow-y: auto;
}

.chat-area {
  width: 75%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
}

.chat-area-header {
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
}

.chat-area-profile {
  width: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.chat-area-title {
  font-size: 24px;
  font-weight: 600;
}

.chat-area-main {
  flex-grow: 1;
}

.chat-msg-img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.chat-msg-profile {
  margin-top: auto;
  margin-bottom: -5px;
  position: relative;
}

.chat-msg {
  display: flex;
  padding: 0 20px 25px;
}

.chat-msg-content {
  margin-left: 12px;
  max-width: 70%;
  display: flex;
  overflow: auto;
  flex-direction: column;
  align-items: flex-end;
}

.chat-msg-text {
  padding: 15px;
  border-radius: 20px 20px 20px 0;
  font-size: 14px;
  font-weight: 500;
  background-color: #e9edf0;
}

.chat-msg-text img {
  max-width: 300px;
  width: 100%;
}

.owner.chat-msg {
  flex-direction: row-reverse;
}

.owner .chat-msg-content {
  margin-left: 0;
  margin-right: 12px;
  align-items: flex-end;
}

.owner .chat-msg-text {
  background-color: #39df55ab;
  color: #080808;
  border-radius: 20px 20px 0 20px;
}

.chat-area-footer {
  display: flex;
  border-top: 1px solid #e1e4e7;
  padding: 10px 20px;
  align-items: center;
  position: sticky;
  bottom: 0;
  left: 0;
  background-color: #fff;
}

.chat-area-footer svg {
  width: 20px;
  flex-shrink: 0;
  cursor: pointer;
  margin-right: 12px;
}

.chat-area-footer input {
  border: none;
  background-color: #f2f4f7;
  padding: 12px;
  border-radius: 6px;
  font-size: 15px;
  margin: 0 12px;
  width: 100%;
}

.chat-area-footer input::placeholder {
  color: #66696b;
}

.chat-area-footer button {
  width: 100px;
  height: 100%;
  letter-spacing: 2px;
  border-radius: 5px;
}

.chat-area-footer button:hover {
  background-color: rgb(14, 224, 154);
  color: #fff;
  cursor: pointer;
  transition: var(--transition-1);
}

.detail-area {
  width: 20%;
  border-left: 1px solid #e9edf0;
  margin-left: auto;
  padding: 30px 30px 0 30px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.detail-area-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-area-header .msg-profile img {
  margin-right: 0;
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
}

.detail-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.detail-subtitle {
  font-size: 12px;
  font-weight: 600;
}
</style>
