<script setup>
import { onMounted, ref, nextTick, computed, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { useChatStore } from "@/stores/chatStore";
import { chatAPI } from "../../apis/chat";
import EmojiPicker from "@/components/EmojiPicker.vue";

const route = useRoute();
const router = useRouter();
const chatStore = useChatStore();
const messagesContainer = ref(null); // 消息容器的引用
const messageInput = ref(null); // 消息输入框的引用
const fileInput = ref(null); // 文件输入框的引用
const imageInput = ref(null); // 图片输入框的引用
const messageText = ref(""); // 消息文本内容
const error = ref(null); // 错误信息
const showEmojiPicker = ref(false); // 是否显示表情框
const previewVisible = ref(false); // 是否预览
const loading = ref(false); // 加载状态
const currentPreview = ref(""); // 当前预览图片
const lastCursorPosition = ref(null); // 记录最后光标位置

// 当前用户信息
const currentUser = {
  id: "11111111",
  name: "kiri酱",
  avatar: "https://kiripet.tos-cn-beijing.volces.com/image/3904.png",
};

// 获取当前聊天的消息列表
const groupedMessages = computed(() => {
  console.log(chatStore.getCurrentMessages(route.params.id));
  return chatStore.getCurrentMessages(route.params.id);
});

// 格式化时间显示
const formatTime = (timestamp) => {
  try {
    // 检查时间戳是否有效
    const date = timestamp ? new Date(timestamp) : new Date();
    if (isNaN(date.getTime())) {
      return "时间未知";
    }
    return format(date, "HH:mm:ss", { locale: zhCN });
  } catch (err) {
    console.error("Time formatting error:", err);
    return "时间未知";
  }
};

// 发送消息
const sendMessage = async () => {
  // 从contenteditable div获取内容
  const messageContent = messageInput.value.innerHTML;
  
  // 判断输入框内容不为空，并排除只有空白字符的情况
  if (!messageContent.trim() || messageContent === '<br>') return;

  try {
    loading.value = true;
    // 关闭表情选择器
    showEmojiPicker.value = false;

    await chatStore.addMessage(route.params.id, {
      type: "text",
      content: messageContent,
      senderId: currentUser.id,
      receiverId: route.params.id,
    });

    if (route.params.id === "11111") {
      // 发送到AI时移除HTML标签
      const plainText = messageContent.replace(/<[^>]*>/g, '');
      chatAPI(plainText)
        .then((result) => {
          const { data } = result;
          console.log(data.result.chatReply);
          const reply = data.result.chatReply;

          chatStore.addMessage(route.params.id, {
            type: "text",
            content: reply,
            senderId: route.params.id,
            receiverId: currentUser.id,
          });
          scrollToBottom();
        })
        .catch((error) => {
          console.error("获取数据时发生错误:", error);
        });

      await nextTick();
      scrollToBottom();
    }

    // 清空输入框
    messageInput.value.innerHTML = ""; 
    
    // 重置光标位置
    lastCursorPosition.value = null;
    
    // 重新初始化输入框光标
    setTimeout(() => {
      messageInput.value.focus();
      initInputCursor();
    }, 0);
    
    await nextTick();
    scrollToBottom();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// 滚动到底部
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value.click();
};

// 触发图片选择
const triggerImageInput = () => {
  imageInput.value.click();
};

// 处理文件上传
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    loading.value = true;
    await chatStore.addMessage(route.params.id, {
      type: "file",
      file,
      senderId: currentUser.id,
      receiverId: route.params.id,
    });

    event.target.value = "";
    await nextTick();
    scrollToBottom();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// 处理图片上传
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    loading.value = true;
    await chatStore.addMessage(route.params.id, {
      type: "file",
      file,
      senderId: currentUser.id,
      receiverId: route.params.id,
    });

    const fileItem = {
      file,
      name: file.name,
    };
    createPreview(fileItem);

    event.target.value = "";
    await nextTick();
    scrollToBottom();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// 下载文件
const downloadFile = (url) => {
  // 实现文件下载逻辑
  console.log(url);
  
  window.open(url);
};

// 获取文件图标
const getFileIcon = (url) => {
  const extension = url.substring(url.lastIndexOf(".") + 1);
  const iconMap = {
    pdf: "fa-regular fa-file-pdf",
    doc: "fa-regular fa-file-word",
    docx: "fa-regular fa-file-word",
    xls: "fa-regular fa-file-excel",
    xlsx: "fa-regular fa-file-excel",
    md: "fa-brands fa-markdown",
    ppt: "fa-regular fa-file-powerpoint",
    mp4: "fa-brands fa-vimeo",
    avi: "fa-brands fa-vimeo",
    mp3: "fa-regular fa-file-audio",
  };
  return iconMap[extension] || "fa-regular fa-file";
};

// 监听路由变化，切换聊天对象时重新加载消息
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      try {
        loading.value = true;
        await chatStore.loadChatMessages(newId);
        await nextTick();
        scrollToBottom();
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    }
  }
);

