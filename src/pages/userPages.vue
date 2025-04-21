<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "@/components/Home/HomeFooter.vue";
import Notification from "@/components/Notify/notification.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, onMounted, watchEffect } from "vue";

const router = useRouter();
const route = useRoute();

// 分享主页
const shareLink = ref('');

const shareProfile = () => {
  // 获取用户资料中的ID
  const userId = document.querySelector('.profile-id').textContent.split(':')[1].trim();
  shareLink.value = `${window.location.origin}/user/${userId}`;
  
  // 复制到剪贴板
  navigator.clipboard.writeText(shareLink.value).then(() => {
    // 显示通知
    showNotification(`分享链接已复制：${shareLink.value}`, 'success');
  }).catch(err => {
    console.error('无法复制链接: ', err);
    showNotification('链接复制失败，请重试', 'error');
  });
};

// 显示通知的方法
const showNotification = (message, type = 'info') => {
  const event = new CustomEvent('show-notification', {
    detail: { message, type }
  });
  document.dispatchEvent(event);
};

// 用于存储动态的数据，包括点赞和收藏状态
const moments = ref([
  {
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
    isBookmarked: false
  },
  {
    id: 2,
    author: "鬼塚夏美",
    avatar: "https://kiripet.tos-cn-beijing.volces.com/image/a1.png",
    content: "今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。",
    tags: "#宠物大会",
    time: "昨天",
    images: [],
    likes: 876,
    comments: 54,
    shares: 23,
    bookmarks: 159,
    isLiked: false,
    isBookmarked: false
  }
]);

// 切换点赞状态
const toggleLike = (momentId) => {
  const moment = moments.value.find(m => m.id === momentId);
  if (moment) {
    if (moment.isLiked) {
      moment.likes--;
    } else {
      moment.likes++;
    }
    moment.isLiked = !moment.isLiked;
  }
};

// 切换收藏状态
const toggleBookmark = (momentId) => {
  const moment = moments.value.find(m => m.id === momentId);
  if (moment) {
    if (moment.isBookmarked) {
      moment.bookmarks--;
    } else {
      moment.bookmarks++;
    }
    moment.isBookmarked = !moment.isBookmarked;
  }
};

// 当前活动的标签页
const activeTab = ref("posts");

// 事项相关状态
const showReminderModal = ref(false);
const isEditing = ref(false);
const currentReminderIndex = ref(-1);
const showActionMenu = ref(false);
const actionMenuPosition = reactive({ top: 0, left: 0 });
const selectedReminderId = ref(null);

const newReminder = reactive({
  title: '',
  time: '',
  icon: 'notifications_active',
  active: false
});

// 事项列表
const reminders = ref([
  {
    id: 1,
    title: "给王美丽回电话",
    time: "09:00 AM",
    icon: "volume_up",
    active: true
  },
  {
    id: 2,
    title: "增删改查",
    time: "08:00 AM - 12:00 PM",
    icon: "edit",
    active: false
  }
]);

// 打开事项创建弹窗
const openReminderModal = (editMode = false, reminder = null) => {
  isEditing.value = editMode;
  
  if (editMode && reminder) {
    newReminder.title = reminder.title;
    newReminder.time = reminder.time;
    newReminder.icon = reminder.icon;
    newReminder.active = reminder.active;
    currentReminderIndex.value = reminders.value.findIndex(r => r.id === reminder.id);
  } else {
    newReminder.title = '';
    newReminder.time = '';
    newReminder.icon = 'notifications_active';
    newReminder.active = false;
  }
  
  showReminderModal.value = true;
};

// 添加或更新事项
const saveReminder = () => {
  if (newReminder.title.trim() && newReminder.time.trim()) {
    if (isEditing.value && currentReminderIndex.value !== -1) {
      // 更新已有事项
      reminders.value[currentReminderIndex.value] = {
        ...reminders.value[currentReminderIndex.value],
        title: newReminder.title,
        time: newReminder.time,
        icon: newReminder.icon,
        active: newReminder.active
      };
      showNotification("事项已更新", "success");
    } else {
      // 添加新事项
      const reminder = {
        id: Date.now(),
        title: newReminder.title,
        time: newReminder.time,
        icon: newReminder.icon,
        active: false
      };
      
      reminders.value.push(reminder);
      showNotification("事项已添加", "success");
    }
    
    showReminderModal.value = false;
    closeActionMenu();
  }
};

