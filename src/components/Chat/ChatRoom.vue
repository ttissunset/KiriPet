<script setup>
import { onMounted, ref, nextTick, computed, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { useChatStore } from "@/stores/chatStore";
import { chatAPI } from "../../apis/chat";

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
const currentCategory = ref("表情"); // 当前选中的表情分类
const previewVisible = ref(false); // 是否预览
const loading = ref(false); // 加载状态
const currentPreview = ref(""); // 当前预览图片

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
  // 判断输入框内容不为空
  if (!messageText.value.trim()) return;

  try {
    loading.value = true;
    await chatStore.addMessage(route.params.id, {
      type: "text",
      content: messageText.value,
      senderId: currentUser.id,
      receiverId: route.params.id,
    });

    if (route.params.id === "11111") {
      chatAPI(messageText.value)
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

    messageText.value = ""; // 清空输入框
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
    await nextTick();
    scrollToBottom();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

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

/**
 * 以下是 emoji 的函数
 */
// 表情分类
const emojiCategories = {
  表情: [
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "🫠",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "🥲",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🫢",
    "🫣",
    "🤫",
    "🤔",
    "🫡",
    "🤐",
    "🤨",
    "😐️",
    "😑",
    "😶",
    "🫥",
    "😶‍🌫️",
    "😏",
    "😒",
    "🙄",
    "😬",
    "😮‍💨",
    "🤥",
    "🫨",
    "🙂‍↔️",
    "🙂‍↕️",
    "😌",
    "😔",
    "😪",
    "🤤",
    "😴",
    "😷",
    "🤒",
    "🤕",
    "🤢",
    "🤮",
    "🤧",
    "🥵",
    "🥶",
    "🥴",
    "😵",
    "😵‍💫",
    "🤯",
    "🤠",
    "🥳",
    "🥸",
    "😎",
    "🤓",
    "🧐",
    "😕",
    "🫤",
    "😟",
    "🙁",
    "☹️",
    "😮",
    "😯",
    "😲",
    "😳",
    "🥺",
    "🥹",
    "😦",
    "😧",
    "😨",
    "😰",
    "😥",
    "😢",
    "😭",
    "😱",
    "😖",
    "😣",
    "😞",
    "😓",
    "😩",
    "😫",
    "🥱",
    "😤",
    "😡",
    "😠",
    "🤬",
    "😈",
    "👿",
    "💀",
    "☠️",
    "💩",
    "🤡",
    "👹",
    "👺",
    "👻",
    "👽️",
    "👾",
    "🤖",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "🙈",
    "🙉",
    "🙊",
    "💌",
    "💘",
    "💝",
    "💖",
    "💗",
    "💓",
    "💞",
    "💕",
    "💟",
    "❣️",
    "💔",
    "❤️‍🔥",
    "❤️‍🩹",
    "❤️",
    "🩷",
    "🧡",
    "💛",
    "💚",
    "💙",
    "🩵",
    "💜",
    "🤎",
    "🖤",
    "🩶",
    "🤍",
    "💋",
    "💯",
    "💢",
    "💥",
    "💫",
    "💦",
    "💨",
    "🕳️",
    "💬",
    "👁️‍🗨️",
    "🗨️",
    "🗯️",
    "💭",
    "💤",
  ],
  人物: [
    " 👋",
    "🤚",
    "🖐️",
    "✋️",
    "🖖",
    "🫱",
    "🫲",
    "🫳",
    "🫴",
    "🫷",
    "🫸",
    "👌",
    "🤌",
    "🤏",
    "✌️",
    "🤞",
    "🫰",
    "🤟",
    "🤘",
    "🤙",
    "👈️",
    "👉️",
    "👆️",
    "🖕",
    "👇️",
    "☝️",
    "🫵",
    "👍️",
    "👎️",
    "✊️",
    "👊",
    "🤛",
    "🤜",
    "👏",
    "🙌",
    "🫶",
    "👐",
    "🤲",
    "🤝",
    "🙏",
    "✍️",
    "💅",
    "🤳",
    "💪",
    "🦾",
    "🦿",
    "🦵",
    "🦶",
    "👂️",
    "🦻",
    "👃",
    "🧠",
    "🫀",
    "🫁",
    "🦷",
    "🦴",
    "👀",
    "👁️",
    "👅",
    "👄",
    "🫦",
    "👶",
    "🧒",
    "👦",
    "👧",
    "🧑",
    "👱",
    "👨",
    "🧔",
    "🧔‍♂️",
    "🧔‍♀️",
    "👨‍🦰",
    "👨‍🦱",
    "👨‍🦳",
    "👨‍🦲",
    "👩",
    "👩‍🦰",
    "🧑‍🦰",
    "👩‍🦱",
    "🧑‍🦱",
    "👩‍🦳",
    "🧑‍🦳",
    "👩‍🦲",
    "🧑‍🦲",
    "👱‍♀️",
    "👱‍♂️",
    "🧓",
    "👴",
    "👵",
    "🙍",
    "🙍‍♂️",
    "🙍‍♀️",
    "🙎",
    "🙎‍♂️",
    "🙎‍♀️",
    "🙅",
    "🙅‍♂️",
    "🙅‍♀️",
    "🙆",
    "🙆‍♂️",
    "🙆‍♀️",
    "💁",
    "💁‍♂️",
    "💁‍♀️",
    "🙋",
    "🙋‍♂️",
    "🙋‍♀️",
    "🧏",
    "🧏‍♂️",
    "🧏‍♀️",
    "🙇",
    "🙇‍♂️",
    "🙇‍♀️",
    "🤦",
    "🤦‍♂️",
    "🤦‍♀️",
    "🤷",
    "🤷‍♂️",
    "🤷‍♀️",
    "🧑‍⚕️",
    "👨‍⚕️",
    "👩‍⚕️",
    "🧑‍🎓",
    "👨‍🎓",
    "👩‍🎓",
    "🧑‍🏫",
    "👨‍🏫",
    "👩‍🏫",
    "🧑‍⚖️",
    "👨‍⚖️",
    "👩‍⚖️",
    "🧑‍🌾",
    "👨‍🌾",
    "👩‍🌾",
    "🧑‍🍳",
    "👨‍🍳",
    "👩‍🍳",
    "🧑‍🔧",
    "👨‍🔧",
    "👩‍🔧",
    "🧑‍🏭",
    "👨‍🏭",
    "👩‍🏭",
    "🧑‍💼",
    "👨‍💼",
    "👩‍💼",
    "🧑‍🔬",
    "👨‍🔬",
    "👩‍🔬",
    "🧑‍💻",
    "👨‍💻",
    "👩‍💻",
    "🧑‍🎤",
    "👨‍🎤",
    "👩‍🎤",
    "🧑‍🎨",
    "👨‍🎨",
    "👩‍🎨",
    "🧑‍✈️",
    "👨‍✈️",
    "👩‍✈️",
    "🧑‍🚀",
    "👨‍🚀",
    "👩‍🚀",
    "🧑‍🚒",
    "👨‍🚒",
    "👩‍🚒",
    "👮",
    "👮‍♂️",
    "👮‍♀️",
    "🕵️",
    "🕵️‍♂️",
    "🕵️‍♀️",
    "💂",
    "💂‍♂️",
    "💂‍♀️",
    "🥷",
    "👷",
    "👷‍♂️",
    "👷‍♀️",
    "🫅",
    "🤴",
    "👸",
    "👳",
    "👳‍♂️",
    "👳‍♀️",
    "👲",
    "🧕",
    "🤵",
    "🤵‍♂️",
    "🤵‍♀️",
    "👰",
    "👰‍♂️",
    "👰‍♀️",
    "🤰",
    "🫃",
    "🫄",
    "🤱",
    "👩‍🍼",
    "👨‍🍼",
    "🧑‍🍼",
    "👼",
    "🎅",
    "🤶",
    "🧑‍🎄",
    "🦸",
    "🦸‍♂️",
    "🦸‍♀️",
    "🦹",
    "🦹‍♂️",
    "🦹‍♀️",
    "🧙",
    "🧙‍♂️",
    "🧙‍♀️",
    "🧚",
    "🧚‍♂️",
    "🧚‍♀️",
    "🧛",
    "🧛‍♂️",
    "🧛‍♀️",
    "🧜",
    "🧜‍♂️",
    "🧜‍♀️",
    "🧝",
    "🧝‍♂️",
    "🧝‍♀️",
    "🧞",
    "🧞‍♂️",
    "🧞‍♀️",
    "🧟",
    "🧟‍♂️",
    "🧟‍♀️",
    "🧌",
    "💆",
    "💆‍♂️",
    "💆‍♀️",
    "💇",
    "💇‍♂️",
    "💇‍♀️",
    "🚶",
    "🚶‍♂️",
    "🚶‍♀️",
    "🚶‍➡️",
    "🚶‍♀️‍➡️",
    "🚶‍♂️‍➡️",
    "🧍",
    "🧍‍♂️",
    "🧍‍♀️",
    "🧎",
    "🧎‍♂️",
    "🧎‍♀️",
    "🧎‍➡️",
    "🧎‍♀️‍➡️",
    "🧎‍♂️‍➡️",
    "🧑‍🦯",
    "🧑‍🦯‍➡️",
    "👨‍🦯",
    "👨‍🦯‍➡️",
    "👩‍🦯",
    "👩‍🦯‍➡️",
    "🧑‍🦼",
    "🧑‍🦼‍➡️",
    "👨‍🦼",
    "👨‍🦼‍➡️",
    "👩‍🦼",
    "👩‍🦼‍➡️",
    "🧑‍🦽",
    "🧑‍🦽‍➡️",
    "👨‍🦽",
    "👨‍🦽‍➡️",
    "👩‍🦽",
    "👩‍🦽‍➡️",
    "🏃",
    "🏃‍♂️",
    "🏃‍♀️",
    "🏃‍➡️",
    "🏃‍♀️‍➡️",
    "🏃‍♂️‍➡️",
    "💃",
    "🕺",
    "🕴️",
    "👯",
    "👯‍♂️",
    "👯‍♀️",
    "🧖",
    "🧖‍♂️",
    "🧖‍♀️",
    "🧗",
    "🧗‍♂️",
    "🧗‍♀️",
    "🤺",
    "🏇",
    "⛷️",
    "🏂️",
    "🏌️",
    "🏌️‍♂️",
    "🏌️‍♀️",
    "🏄️",
    "🏄‍♂️",
    "🏄‍♀️",
    "🚣",
    "🚣‍♂️",
    "🚣‍♀️",
    "🏊️",
    "🏊‍♂️",
    "🏊‍♀️",
    "⛹️",
    "⛹️‍♂️",
    "⛹️‍♀️",
    "🏋️",
    "🏋️‍♂️",
    "🏋️‍♀️",
    "🚴",
    "🚴‍♂️",
    "🚴‍♀️",
    "🚵",
    "🚵‍♂️",
    "🚵‍♀️",
    "🤸",
    "🤸‍♂️",
    "🤸‍♀️",
    "🤼",
    "🤼‍♂️",
    "🤼‍♀️",
    "🤽",
    "🤽‍♂️",
    "🤽‍♀️",
    "🤾",
    "🤾‍♂️",
    "🤾‍♀️",
    "🤹",
    "🤹‍♂️",
    "🤹‍♀️",
    "🧘",
    "🧘‍♂️",
    "🧘‍♀️",
    "🛀",
    "🛌",
    "🧑‍🤝‍🧑",
    "👭",
    "👫",
    "👬",
    "💏",
    "👩‍❤️‍💋‍👨",
    "👨‍❤️‍💋‍👨",
    "👩‍❤️‍💋‍👩",
    "💑",
    "👩‍❤️‍👨",
    "👨‍❤️‍👨",
    "👩‍❤️‍👩",
    "👨‍👩‍👦",
    "👨‍👩‍👧",
    "👨‍👩‍👧‍👦",
    "👨‍👩‍👦‍👦",
    "👨‍👩‍👧‍👧",
    "👨‍👨‍👦",
    "👨‍👨‍👧",
    "👨‍👨‍👧‍👦",
    "👨‍👨‍👦‍👦",
    "👨‍👨‍👧‍👧",
    "👩‍👩‍👦",
    "👩‍👩‍👧",
    "👩‍👩‍👧‍👦",
    "👩‍👩‍👦‍👦",
    "👩‍👩‍👧‍👧",
    "👨‍👦",
    "👨‍👦‍👦",
    "👨‍👧",
    "👨‍👧‍👦",
    "👨‍👧‍👧",
    "👩‍👦",
    "👩‍👦‍👦",
    "👩‍👧",
    "👩‍👧‍👦",
    "👩‍👧‍👧",
    "🗣️",
    "👤",
    "👥",
    "🫂",
    "👪️",
    "🧑‍🧑‍🧒",
    "🧑‍🧑‍🧒‍🧒",
    "🧑‍🧒",
    "🧑‍🧒‍🧒",
    "👣",
  ],
  动物: [
    "🐵",
    "🐒",
    "🦍",
    "🦧",
    "🐶",
    "🐕️",
    "🦮",
    "🐕‍🦺",
    "🐩",
    "🐺",
    "🦊",
    "🦝",
    "🐱",
    "🐈️",
    "🐈‍⬛",
    "🦁",
    "🐯",
    "🐅",
    "🐆",
    "🐴",
    "🫎",
    "🫏",
    "🐎",
    "🦄",
    "🦓",
    "🦌",
    "🦬",
    "🐮",
    "🐂",
    "🐃",
    "🐄",
    "🐷",
    "🐖",
    "🐗",
    "🐽",
    "🐏",
    "🐑",
    "🐐",
    "🐪",
    "🐫",
    "🦙",
    "🦒",
    "🐘",
    "🦣",
    "🦏",
    "🦛",
    "🐭",
    "🐁",
    "🐀",
    "🐹",
    "🐰",
    "🐇",
    "🐿️",
    "🦫",
    "🦔",
    "🦇",
    "🐻",
    "🐻‍❄️",
    "🐨",
    "🐼",
    "🦥",
    "🦦",
    "🦨",
    "🦘",
    "🦡",
    "🐾",
    "🦃",
    "🐔",
    "🐓",
    "🐣",
    "🐤",
    "🐥",
    "🐦️",
    "🐧",
    "🕊️",
    "🦅",
    "🦆",
    "🦢",
    "🦉",
    "🦤",
    "🪶",
    "🦩",
    "🦚",
    "🦜",
    "🪽",
    "🐦‍⬛",
    "🪿",
    "🐦‍🔥",
    "🐸",
    "🐊",
    "🐢",
    "🦎",
    "🐍",
    "🐲",
    "🐉",
    "🦕",
    "🦖",
    "🐳",
    "🐋",
    "🐬",
    "🦭",
    "🐟️",
    "🐠",
    "🐡",
    "🦈",
    "🐙",
    "🐚",
    "🪸",
    "🪼",
    "🐌",
    "🦋",
    "🐛",
    "🐜",
    "🐝",
    "🪲",
    "🐞",
    "🦗",
    "🪳",
    "🕷️",
    "🕸️",
    "🦂",
    "🦟",
    "🪰",
    "🪱",
  ],
  食物: [
    "🍇",
    "🍈",
    "🍉",
    "🍊",
    "🍋",
    "🍋‍🟩",
    "🍌",
    "🍍",
    "🥭",
    "🍎",
    "🍏",
    "🍐",
    "🍑",
    "🍒",
    "🍓",
    "🫐",
    "🥝",
    "🍅",
    "🫒",
    "🥥",
    "🥑",
    "🍆",
    "🥔",
    "🥕",
    "🌽",
    "🌶️",
    "🫑",
    "🥒",
    "🥬",
    "🥦",
    "🧄",
    "🧅",
    "🥜",
    "🫘",
    "🌰",
    "🫚",
    "🫛",
    "🍄‍🟫",
    "🍞",
    "🥐",
    "🥖",
    "🫓",
    "🥨",
    "🥯",
    "🥞",
    "🧇",
    "🧀",
    "🍖",
    "🍗",
    "🥩",
    "🥓",
    "🍔",
    "🍟",
    "🍕",
    "🌭",
    "🥪",
    "🌮",
    "🌯",
    "🫔",
    "🥙",
    "🧆",
    "🥚",
    "🍳",
    "🥘",
    "🍲",
    "🫕",
    "🥣",
    "🥗",
    "🍿",
    "🧈",
    "🧂",
    "🥫",
    "🍱",
    "🍘",
    "🍙",
    "🍚",
    "🍛",
    "🍜",
    "🍝",
    "🍠",
    "🍢",
    "🍣",
    "🍤",
    "🍥",
    "🥮",
    "🍡",
    "🥟",
    "🥠",
  ],
  活动: [
    "🎃",
    "🎄",
    "🎆",
    "🎇",
    "🧨",
    "✨️",
    "🎈",
    "🎉",
    "🎊",
    "🎋",
    "🎍",
    "🎎",
    "🎏",
    "🎐",
    "🎑",
    "🧧",
    "🎀",
    "🎁",
    "🎗️",
    "🎟️",
    "🎫",
    "🎖️",
    "🏆️",
    "🏅",
    "🥇",
    "🥈",
    "🥉",
    "⚽️",
    "⚾️",
    "🥎",
    "🏀",
    "🏐",
    "🏈",
    "🏉",
    "🎾",
    "🥏",
    "🎳",
    "🏏",
    "🏑",
    "🏒",
    "🥍",
    "🏓",
    "🏸",
    "🥊",
    "🥋",
    "🥅",
    "⛳️",
    "⛸️",
    "🎣",
    "🤿",
    "🎽",
    "🎿",
    "🛷",
    "🥌",
    "🎯",
    "🪀",
    "🪁",
    "🔫",
    "🎱",
    "🔮",
    "🪄",
    "🎮️",
    "🕹️",
    "🎰",
    "🎲",
    "🧩",
    "🧸",
    "🪅",
    "🪩",
    "🪆",
    "♠️",
    "♥️",
    "♦️",
    "♣️",
    "♟️",
    "🃏",
    "🀄️",
    "🎴",
    "🎭️",
    "🖼️",
    "🎨",
    "🧵",
    "🪡",
    "🧶",
  ],
  旅行: [
    "🌏️",
    "🌐",
    "🗺️",
    "🗾",
    "🧭",
    "🏔️",
    "⛰️",
    "🌋",
    "🗻",
    "🏕️",
    "🏖️",
    "🏜️",
    "🏝️",
    "🏞️",
    "🏟️",
    "🏛️",
    "🏗️",
    "🧱",
    "🪨",
    "🪵",
    "🛖",
    "🏘️",
    "🏚️",
    "🏠️",
    "🏡",
    "🏢",
    "🏣",
    "🏤",
    "🏥",
    "🏦",
    "🏨",
    "🏩",
    "🏪",
    "🏫",
    "🏬",
    "🏭️",
    "🏯",
    "🏰",
    "💒",
    "🗼",
    "🗽",
    "⛪️",
    "🕌",
    "🛕",
    "🕍",
    "⛩️",
    "🕋",
    "⛲️",
    "⛺️",
    "🌁",
    "🌃",
    "🏙️",
    "🌄",
    "🌅",
    "🌆",
    "🌇",
    "🌉",
    "♨️",
    "🎠",
    "🛝",
    "🎡",
    "🎢",
    "💈",
    "🎪",
    "🚂",
    "🚃",
    "🚄",
    "🚅",
    "🚆",
    "🚇️",
    "🚈",
    "🚉",
    "🚊",
    "🚝",
    "🚞",
    "🚋",
    "🚌",
    "🚍️",
    "🚎",
    "🚐",
    "🚑️",
    "🚒",
    "🚓",
    "🚔️",
    "🚕",
    "🚖",
    "🚗",
    "🚘️",
    "🚙",
    "🛻",
    "🚚",
    "🚛",
    "🚜",
    "🏎️",
    "🏍️",
    "🛵",
    "🦽",
    "🦼",
    "🛺",
    "🚲️",
    "🛴",
    "🛹",
    "🛼",
    "🚏",
    "🛣️",
    "🛤️",
    "🛢️",
    "⛽️",
    "🛞",
    "🚨",
    "🚥",
    "🚦",
    "🛑",
    "🚧",
    "⚓️",
    "🛟",
    "⛵️",
    "🛶",
    "🚤",
    "🛳️",
    "⛴️",
    "🛥️",
    "🚢",
    "✈️",
    "🛩️",
    "🛫",
    "🛬",
    "🪂",
    "💺",
    "🚁",
    "🚟",
    "🚠",
    "🚡",
    "🛰️",
    "🚀",
    "🛸",
    "🛎️",
    "🧳",
    "⌛️",
    "⏳️",
    "⌚️",
    "⏰️",
    "⏱️",
    "⏲️",
    "🕰️",
    "🕛️",
    "🕧️",
    "🕐️",
    "🕜️",
    "🕑️",
    "🕝️",
    "🕒️",
    "🕞️",
    "🕓️",
    "🕟️",
    "🕔️",
    "🕠️",
    "🕕️",
    "🕡️",
    "🕖️",
    "🕢️",
    "🕗️",
    "🕣️",
    "🕘️",
    "🕤️",
    "🕙️",
    "🕥️",
    "🕚️",
    "🕦️",
    "🌑",
    "🌒",
    "🌓",
    "🌔",
    "🌕️",
    "🌖",
    "🌗",
    "🌘",
    "🌙",
    "🌚",
    "🌛",
    "🌜️",
    "🌡️",
    "☀️",
    "🌝",
    "🌞",
    "🪐",
    "⭐️",
    "🌟",
    "🌠",
    "🌌",
    "☁️",
    "⛅️",
    "⛈️",
    "🌤️",
    "🌥️",
    "🌦️",
    "🌧️",
    "🌨️",
    "🌩️",
    "🌪️",
    "🌫️",
    "🌬️",
    "🌀",
    "🌈",
    "🌂",
    "☂️",
    "☔️",
    "⛱️",
    "⚡️",
    "❄️",
    "☃️",
    "⛄️",
    "☄️",
    "🔥",
    "💧",
    "🌊",
  ],
};

// 计算当前分类的表情
const currentEmojis = computed(() => {
  return emojiCategories[currentCategory.value] || [];
});

// 切换表情选择器显示状态
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
  console.log(111);
};

// 插入表情
const insertEmoji = (emoji) => {
  const input = messageInput.value;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const text = messageText.value;
  messageText.value = text.substring(0, start) + emoji + text.substring(end);

  // 下一个 tick 后设置光标位置
  setTimeout(() => {
    input.focus();
    input.setSelectionRange(start + emoji.length, start + emoji.length);
  }, 0);
};

// 点击外部关闭表情选择器
const handleClickOutside = (event) => {
  const picker = document.querySelector(".emoji-picker");
  const button = document.querySelector(".emoji-button");

  if (
    showEmojiPicker.value &&
    picker &&
    !picker.contains(event.target) &&
    !button.contains(event.target)
  ) {
    showEmojiPicker.value = false;
  }
};

// 生命周期钩子
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  scrollToBottom();
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
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
                  {{ message.content }}
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

      <!-- emoji 区 -->
      <div class="emoji-picker" v-show="showEmojiPicker">
        <div class="emoji-tabs">
          <div
            v-for="(category, name) in emojiCategories"
            :key="name"
            class="emoji-tab"
            :class="{ active: currentCategory === name }"
            @click="currentCategory = name"
          >
            {{ name }}
          </div>
        </div>
        <div class="emoji-grid">
          <div
            v-for="emoji in currentEmojis"
            :key="emoji"
            class="emoji-item"
            @click="insertEmoji(emoji)"
          >
            {{ emoji }}
          </div>
        </div>
      </div>

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
        <input
          type="text"
          ref="messageInput"
          placeholder="说些什么吧 ฅ^•ﻌ•^ฅ"
          v-model="messageText"
          @keypress.enter.prevent="sendMessage"
        />
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

  &:hover{
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

.chat-area-footer input {
  border: none;
  background-color: #f2f4f7;
  padding: 12px;
  border-radius: 6px;
  font-size: 15px;
  margin: 0 12px;
  width: 80%;
}

.chat-area-footer input::placeholder {
  color: #66696b;
}

.chat-area-footer button {
  width: 8%;
  height: 100%;
  letter-spacing: 2px;
  border-radius: var(--radius-6);
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

/* emoji表情 */
.emoji-picker {
  position: absolute;
  left: 318px;
  bottom: 61px;
  z-index: 1000;
  width: 350px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.emoji-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  overflow-x: auto;
}

.emoji-tab {
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.emoji-tab:hover {
  background: #f0f0f0;
}

.emoji-tab.active {
  background: #8b98e4;
  color: white;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
  height: 200px;
  overflow-y: auto;
}

.emoji-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.emoji-item:hover {
  background-color: #f0f0f0;
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

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fa-spinner {
  animation: spin 1s linear infinite;
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
</style>
