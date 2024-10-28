<script setup>
import { onMounted, ref, nextTick, computed, onUnmounted } from "vue";
import { chatAPI, uploadAPI } from "../../apis/chat";

import { useRouter } from "vue-router";
const router = useRouter();
import { log } from "@/directives/logger";

//  消息ref
const newMessage = ref("");
const chatListRef = ref(null);
const messages = ref([]);

// emoji ref
const inputRef = ref(null);
const showEmojiPicker = ref(false);
const currentCategory = ref("表情");

// 文件ref
const fileInputRef = ref(null);
const fileList = ref([]);
const previewVisible = ref(false);
const currentPreview = ref("");

// 文件最大容量 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// 触发文件选择
const triggerFileInput = () => {
  fileInputRef.value.click();
};

// 处理文件选择
const handleFileChange = async (event) => {
  const files = Array.from(event.target.files);

  files.forEach((file) => {
    // 检查文件大小
    if (file.size > MAX_FILE_SIZE) {
      fileList.value.push({
        file,
        name: file.name,
        size: file.size,
        status: "error",
        error: "文件大小不能超过10MB",
      });
      return;
    }

    const fileItem = {
      file,
      name: file.name,
      size: file.size,
      status: "uploading",
      progress: 0,
    };

    // 如果是图片，创建预览
    if (file.type.startsWith("image/")) {
      createPreview(fileItem);
    }

    fileList.value.push(fileItem);

    // 上传文件
    uploadFile(fileItem, fileList.value.length - 1);
  });

  event.target.value = "";
};

// 创建图片预览
const createPreview = (fileItem) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    fileItem.previewUrl = e.target.result;
  };
  reader.readAsDataURL(fileItem.file);
};

// 上传文件
const uploadFile = async (fileItem, index) => {
  const formData = new FormData();
  formData.append("file", fileItem.file);

  try {
    // const result = await uploadAPI(formData);
    setTimeout(() => {
      fileList.value[index].status = "success";
      // fileList.value[index].url = response.data.url;
    }, 3000);
  } catch (error) {
    fileList.value[index].status = "error";
    fileList.value[index].error = "上传失败，请重试";
    console.error("File upload failed:", error);
  }
};

// 预览文件
const previewFile = (file) => {
  if (file.previewUrl) {
    currentPreview.value = file.previewUrl;
    previewVisible.value = true;
  }
};

// 关闭预览
const closePreview = () => {
  previewVisible.value = false;
  currentPreview.value = "";
};

// 重试上传
const retryUpload = (index) => {
  const fileItem = fileList.value[index];
  fileItem.status = "uploading";
  fileItem.progress = 0;
  fileItem.error = null;
  uploadFile(fileItem, index);
};

// 移除文件
const removeFile = (index) => {
  fileList.value.splice(index, 1);
};

// 获取文件图标
const getFileIcon = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();
  const iconMap = {
    pdf: "fa-regular fa-file-pdf",
    doc: "fa-regular fa-file-word",
    docx: "fa-regular fa-file-word",
    xls: "fa-regular fa-file-excel",
    xlsx: "fa-regular fa-file-excel",
    jpg: "fa-regular fa-image",
    jpeg: "fa-regular fa-image",
    png: "fa-regular fa-image",
    gif: "fa-regular fa-image",
  };
  return iconMap[extension] || "fa-regular fa-file";
};

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
};

// 滚动到底部方法
const scrollToBottom = async () => {
  // 确保DOM已更新
  await nextTick();

  const chatList = chatListRef.value;
  if (chatList) {
    // 使用scrollTo方法平滑滚动到底部
    chatList.scrollTo({
      top: chatList.scrollHeight,
      behavior: "smooth",
    });
  }
};

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
  const input = inputRef.value;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const text = newMessage.value;
  newMessage.value = text.substring(0, start) + emoji + text.substring(end);

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