// 关闭弹窗
const closeReminderModal = () => {
  showReminderModal.value = false;
  isEditing.value = false;
  currentReminderIndex.value = -1;
};

// 选择图标
const iconOptions = [
  'notifications_active',
  'alarm',
  'event',
  'task_alt',
  'schedule',
  'event_note',
  'volume_up',
  'edit',
  'pets',
  'favorite'
];

// 显示操作菜单
const showReminderActions = (e, reminder) => {
  e.stopPropagation();
  
  // 计算菜单位置
  const rect = e.target.getBoundingClientRect();
  actionMenuPosition.top = rect.bottom + window.scrollY + 'px';
  actionMenuPosition.left = (rect.left - 100) + window.scrollX + 'px';
  
  selectedReminderId.value = reminder.id;
  showActionMenu.value = true;
};

// 关闭操作菜单
const closeActionMenu = () => {
  showActionMenu.value = false;
  selectedReminderId.value = null;
};

// 删除事项
const deleteReminder = () => {
  if (selectedReminderId.value) {
    const index = reminders.value.findIndex(r => r.id === selectedReminderId.value);
    if (index !== -1) {
      reminders.value.splice(index, 1);
    }
  }
  closeActionMenu();
};

// 编辑事项
const editReminder = () => {
  if (selectedReminderId.value) {
    const reminder = reminders.value.find(r => r.id === selectedReminderId.value);
    if (reminder) {
      openReminderModal(true, reminder);
    }
  }
  closeActionMenu();
};

// 切换事项状态
const toggleReminderStatus = () => {
  if (selectedReminderId.value) {
    const index = reminders.value.findIndex(r => r.id === selectedReminderId.value);
    if (index !== -1) {
      reminders.value[index].active = !reminders.value[index].active;
    }
  }
  closeActionMenu();
};

// 点击外部关闭操作菜单
const handleClickOutside = (e) => {
  if (showActionMenu.value) {
    closeActionMenu();
  }
};

// 默认用户信息，当没有保存过用户信息时使用
const defaultUserName = "[勢いにまかせて！]鬼塚夏美";
const defaultBio = "资深宠物爱好者";
const defaultAvatar = "https://kiripet.tos-cn-beijing.volces.com/image/a1.png";
const defaultBgImage = "@/assets/image/08.jpg";

// 用户背景图片样式
const profileHeaderStyle = ref({
  background: `linear-gradient(rgba(70, 67, 67, 0.5), rgba(63, 60, 60, 0.5)), url(${defaultBgImage}) no-repeat center/cover`
});

// 用户信息
const userInfo = reactive({
  fullName: defaultUserName,
  bio: defaultBio,
  avatar: defaultAvatar
});

// 加载用户数据
const loadUserData = () => {
  const savedUserData = localStorage.getItem('userData');
  if (savedUserData) {
    try {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.userProfile) {
        const { firstName, lastName, bio, avatar, background } = parsedData.userProfile;
        
        // 更新用户信息
        userInfo.fullName = `${firstName}${lastName}`;
        userInfo.bio = bio || defaultBio;
        userInfo.avatar = avatar || defaultAvatar;
        
        // 更新背景图片
        if (background) {
          profileHeaderStyle.value.background = `linear-gradient(rgba(70, 67, 67, 0.5), rgba(63, 60, 60, 0.5)), url(${background}) no-repeat center/cover`;
        }
        
        // 更新动态中的用户信息
        moments.value.forEach(moment => {
          moment.author = `${firstName}${lastName}`;
          moment.avatar = avatar || defaultAvatar;
        });
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
    }
  }
};

onMounted(() => {
  loadUserData();
  
  // 如果是从编辑页面返回，显示提示信息
  if (route.query.fromEdit === 'true') {
    showNotification('个人资料已更新', 'success');
  }
});

// 监听从编辑页面返回
watchEffect(() => {
  if (route.query.fromEdit === 'true') {
    loadUserData();
    showNotification('个人资料已更新', 'success');
  }
});

// 修改动态点击事件，添加导航到详情页的功能
const navigateToMomentDetail = (momentId) => {
  router.push(`/moment/${momentId}`);
};
</script>