// 组件挂载时加载消息
onMounted(async () => {
  try {
    loading.value = true;
    await chatStore.loadChatMessages(route.params.id);
    
    // 初始化输入框光标，确保第一次点击表情时可以正常插入
    if (messageInput.value) {
      messageInput.value.addEventListener('click', initInputCursor);
      // 记录光标位置变化
      messageInput.value.addEventListener('keyup', saveCursorPosition);
      messageInput.value.addEventListener('mouseup', saveCursorPosition);
      
      // 初始点击一次，确保光标可用
      setTimeout(() => {
        messageInput.value.focus();
        initInputCursor();
      }, 100);
      
      // 修复Firefox或Safari中可能存在的插入问题
      messageInput.value.addEventListener('input', (e) => {
        // 如果输入框为空，确保有一个初始BR元素
        if (messageInput.value.innerHTML === '') {
          messageInput.value.innerHTML = '<br>';
        }
        saveCursorPosition();
      });
    }
    
    document.addEventListener("keydown", handleKeyDown);
    await nextTick();
    scrollToBottom();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

// 保存光标位置
const saveCursorPosition = () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    lastCursorPosition.value = selection.getRangeAt(0);
  }
};

// 初始化输入框光标位置（设置到末尾）
const initInputCursor = () => {
  if (!messageInput.value) return;
  
  const range = document.createRange();
  const selection = window.getSelection();
  
  // 将光标定位到内容末尾
  range.selectNodeContents(messageInput.value);
  range.collapse(false); // false表示折叠到末尾
  
  selection.removeAllRanges();
  selection.addRange(range);
  
  // 保存此光标位置
  saveCursorPosition();
  
  // 确保输入框可见
  messageInput.value.scrollTop = messageInput.value.scrollHeight;
};

// 辅助函数：判断是否为图片文件
const isImageFile = (url) => {
  if (!url) return false;
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

// 辅助函数：获取文件名
const getFileName = (url) => {
  if (!url) return "未知文件";
  const parts = url.split("/");
  return parts[parts.length - 1];
};

// 检查消息内容是否包含HTML
const hasHtmlContent = (content) => {
  return typeof content === 'string' && (content.includes('<img') || content.includes('<div'));
};

// 创建图片预览
const createPreview = (fileItem) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    fileItem.previewUrl = e.target.result;
  };
  reader.readAsDataURL(fileItem.file);
};

// 预览文件
const previewFile = (file_url) => {
  if (file_url) {
    currentPreview.value = file_url;
    previewVisible.value = true;
  }
};

// 关闭预览
const closePreview = () => {
  previewVisible.value = false;
  currentPreview.value = "";
};

