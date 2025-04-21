<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "@/components/Home/HomeFooter.vue";
import Notification from "@/components/Notify/notification.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const momentId = route.params.id;

// 显示通知的方法
const showNotification = (message, type = 'info') => {
  const event = new CustomEvent('show-notification', {
    detail: { message, type }
  });
  document.dispatchEvent(event);
};

// 当前动态详情
const moment = reactive({
  id: 0,
  author: "",
  avatar: "",
  content: "",
  tags: "",
  time: "",
  images: [],
  likes: 0,
  comments: 0,
  shares: 0,
  bookmarks: 0,
  isLiked: false,
  isBookmarked: false
});

// 用户评论
const newComment = ref("");
const commentsList = ref([]);

// 模拟加载动态详情数据
const loadMomentDetail = () => {
  // 在实际应用中，应该从API获取数据
  // 这里使用模拟数据
  
  // 从localStorage加载用户信息用于评论
  let userAvatar = "https://kiripet.tos-cn-beijing.volces.com/image/a1.png";
  let userName = "[勢いにまかせて！]鬼塚夏美";
  
  const savedUserData = localStorage.getItem("userData");
  if (savedUserData) {
    try {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.userProfile) {
        const { firstName, lastName, avatar } = parsedData.userProfile;
        userName = `${firstName}${lastName}`;
        userAvatar = avatar || userAvatar;
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }
  
  // 模拟数据
  const momentData = {
    1: {
      id: 1,
      author: "鬼塚夏美",
      avatar: "https://kiripet.tos-cn-beijing.volces.com/image/a1.png",
      content: "分享我家可爱的小猫咪，他们真的很可爱！！",
      tags: "#布偶猫 #可爱猫咪",
      time: "2小时前",
      images: Array(9).fill("https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"),
      likes: 1234,
      comments: 89,
      shares: 46,
      bookmarks: 328,
      isLiked: false,
      isBookmarked: false,
      commentsList: [
        {
          id: 101,
          author: "爱猫人士",
          avatar: "https://kiripet.tos-cn-beijing.volces.com/image/a2.png",
          content: "好可爱的猫咪，是什么品种的？",
          time: "1小时前",
          likes: 12
        },
        {
          id: 102,
          author: "喵星人",
          avatar: "https://kiripet.tos-cn-beijing.volces.com/image/a3.png",
          content: "太可爱了！我也想养一只！",
          time: "30分钟前",
          likes: 8
        }
      ]
    },
    2: {
      id: 2,
      author: "鬼塚夏美",
      avatar: "https://kiripet.tos-cn-beijing.volces.com/image/a1.png",
      content: "今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。",
      tags: "#宠物大会",
      time: "昨天",
      images: [],
      likes: 876,
      comments: 54,
      shares: 23,
      bookmarks: 159,
      isLiked: false,
      isBookmarked: false,
      commentsList: [
        {
          id: 201,
          author: "宠物爱好者",
          avatar: "https://kiripet.tos-cn-beijing.volces.com/image/a4.png",
          content: "期待你的文章！",
          time: "昨天",
          likes: 5
        }
      ]
    }
  };
  
  // 更新动态数据
  const currentMoment = momentData[momentId];
  if (currentMoment) {
    Object.assign(moment, currentMoment);
    commentsList.value = currentMoment.commentsList || [];
  } else {
    // 如果找不到对应动态，返回列表页
    showNotification("未找到该动态", "error");
    router.push("/user/11111111");
  }
};

// 切换点赞状态
const toggleLike = () => {
  if (moment.isLiked) {
    moment.likes--;
  } else {
    moment.likes++;
  }
  moment.isLiked = !moment.isLiked;
};

// 切换收藏状态
const toggleBookmark = () => {
  if (moment.isBookmarked) {
    moment.bookmarks--;
  } else {
    moment.bookmarks++;
  }
  moment.isBookmarked = !moment.isBookmarked;
};

// 提交评论
const submitComment = () => {
  if (!newComment.value.trim()) {
    showNotification("评论内容不能为空", "warning");
    return;
  }
  
  // 获取用户信息
  let userAvatar = "https://kiripet.tos-cn-beijing.volces.com/image/a1.png";
  let userName = "[勢いにまかせて！]鬼塚夏美";
  
  const savedUserData = localStorage.getItem("userData");
  if (savedUserData) {
    try {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.userProfile) {
        const { firstName, lastName, avatar } = parsedData.userProfile;
        userName = `${firstName}${lastName}`;
        userAvatar = avatar || userAvatar;
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }
  
  // 创建新评论
  const comment = {
    id: Date.now(),
    author: userName,
    avatar: userAvatar,
    content: newComment.value,
    time: "刚刚",
    likes: 0
  };
  
  // 添加到评论列表
  commentsList.value.unshift(comment);
  moment.comments++;
  
  // 清空输入框
  newComment.value = "";
  
  // 显示成功提示
  showNotification("评论发布成功", "success");
};

// 返回上一页
const goBack = () => {
  router.go(-1);
};

// 在组件挂载时加载数据
onMounted(() => {
  loadMomentDetail();
});
</script>

<template>
  <HomeHeader />
  <Notification />
  
  <div class="moment-detail-container">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <span class="material-icons-sharp">arrow_back</span>
      <span>返回</span>
    </div>
    
    <div class="moment-detail-card">
      <!-- 顶部区域：用户信息 -->
      <div class="moment-header">
        <img class="moment-avatar" :src="moment.avatar" alt="用户头像" />
        <div class="moment-info">
          <div class="moment-name">{{ moment.author }}</div>
          <div class="moment-time">{{ moment.time }}</div>
        </div>
      </div>
      
      <!-- 中间区域：内容 -->
      <div class="moment-content">
        <p>{{ moment.content }}</p>
        <div class="moment-tag">{{ moment.tags }}</div>
        
        <!-- 图片区域 -->
        <div class="moment-images" v-if="moment.images && moment.images.length > 0">
          <img 
            v-for="(image, index) in moment.images" 
            :key="index" 
            :src="image" 
            alt="动态图片" 
            class="moment-image"
          />
        </div>
      </div>
      
      <!-- 底部区域：互动数据 -->
      <div class="moment-actions">
        <div class="action-item" @click="toggleLike">
          <i :class="[moment.isLiked ? 'fas fa-heart liked' : 'far fa-heart']"></i>
          <span>{{ moment.likes }}</span>
        </div>
        <div class="action-item">
          <i class="far fa-comment"></i>
          <span>{{ moment.comments }}</span>
        </div>
        <div class="action-item" @click="toggleBookmark">
          <i :class="[moment.isBookmarked ? 'fas fa-star bookmarked' : 'far fa-star']"></i>
          <span>{{ moment.bookmarks }}</span>
        </div>
        <div class="action-item">
          <i class="far fa-share-square"></i>
          <span>{{ moment.shares }}</span>
        </div>
      </div>
    </div>
    
    <!-- 评论区域 -->
    <div class="comments-section">
      <h3>评论 ({{ moment.comments }})</h3>
      
      <!-- 发表评论 -->
      <div class="comment-form">
        <textarea 
          v-model="newComment"
          placeholder="发表你的评论..."
          rows="3"
        ></textarea>
        <button @click="submitComment">发布</button>
      </div>
      
      <!-- 评论列表 -->
      <div class="comments-list">
        <div v-for="comment in commentsList" :key="comment.id" class="comment-item">
          <img :src="comment.avatar" alt="用户头像" class="comment-avatar" />
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-actions">
              <div class="action-item">
                <i class="far fa-heart"></i>
                <span>{{ comment.likes }}</span>
              </div>
              <div class="action-item">
                <i class="far fa-comment"></i>
                <span>回复</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <HomeFooter />
</template>

<style scoped>
.moment-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 20px;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #f0f0f0;
}

.moment-detail-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
}