<template>
  <HomeHeader></HomeHeader>
  <Notification />
  <div class="user-container" @click="handleClickOutside">
    <div class="main-container">
      <!-- 个人信息头部 -->
      <div class="profile-header" :style="profileHeaderStyle">
        <div class="profile-main">
          <div class="avatar-section">
            <img
              class="avatar"
              :src="userInfo.avatar"
            />
          </div>
          <div class="profile-info">
            <h1 class="profile-name">
              {{ userInfo.fullName }}
              <svg
                t="1730014560457"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2358"
                width="25"
                height="25"
              >
                <path
                  d="M956.672 459.776L862.72 397.568c-16.64-11.008-24.832-30.976-20.992-50.688l22.272-110.592c4.096-20.736-2.304-42.24-17.152-57.344-15.104-15.104-36.352-21.504-57.344-17.152l-110.592 22.272c-19.712 4.096-39.424-4.352-50.688-20.992L565.76 69.12c-11.776-17.664-31.488-28.16-52.736-28.16s-40.96 10.496-52.736 28.16l-62.464 93.952c-11.008 16.64-30.976 24.832-50.688 20.992l-110.592-22.272c-20.736-4.096-42.24 2.304-57.344 17.152-15.104 15.104-21.504 36.352-17.152 57.344l22.272 110.592c3.84 19.712-4.352 39.424-20.992 50.688l-93.952 62.464c-17.664 11.776-28.16 31.488-28.16 52.736s10.496 40.96 28.16 52.736l93.952 62.464c16.64 11.008 24.832 30.976 20.992 50.688l-22.272 110.592c-4.096 20.736 2.304 42.24 17.152 57.344 15.104 15.104 36.352 21.504 57.344 17.152l110.592-22.272c19.712-4.096 39.424 4.352 50.688 20.992l62.464 93.952c11.776 17.664 31.488 28.16 52.736 28.16s40.96-10.496 52.736-28.16l62.464-93.952c11.008-16.64 30.976-24.832 50.688-20.992l110.592 22.272c20.736 4.096 42.24-2.304 57.344-17.152 15.104-15.104 21.504-36.352 17.152-57.344l-22.272-110.592c-3.84-19.712 4.352-39.424 20.992-50.688l93.952-62.464c17.664-11.776 28.16-31.488 28.16-52.736s-10.496-41.216-28.16-52.992z m-249.344-22.016l-211.456 215.04c-5.888 6.144-13.824 9.216-22.016 9.216-7.168 0-14.592-2.56-20.224-7.68l-138.24-122.112c-12.8-11.264-13.824-30.72-2.816-43.264 11.264-12.8 30.72-13.824 43.264-2.816l116.48 102.912 190.976-194.304c11.776-12.032 31.232-12.288 43.52-0.256 12.288 11.52 12.288 30.976 0.512 43.264z"
                  fill="#8b98e4"
                  p-id="2359"
                ></path>
              </svg>
            </h1>
            <div class="profile-stats">
              <div class="stat-item">
                <div class="stat-number">
                  1,354 <span class="stat-label">关注</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-number">
                  18.2w <span class="stat-label">粉丝</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-number">
                  152.3w <span class="stat-label">获赞</span>
                </div>
              </div>
            </div>
            <div class="profile-id">uid: 11111111</div>
            <div class="profile-tag"><span>简介：</span>{{ userInfo.bio }}</div>
            <div class="action-buttons">
              <button class="btn btn-primary" @click="router.push('/userinfo')">
                编辑资料
              </button>
              <button class="btn btn-secondary" @click="shareProfile">分享主页</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-section">
        <div class="tabs">
          <div 
            class="tab" 
            :class="{ active: activeTab === 'posts' }"
            @click="activeTab = 'posts'"
          >我的动态</div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'likes' }"
            @click="activeTab = 'likes'"
          >
            喜欢 <i class="fa-regular fa-heart"></i>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'bookmarks' }"
            @click="activeTab = 'bookmarks'"
          >收藏 <i class="fa-regular fa-star"></i></div>
        </div>
        <div class="moments-container">
          <!-- 动态项目 -->
          <div v-for="moment in moments" :key="moment.id" class="moment-item" @click="navigateToMomentDetail(moment.id)">
            <div class="moment-header">
              <img
                class="moment-avatar"
                :src="moment.avatar"
                alt="头像"
              />
              <div class="moment-info">
                <div class="moment-name">{{ moment.author }}</div>
                <div class="moment-time">{{ moment.time }}</div>
              </div>
            </div>
            <div class="moment-content">
              {{ moment.content }}
              <div class="moment-tag">{{ moment.tags }}</div>
            </div>
            <div class="moment-images" v-if="moment.images.length > 0">
              <img
                v-for="(image, index) in moment.images"
                :key="index"
                class="moment-image"
                :src="image"
                alt="动态图片"
              />
            </div>
            <div class="moment-actions" @click.stop>
              <div class="action-item" @click="toggleLike(moment.id)">
                <i :class="[moment.isLiked ? 'fas fa-heart liked' : 'far fa-heart']"></i>
                <span>{{ moment.likes }}</span>
              </div>
              <div class="action-item">
                <i class="far fa-comment"></i>
                <span>{{ moment.comments }}</span>
              </div>
              <div class="action-item" @click="toggleBookmark(moment.id)">
                <i :class="[moment.isBookmarked ? 'fas fa-star bookmarked' : 'far fa-star']"></i>
                <span>{{ moment.bookmarks }}</span>
              </div>
              <div class="action-item">
                <i class="far fa-share-square"></i>
                <span>{{ moment.shares }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 侧边栏 -->
    <div class="sidebar-container">
      <div class="siderbar-top">
        <div class="container">
          <div class="coffee-header">
            <div class="coffee-header__buttons coffee-header__button-one"></div>
            <div class="coffee-header__buttons coffee-header__button-two"></div>
            <div class="coffee-header__display"></div>
            <div class="coffee-header__details"></div>
          </div>
          <div class="coffee-medium">
            <div class="coffe-medium__exit"></div>
            <div class="coffee-medium__arm"></div>
            <div class="coffee-medium__liquid"></div>
            <div class="coffee-medium__smoke coffee-medium__smoke-one"></div>
            <div class="coffee-medium__smoke coffee-medium__smoke-two"></div>
            <div class="coffee-medium__smoke coffee-medium__smoke-three"></div>
            <div class="coffee-medium__smoke coffee-medium__smoke-for"></div>
            <div class="coffee-medium__cup"></div>
          </div>
          <div class="coffee-footer"></div>
        </div>
      </div>
      <div class="siderbar-sub">
        <div class="sidersub-header">
          <h2>注意事项</h2>
          <span class="material-icons-sharp"> notifications_none </span>
        </div>

        <!-- 事项列表 -->
        <div v-for="reminder in reminders" :key="reminder.id" 
             :class="['notification', {'deactive': !reminder.active}]">
          <div class="icon">
            <span class="material-icons-sharp"> {{ reminder.icon }} </span>
          </div>
          <div class="content">
            <div class="info">
              <h3>{{ reminder.title }}</h3>
              <small class="text_muted"> {{ reminder.time }}</small>
            </div>
            <span class="material-icons-sharp action-menu-trigger" @click="showReminderActions($event, reminder)"> more_vert </span>
          </div>
        </div>

        <div class="notification add-reminder" @click="openReminderModal()">
          <div class="add">
            <span class="material-icons-sharp"> add </span>
            <h3>新增事项</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 操作菜单 -->
  <div class="action-menu" v-if="showActionMenu" :style="{ top: actionMenuPosition.top, left: actionMenuPosition.left }">
    <div class="action-item" @click="editReminder">
      <span class="material-icons-sharp">edit</span>
      <span>编辑事项</span>
    </div>
    <div class="action-item" @click="toggleReminderStatus">
      <span class="material-icons-sharp">{{ reminders.find(r => r.id === selectedReminderId)?.active ? 'clear' : 'check_circle' }}</span>
      <span>{{ reminders.find(r => r.id === selectedReminderId)?.active ? '标记为未完成' : '标记为已完成' }}</span>
    </div>
    <div class="action-item delete" @click="deleteReminder">
      <span class="material-icons-sharp">delete</span>
      <span>删除事项</span>
    </div>
  </div>
  
  <!-- 新增/编辑事项弹窗 -->
  <div class="modal-backdrop" v-if="showReminderModal" @click="closeReminderModal"></div>
  <div class="reminder-modal" v-if="showReminderModal">
    <div class="modal-header">
      <h2>{{ isEditing ? '编辑事项' : '新增事项' }}</h2>
      <span class="material-icons-sharp close-icon" @click="closeReminderModal">close</span>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label for="reminder-title">事项标题</label>
        <input 
          type="text" 
          id="reminder-title" 
          v-model="newReminder.title" 
          placeholder="请输入事项标题"
          required
        >
      </div>
      <div class="form-group">
        <label for="reminder-time">时间</label>
        <input 
          type="text" 
          id="reminder-time" 
          v-model="newReminder.time" 
          placeholder="例如：09:00 AM"
          required
        >
      </div>
      <div class="form-group">
        <label>图标选择</label>
        <div class="icon-selector">
          <div 
            v-for="icon in iconOptions" 
            :key="icon" 
            :class="['icon-option', {'selected': newReminder.icon === icon}]"
            @click="newReminder.icon = icon"
          >
            <span class="material-icons-sharp">{{ icon }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-cancel" @click="closeReminderModal">取消</button>
      <button class="btn-submit" @click="saveReminder">{{ isEditing ? '保存' : '添加' }}</button>
    </div>
  </div>
  
  <HomeFooter></HomeFooter>
</template>

<style scoped>
.user-container {
  width: 76%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}

.main-container {
  width: 60%;
}

.profile-header {
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.profile-main {
  display: flex;
  gap: 24px;
}

.avatar-section {
  position: relative;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--deongaree);
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  transform: rotate(3600deg);
}

.profile-info {
  position: relative;
  flex: 1;
}

.profile-name {
  font-size: 24px;
  font-weight: var(--fw-700);
  margin-bottom: 8px;
  display: flex;
  color: #fff;
  align-items: center;
  gap: 8px;
}

.profile-id {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.profile-stats {
  display: flex;
  gap: 48px;
  margin-bottom: 10px;
}

.stat-item {
  color: #fff;
  cursor: pointer;
}

.stat-number {
  font-weight: 600;
  font-size: 18px;
}

.stat-label {
  color: #bec6d1;
  font-size: 14px;
  font-weight: var(--fw-500);
}

.profile-tag {
  font-size: var(--fs-14);
  font-weight: var(--fw-500);
  color: #fff;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btn {
  padding: 8px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--deongaree);
  color: white;
  border: none;
}

.btn-secondary {
  background: transparent;
  border: 1px solid #e6e6e6;
  color: #fff;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  transition: var(--transition-1);
}

/* 内容区域 */
.content-section {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tabs {
  display: flex;
  /* border-bottom: 1px solid #c5a8a8; */
  padding: 0 20px;
}

.tab {
  padding: 16px 32px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  color: #73767a;
  transition: color 0.3s ease;
}

.tab.active {
  color: var(--deongaree);
}

.tab.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--deongaree);
}

/* 动态内容 */
.moments-container {
  padding: 20px;
}

.moment-item {
  padding: 20px;
  /* border-bottom: 1px solid #c5a8a8; */
  border-radius: var(--radius-8);
  box-shadow: 0 1px 1px #e8eaec;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.moment-item:hover {
  background-color: #fafafa;
}

.moment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.moment-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}