// 插入表情
const insertEmoji = (emoji) => {
  if (!messageInput.value) return;
  
  // 确保输入框有焦点
  messageInput.value.focus();
  
  let range;
  // 优先使用上次保存的光标位置
  if (lastCursorPosition.value) {
    range = lastCursorPosition.value.cloneRange();
  } else {
    // 如果没有保存的位置，获取当前选区
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0).cloneRange();
    } else {
      // 如果没有当前选区，创建一个新的选区在末尾
      initInputCursor();
      range = window.getSelection().getRangeAt(0).cloneRange();
    }
  }
  
  // 确保range有效
  if (!range) {
    initInputCursor();
    range = window.getSelection().getRangeAt(0).cloneRange();
  }
  
  // 清除当前选择内容（如果有）
  range.deleteContents();
  
  // 根据表情类型插入内容
  if (typeof emoji === 'string' && emoji.endsWith('.gif')) {
    // 插入GIF图片（从doro分类）
    const img = document.createElement('img');
    img.src = `/src/assets/doro/${emoji}`;
    img.alt = 'emoji';
    img.className = 'chat-emoji-gif';
    img.style.maxWidth = '100px';
    img.style.maxHeight = '100px';
    img.style.verticalAlign = 'middle';
    
    range.insertNode(img);
    
    // 将光标位置移动到插入的图片后面
    range.setStartAfter(img);
    range.setEndAfter(img);
  } else {
    // 插入普通emoji
    const text = document.createTextNode(emoji);
    range.insertNode(text);
    
    // 将光标位置移动到插入的文本后面
    range.setStartAfter(text);
    range.setEndAfter(text);
  }
  
  // 更新选择区域
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  
  // 保存新的光标位置
  lastCursorPosition.value = range.cloneRange();
  
  // 确保输入框可见
  messageInput.value.scrollTop = messageInput.value.scrollHeight;
};

// 切换表情选择器显示状态
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

// 点击外部关闭表情选择器
const handleClickOutside = (event) => {
  // This is now handled by the EmojiPicker component
};

// 生命周期钩子
onMounted(() => {
  scrollToBottom();
});

onUnmounted(() => {
  scrollToBottom();
});

// 处理Enter键
const handleEnterKey = (e) => {
  // 如果按下Shift+Enter，允许换行
  if (e.shiftKey) {
    return;
  }
  
  // 如果只按Enter，发送消息
  e.preventDefault();
  sendMessage();
};
</script>