// 超出显示范围自动发送消息的处理方法
const sendMessage = async () => {
  messages.value.push({
    id: "1",
    content: newMessage.value,
  }); // 将新消息添加到 messages 数组

  if (newMessage.value.trim() !== "") {
    chatAPI(newMessage.value)
      .then((result) => {
        const { data } = result;
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
    await scrollToBottom();
  }
};

// 生命周期钩子
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="chat-main-container">
    <div class="chat-area">
      <div class="chat-area-header">
        <img
          src="https://kiripet.tos-cn-beijing.volces.com/image/logo.png"
          @click="router.push('/home')"
        />
        <div class="chat-area-title">[勢いにまかせて！]鬼塚夏美</div>
      </div>

      <div class="chat-area-main" ref="chatListRef">
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

      <!-- 文件列表展示区域 -->
      <div class="file-list" v-if="fileList.length > 0">
        <div v-for="(file, index) in fileList" :key="index" class="file-item">
          <!-- 文件预览/图标 -->
          <div class="file-preview" @click="previewFile(file)">
            <img
              v-if="file.previewUrl"
              :src="file.previewUrl"
              class="preview-image"
            />
            <i v-else :class="getFileIcon(file.name)"></i>
          </div>

          <!-- 文件信息 -->
          <div class="file-info">
            <div class="file-name" :title="file.name">{{ file.name }}</div>
            <div class="file-size">{{ formatFileSize(file.size) }}</div>
            <div v-if="file.error" class="file-error">{{ file.error }}</div>
          </div>

          <!-- 上传进度 -->
          <div class="progress-bar" v-if="file.status === 'uploading'">
            <div class="progress" :style="{ width: file.progress + '%' }"></div>
          </div>

          <!-- 操作按钮 -->
          <div class="file-actions">
            <template v-if="file.status === 'success'">
              <i class="fa-solid fa-check"></i>
              <i class="fa-solid fa-xmark" @click="removeFile(index)"></i>
            </template>
            <template v-else-if="file.status === 'error'">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <i
                class="fa-solid fa-rotate-right"
                @click="retryUpload(index)"
              ></i>
              <i class="fa-solid fa-xmark" @click="removeFile(index)"></i>
            </template>
            <i v-else class="fa-solid fa-spinner"></i>
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
        <i class="fa-brands fa-whatsapp"></i>
        <i class="fa-regular fa-image"></i>
        <i
          class="fa-regular fa-face-smile emoji-button"
          @click.stop="toggleEmojiPicker"
        ></i>
        <div class="upload-container">
          <input
            ref="fileInputRef"
            type="file"
            @change="handleFileChange"
            m
            name="file"
            class="hidden-input"
            accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx"
            style="display: none"
          />
          <i class="fa-solid fa-paperclip" @click="triggerFileInput"></i>
        </div>
        <input
          type="text"
          ref="inputRef"
          placeholder="说些什么吧 ฅ^•ﻌ•^ฅ"
          v-model="newMessage"
          @keypress.enter.prevent="sendMessage"
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
      <div class="detail-area-main">

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
}

.chat-area-header {
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #e1e4e7;
  padding: 20px;
  background-color: #fff;
}

.chat-area-header img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
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
  height: 100vh;
  overflow-y: auto;
  margin-top: 10px;
  font-family: var(--ff-llt);
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

.chat-area-footer i {
  width: 20px;
  flex-shrink: 0;
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
  color: var(--dark-variant);
}

/* emoji表情 */
.emoji-picker {
  position: absolute;
  left: 300px;
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

/* 文件 */
.file-list {
  margin-top: 16px;
  position: absolute;
  bottom: 61px;
}

.file-item {
  display: flex;
  align-items: center;
  width: 400px;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.file-preview {
  width: 40px;
  height: 40px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  font-size: 12px;
  color: #909399;
}

.file-error {
  font-size: 12px;
  color: #f56c6c;
  margin-top: 4px;
}

.progress-bar {
  width: 100px;
  height: 2px;
  background-color: #ebeef5;
  margin: 0 16px;
}

.progress {
  height: 100%;
  background-color: #409eff;
  transition: width 0.3s ease;
}

.file-actions {
  display: flex;
  gap: 15px;
  margin-left: 16px;
  cursor: pointer;
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
</style>