/* 顶部区域：用户信息 */
.moment-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.moment-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.moment-info {
  display: flex;
  flex-direction: column;
}

.moment-name {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 4px;
}

.moment-time {
  font-size: 14px;
  color: #888;
}

/* 中间区域：内容 */
.moment-content {
  margin-bottom: 24px;
}

.moment-content p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.moment-tag {
  color: var(--deongaree);
  margin-bottom: 16px;
}

.moment-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 15px;
  margin-bottom: 16px;
}

.moment-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.moment-image:hover {
  transform: scale(1.02);
}

/* 底部区域：互动数据 */
.moment-actions {
  display: flex;
  gap: 32px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #73767a;
  cursor: pointer;
  transition: color 0.3s ease;
}

.action-item:hover {
  color: var(--danger);
}

.action-item .liked {
  color: var(--danger);
}

.action-item .bookmarked {
  color: var(--youth-green-2);
}

/* 评论区域 */
.comments-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.comments-section h3 {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
}

.comment-form {
  margin-bottom: 24px;
  position: relative;
}

.comment-form textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
  transition: border-color 0.3s;
}

.comment-form textarea:focus {
  outline: none;
  border-color: var(--deongaree);
}

.comment-form button {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: var(--deongaree);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.comment-form button:hover {
  background-color: #4a58e5;
}

/* 评论列表 */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  display: flex;
  gap: 16px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.comment-author {
  font-weight: 600;
  font-size: 14px;
}

.comment-time {
  font-size: 12px;
  color: #888;
}

.comment-text {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.5;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.comment-actions .action-item {
  font-size: 12px;
}

@media (max-width: 768px) {
  .moment-detail-container {
    padding: 15px;
  }
  
  .moment-images {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .comment-avatar {
    width: 32px;
    height: 32px;
  }
}
</style> 