<template>
  <div class="chat-main-container">
    <!-- 聊天区域 -->
    <div class="chat-area">
      <!-- 加载状态遮罩层 -->
      <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner">
          <div><i class="fa-solid fa-spinner"></i></div>
          <div>载入中.....</div>
        </div>
      </div>

      <!-- 错误提示消息 -->
      <div v-if="error" class="error-message">
        <i class="fa-solid fa-triangle-exclamation"></i>
        {{ error }}
        <button @click="error = null">关闭</button>
      </div>

      <!-- 聊天区域头部 -->
      <div class="chat-area-header">
        <div class="chat-area-title">
          {{ chatStore.friendInfo.des + chatStore.friendInfo.name }}
        </div>
        <div class="chat-area-back" @click="router.push('/home')">
          返回<i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>

      <!-- 聊天信息区域 -->
      <div class="messages-container" ref="messagesContainer">
        <!-- 消息组，用于分组显示消息 -->
        <div
          class="message-group"
          v-for="(message, index) in groupedMessages"
          :key="message.id"
        >
          <!-- 单条消息 -->
          <div
            class="message"
            :class="{
              self: message.sender_id === currentUser.id, // 自己发送的消息
              other: message.sender_id !== currentUser.id, // 他人发送的消息
            }"
          >
            <div class="message-wrapper">
              <div>
                <img
                  class="message-avatar"
                  :src="
                    message.sender_id === currentUser.id
                      ? currentUser.avatar
                      : 'https://kiripet.tos-cn-beijing.volces.com/image/a1.png'
                  "
                  alt=""
                />
              </div>
              <div
                class="message-content"
                @contextmenu.prevent="showContextMenu($event, message)"
              >
                <template v-if="message.message_type === 'text'">
                  <span v-if="hasHtmlContent(message.content)" v-html="message.content"></span>
                  <span v-else>{{ message.content }}</span>
                </template>

                <template v-else-if="message.message_type === 'file'">
                  <!-- 如果是图片文件 -->
                  <div
                    v-if="isImageFile(message.file_url)"
                    class="message-image"
                  >
                    <img
                      :src="message.file_url"
                      @click="previewFile(message.file_url)"
                    />
                  </div>
                  <!-- 如果是其他文件 -->
                  <div
                    v-else
                    class="message-file"
                    @click="downloadFile(message.file_url)"
                  >
                    <div class="file-info">
                      <span class="file-name">
                        <i :class="getFileIcon(message.file_url)"></i>
                        {{ getFileName(message.file_url) }}</span
                      >
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <span class="message-time">
              {{ formatTime(message.timestamp) }}
            </span>
          </div>
        </div>
      </div>

      <!-- EmojiPicker 组件 -->
      <EmojiPicker
        v-model:visible="showEmojiPicker"
        @select-emoji="insertEmoji"
      />

      <!-- 图片预览弹窗 -->
      <div v-if="previewVisible" class="preview-modal" @click="closePreview">
        <div class="preview-content">
          <img :src="currentPreview" alt="preview" />
        </div>
      </div>

      <!-- 信息发送区 -->
      <div class="chat-area-footer">
        <div class="upload-container">
          <input
            ref="imageInput"
            type="file"
            @change="handleImageUpload"
            style="display: none"
            name="file"
            class="hidden-input"
            accept=".jpg,.jpeg,.png,.gif"
          />
          <i class="fa-regular fa-image" @click="triggerImageInput"></i>
        </div>
        <i
          class="fa-regular fa-face-smile emoji-button"
          @click.stop="toggleEmojiPicker"
        ></i>
        <div class="upload-container">
          <input
            ref="fileInput"
            type="file"
            @change="handleFileUpload"
            name="file"
            class="hidden-input"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.md,.txt,.mp4,.avi,.mpc,.ppt"
            style="display: none"
          />
          <i class="fa-solid fa-paperclip" @click="triggerFileInput"></i>
        </div>
        <div
          ref="messageInput"
          class="message-input-editable"
          contenteditable="true"
          @keydown.enter="handleEnterKey"
          placeholder="说些什么吧 ฅ^•ﻌ•^ฅ"
        ></div>
        <button @click="sendMessage" class="send-btn">
          发送<i class="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </div>

    <!-- 联系人详情 -->
    <div class="detail-area">
      <div class="detail-area-header">
        <div class="msg-profile">
          <img :src="chatStore.friendInfo.avatar" alt="" />
        </div>
        <div class="detail-title">
          {{ chatStore.friendInfo.des + chatStore.friendInfo.name }}
        </div>
        <div class="detail-subtitle">{{ chatStore.friendInfo.grade }}</div>
      </div>
      <div class="detail-area-main">
        <div class="chatOpt">
          <div class="chatOpt-btn">
            <button><i class="fa-solid fa-phone"></i>语音聊天</button>
          </div>
          <div class="chatOpt-btn">
            <button><i class="fa-solid fa-video"></i>视频聊天</button>
          </div>
        </div>
        <div class="user-info">
          <div class="info-item">
            <span>备注</span>
            <p>{{ chatStore.friendInfo.note }}</p>
          </div>
          <div class="info-item">
            <span>生日</span>
            <p>{{ chatStore.friendInfo.birth }}</p>
          </div>
          <div class="info-item">
            <span>电话</span>
            <p>{{ chatStore.friendInfo.phone }}</p>
          </div>
          <div class="info-item">
            <span>地址</span>
            <p>{{ chatStore.friendInfo.address }}</p>
          </div>
          <div class="info-item">
            <span>个性签名</span>
            <p>
              {{ chatStore.friendInfo.signature }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-main-container {
  display: flex;
  flex-grow: 1;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.chat-area {
  width: 75%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.error-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #ff5252;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1000;
}

.error-message button {
  padding: 4px 8px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.chat-area-header {
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e1e4e7;
  padding: 20px;
  background-color: #fff;
}

.chat-area-back {
  margin: 0 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #8b98e4;
  }
  i {
    font-size: 16px;
    margin-left: 10px;
  }
}

.chat-area-title {
  font-size: 24px;
  font-weight: 600;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px;

  .message-group {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;

    .message {
      max-width: 70%;
      margin-bottom: 4px;
      align-self: flex-start;

      &.self {
        align-self: flex-end;
        .message-wrapper {
          flex-direction: row-reverse;

          .message-content {
            background: var(--youth-green);
            color: white;
            border-radius: 16px 16px 4px 16px;
          }
        }

        .message-time {
          text-align: right;
        }
      }

      &.other {
        .message-content {
          background: #f0f2f5;
          border-radius: 16px 16px 16px 4px;
        }

        .message-time {
          text-align: left;
        }
      }

      .message-wrapper {
        display: flex;
        align-items: flex-end;
        gap: 8px;

        .message-avatar {
          width: 45px;
          height: 45px;
        }
      }

      .message-content {
        padding: 12px 16px;
        word-break: break-word;
      }

      .message-image {
        img {
          max-width: 300px;
          max-height: 300px;
          border-radius: 12px;
          cursor: pointer;
        }
      }

      .message-file {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 12px;
        cursor: pointer;

        .file-info {
          display: flex;
          flex-direction: column;

          .file-name {
            font-weight: 500;
          }
        }
      }

      .message-time {
        display: block;
        font-size: 12px;
        color: var(--light-gray);
        margin-top: 4px;
      }
    }
  }
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

.chat-area-footer i {
  width: 20px;
  cursor: pointer;
  margin-right: 12px;
}

.upload-container {
  cursor: pointer;
}

.message-input-editable {
  border: none;
  background-color: #f2f4f7;
  padding: 12px;
  border-radius: 6px;
  font-size: 15px;
  margin: 0 12px;
  width: 80%;
  min-height: 20px;
  max-height: 100px;
  overflow-y: auto;
  outline: none;
  line-height: 1.5;
}

.message-input-editable[placeholder]:empty:before {
  content: attr(placeholder);
  color: #66696b;
}

.message-input-editable[placeholder]:empty:focus:before {
  content: "";
}

.message-input-editable img.chat-emoji-gif {
  width: 24px !important; /* 强制覆盖，确保输入框中的表情尺寸正确 */
  height: 24px !important;
  vertical-align: middle;
  display: inline-block;
  margin: 0 2px;
}

.chat-area-footer button {
  width: 8%;
  height: 100%;
  letter-spacing: 2px;
  border-radius: var(--radius-6);
  border: 1px solid #e4e7eb;
}

.chat-area-footer button i {
  margin-right: -10px;
}

.chat-area-footer button:hover {
  background-color: var(--youth-green);
  color: #fff;
  cursor: pointer;
  transition: var(--transition-2);
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
  color: var(--dark-variant);
}

.chatOpt {
  display: flex;
  justify-content: space-around;
}

.chatOpt-btn i {
  margin-right: 5px;
}

.chatOpt-btn button {
  margin-top: 25px;
  width: 150px;
  height: 40px;
  color: #fff;
  background-color: var(--deongaree);
  border-radius: var(--radius-6);
  letter-spacing: 2px;
}

.chatOpt-btn button:hover {
  background-color: var(--youth-green);
  transition: var(--transition-2);
}

.user-info {
  width: 100%;
  margin-top: 20px;
}

.info-item {
  margin: 10px 0;
  border-bottom: 1px solid var(--light);
  padding-bottom: 5px;
  padding-left: 10px;
}

.info-item span {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
}

.info-item p {
  font-size: 13px;
  font-weight: 600;
  color: #949393;
}

/* 预览弹窗 */
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.preview-content {
  max-width: 90%;
  max-height: 90%;
}

.preview-content img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* GIF emoji styles */
:deep(.chat-emoji-gif) {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  display: inline-block;
}

/* 聊天区域中的GIF表情 */
.message-content {
  :deep(img.chat-emoji-gif) {
    width: 60px; /* 聊天区域中显示更大的尺寸 */
    height: 60px;
    vertical-align: middle;
    margin: 2px;
  }
  
  :deep(img) {
    max-width: 100%;
    vertical-align: middle;
  }
}

/* GIF表情样式 */
.chat-emoji-gif {
  max-width: 100px;
  max-height: 100px;
  vertical-align: middle;
  margin: 2px;
  border-radius: 4px;
}

/* 输入框中的GIF表情样式 */
.message-input .chat-emoji-gif {
  max-width: 80px;
  max-height: 80px;
  vertical-align: middle;
  margin: 2px;
  display: inline-block;
}
</style>