.moment-info {
  flex: 1;
}

.moment-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.moment-time {
  font-size: 12px;
  color: var(--light-gray);
}

.moment-content {
  margin-bottom: 16px;
  font-size: 15px;
  line-height: 1.6;
}

.moment-tag {
  color: var(--deongaree);
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
  /* background-color: #e21b1b; */
  transition: transform 0.3s ease;
}

.moment-image:hover {
  transform: scale(1.02);
}

.moment-actions {
  display: flex;
  gap: 32px;
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

.sidebar-container {
  width: 30%;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 2fr;
  gap: 10px;
}

.siderbar-top {
  /* background-color: #6c9bcf; */
  box-shadow: var(--shadow-2);
  border-radius: var(--radius-10);
  position: relative;
}

.container {
  width: 300px;
  height: 280px;
  position: absolute;
  top: calc(50% - 140px);
  left: calc(50% - 150px);
}

.coffee-header {
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ddcfcc;
  border-radius: 10px;
}

.coffee-header__buttons {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 25px;
  background-color: #282323;
  border-radius: 50%;
}

.coffee-header__buttons::after {
  content: "";
  width: 8px;
  height: 8px;
  position: absolute;
  bottom: -8px;
  left: calc(50% - 4px);
  background-color: #615e5e;
}

.coffee-header__button-one {
  left: 15px;
}

.coffee-header__button-two {
  left: 50px;
}

.coffee-header__display {
  width: 50px;
  height: 50px;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  border-radius: 50%;
  background-color: #9acfc5;
  border: 5px solid #43beae;
  box-sizing: border-box;
}

.coffee-header__details {
  width: 8px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #9b9091;
  box-shadow: -12px 0 0 #9b9091, -24px 0 0 #9b9091;
}

.coffee-medium {
  width: 90%;
  height: 160px;
  position: absolute;
  top: 80px;
  left: calc(50% - 45%);
  background-color: #bcb0af;
}

.coffee-medium:before {
  content: "";
  width: 90%;
  height: 100px;
  background-color: #776f6e;
  position: absolute;
  bottom: 0;
  left: calc(50% - 45%);
  border-radius: 20px 20px 0 0;
}

.coffe-medium__exit {
  width: 60px;
  height: 20px;
  position: absolute;
  top: 0;
  left: calc(50% - 30px);
  background-color: #231f20;
}

.coffe-medium__exit::before {
  content: "";
  width: 50px;
  height: 20px;
  border-radius: 0 0 50% 50%;
  position: absolute;
  bottom: -20px;
  left: calc(50% - 25px);
  background-color: #231f20;
}

.coffe-medium__exit::after {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: -30px;
  left: calc(50% - 5px);
  background-color: #231f20;
}

.coffee-medium__arm {
  width: 70px;
  height: 20px;
  position: absolute;
  top: 15px;
  right: 25px;
  background-color: #231f20;
}

.coffee-medium__arm::before {
  content: "";
  width: 15px;
  height: 5px;
  position: absolute;
  top: 7px;
  left: -15px;
  background-color: #9e9495;
}

.coffee-medium__cup {
  width: 80px;
  height: 47px;
  position: absolute;
  bottom: 0;
  left: calc(50% - 40px);
  background-color: #fff;
  border-radius: 0 0 70px 70px / 0 0 110px 110px;
}

.coffee-medium__cup::after {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  top: 6px;
  right: -13px;
  border: 5px solid #fff;
  border-radius: 50%;
}

@keyframes liquid {
  0% {
    height: 0px;
    opacity: 1;
  }
  5% {
    height: 0px;
    opacity: 1;
  }
  20% {
    height: 62px;
    opacity: 1;
  }
  95% {
    height: 62px;
    opacity: 1;
  }
  100% {
    height: 62px;
    opacity: 0;
  }
}

.coffee-medium__liquid {
  width: 6px;
  height: 63px;
  opacity: 0;
  position: absolute;
  top: 50px;
  left: calc(50% - 3px);
  background-color: #74372b;
  animation: liquid 4s 4s linear infinite;
}

.coffee-medium__smoke {
  width: 8px;
  height: 20px;
  position: absolute;
  border-radius: 5px;
  background-color: #b3aeae;
}

@keyframes smokeOne {
  0% {
    bottom: 20px;
    opacity: 0;
  }
  40% {
    bottom: 50px;
    opacity: 0.5;
  }
  80% {
    bottom: 80px;
    opacity: 0.3;
  }
  100% {
    bottom: 80px;
    opacity: 0;
  }
}

@keyframes smokeTwo {
  0% {
    bottom: 40px;
    opacity: 0;
  }
  40% {
    bottom: 70px;
    opacity: 0.5;
  }
  80% {
    bottom: 80px;
    opacity: 0.3;
  }
  100% {
    bottom: 80px;
    opacity: 0;
  }
}

.coffee-medium__smoke-one {
  opacity: 0;
  bottom: 50px;
  left: 102px;
  animation: smokeOne 3s 4s linear infinite;
}

.coffee-medium__smoke-two {
  opacity: 0;
  bottom: 70px;
  left: 118px;
  animation: smokeTwo 3s 5s linear infinite;
}

.coffee-medium__smoke-three {
  opacity: 0;
  bottom: 65px;
  right: 118px;
  animation: smokeTwo 3s 6s linear infinite;
}

.coffee-medium__smoke-for {
  opacity: 0;
  bottom: 50px;
  right: 102px;
  animation: smokeOne 3s 5s linear infinite;
}

.coffee-footer {
  width: 95%;
  height: 15px;
  position: absolute;
  bottom: 25px;
  left: calc(50% - 47.5%);
  background-color: #41bdad;
  border-radius: 10px;
}

.coffee-footer::after {
  content: "";
  width: 106%;
  height: 26px;
  position: absolute;
  bottom: -25px;
  left: -8px;
  background-color: #000;
}

.siderbar-sub {
  box-shadow: var(--shadow-2);
  padding: 15px;
  border-radius: var(--radius-10);
}

.siderbar-sub .sidersub-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  cursor: pointer;
}

.sidersub-header span {
  padding: 10px;
  box-shadow: var(--shadow-1);
  border-radius: 50%;
}

.sidersub-header span:hover {
  color: #fff;
  background-color: var(--danger);
  animation: bellRing 0.9s both;
}

/* 摇晃动画 */
@keyframes bellRing {
  0%,
  100% {
    transform-origin: top;
  }

  15% {
    transform: rotateZ(10deg);
  }

  30% {
    transform: rotateZ(-10deg);
  }

  45% {
    transform: rotateZ(5deg);
  }

  60% {
    transform: rotateZ(-5deg);
  }

  75% {
    transform: rotateZ(2deg);
  }
}

.notification {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 11px;
  padding: 22px 25px;
  border-radius: 10px;
  box-shadow: var(--shadow-5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.notification:hover {
  box-shadow: none;
}

.notification .content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  width: 100%;
}

.notification .icon {
  padding: 10px;
  color: #ffff;
  background-color: var(--success);
  border-radius: 20%;
  display: flex;
}

.notification.deactive .icon {
  background-color: var(--danger);
}

.notification .content span:hover {
  color: var(--info-dark);
}

.add-reminder {
  background-color: #fff;
  border: 2px dashed var(--youth-blue-purple);
  color: var(--youth-blue-purple);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.add-reminder:hover {
  background-color: #6c9bcf;
  color: white;
  border: none;
}

.add-reminder .add {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 弹窗样式 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reminder-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f1f1f1;
}

.modal-header h2 {
  margin: 0;
  color: var(--deongaree);
  font-size: 1.3rem;
}

.close-icon {
  cursor: pointer;
  color: #777;
  transition: color 0.2s;
}

.close-icon:hover {
  color: var(--danger);
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input[type="text"] {
  width: 90%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input[type="text"]:focus {
  border-color: var(--deongaree);
  outline: none;
}

.icon-selector {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.icon-option {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #f5f5f5;
}

.icon-option:hover {
  background-color: #e8e8e8;
}

.icon-option.selected {
  background-color: var(--deongaree);
  color: white;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 15px 20px;
  border-top: 1px solid #f1f1f1;
  gap: 10px;
}

.btn-cancel, .btn-submit {
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-cancel {
  background-color: #f1f1f1;
  color: #555;
  border: none;
}

.btn-submit {
  background-color: var(--deongaree);
  color: white;
  border: none;
}

.btn-cancel:hover {
  background-color: #e5e5e5;
}

.btn-submit:hover {
  background-color: #4a58e5;
}

/* 操作菜单样式 */
.action-menu {
  position: absolute;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
  width: 180px;
}

.action-menu .action-item {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-menu .action-item:hover {
  background-color: #f5f5f5;
}

.action-menu .action-item.delete {
  color: var(--danger);
}

.action-menu .action-item.delete:hover {
  background-color: rgba(220, 53, 69, 0.1);
}

.action-menu-trigger {
  cursor: pointer;
}

@media (max-width: 768px) {
  .profile-main {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-stats {
    justify-content: center;
  }

  .action-buttons {
    justify-content: center;
  }

  .tabs {
    overflow-x: auto;
    white-space: nowrap;
  }

  .moment-images {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .profile-stats {
    gap: 24px;
  }

  .tab {
    padding: 12px 16px;
  }

  .moment-actions {
    gap: 16px;
  }
}

/* 删除分享提示样式 */
.share-toast {
  display: none;
}
</style>
