<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Notification from "@/components/Notify/notification.vue";

const router = useRouter();
const fileInput = ref(null);
const bgFileInput = ref(null);

// Original user data (simulating data loaded from API/database)
const originalUserProfile = ref({});
const originalPreferences = ref({});
const originalSocialLinks = ref({});

// Current editable user data
const userProfile = reactive({
  firstName: "[勢いにまかせて！]",
  lastName: "鬼塚夏美",
  username: "kiripet",
  email: "kiripet@example.com",
  phone: "138****1234",
  bio: "喜欢猫咪和狗狗的爱宠人士，有两只金毛和一只英短",
  birthday: "1990-01-01",
  gender: "女",
  location: "上海市",
  avatar: "https://kiripet.tos-cn-beijing.volces.com/image/a1.png",
  background: "@/assets/image/08.jpg", // 默认背景图片
});

const preferences = reactive({
  language: "中文",
  notifications: true,
  newsletter: false,
  darkMode: false,
});

const socialLinks = reactive({
  wechat: "kiripet123",
  weibo: "kiripet123",
  instagram: "",
  facebook: "",
});

// 显示通知的方法
const showNotification = (message, type = "info") => {
  const event = new CustomEvent("show-notification", {
    detail: { message, type },
  });
  document.dispatchEvent(event);
};

// Store the original values when component mounts
onMounted(() => {
  originalUserProfile.value = JSON.parse(JSON.stringify(userProfile));
  originalPreferences.value = JSON.parse(JSON.stringify(preferences));
  originalSocialLinks.value = JSON.parse(JSON.stringify(socialLinks));

  // 从本地存储获取之前保存的用户数据
  const savedUserData = localStorage.getItem("userData");
  if (savedUserData) {
    const parsedData = JSON.parse(savedUserData);
    if (parsedData.userProfile) {
      Object.assign(userProfile, parsedData.userProfile);
    }
    if (parsedData.preferences) {
      Object.assign(preferences, parsedData.preferences);
    }
    if (parsedData.socialLinks) {
      Object.assign(socialLinks, parsedData.socialLinks);
    }
  }
});

// Check if any changes were made
const hasChanges = computed(() => {
  return (
    !deepEqual(userProfile, originalUserProfile.value) ||
    !deepEqual(preferences, originalPreferences.value) ||
    !deepEqual(socialLinks, originalSocialLinks.value)
  );
});

// Deep equality check helper function
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

// Upload avatar
const uploadAvatar = () => {
  fileInput.value.click();
};

// Handle file selection for avatar
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userProfile.avatar = e.target.result;
      
      // 实时更新localStorage，使头部头像立即生效
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userProfile,
          preferences,
          socialLinks,
        })
      );
      
      // 通知其他页面用户数据已更新
      window.dispatchEvent(new Event("storage"));
    };
    reader.readAsDataURL(file);
  }
};

// Upload background image
const uploadBackground = () => {
  bgFileInput.value.click();
};

// Handle file selection for background image
const handleBgFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userProfile.background = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Toggle notification settings
const toggleNotification = (key) => {
  preferences[key] = !preferences[key];
};

// Save changes and navigate back
const saveChanges = () => {
  if (hasChanges.value) {
    // 保存数据到本地存储以便在不同页面之间共享
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userProfile,
        preferences,
        socialLinks,
      })
    );

    // 更新到后端，这里可以添加API调用
    console.log("Saving changes", { userProfile, preferences, socialLinks });

    // 显示保存成功的通知
    showNotification("保存成功", "success");

    // Update original data to reflect the saved state
    originalUserProfile.value = JSON.parse(JSON.stringify(userProfile));
    originalPreferences.value = JSON.parse(JSON.stringify(preferences));
    originalSocialLinks.value = JSON.parse(JSON.stringify(socialLinks));

    // 短暂延迟后返回用户页面
    setTimeout(() => {
      // Navigate back to profile page
      router.push({ path: "/user/11111111", query: { fromEdit: "true" } });
    }, 1000);
  }
};

// Preview background image (for styling purposes)
const backgroundStyle = computed(() => {
  if (userProfile.background && userProfile.background.startsWith("data:")) {
    return `background: linear-gradient(rgba(70, 67, 67, 0.5), rgba(63, 60, 60, 0.5)), url(${userProfile.background}) no-repeat center/cover;`;
  } else {
    return `background: linear-gradient(rgba(70, 67, 67, 0.5), rgba(63, 60, 60, 0.5)), url(${userProfile.background}) no-repeat center/cover;`;
  }
});

// Go back to profile page
const goBack = () => {
  router.push("/user");
};
</script>

<template>
  <HomeHeader />
  <Notification />
  <div class="workspace-settings-container">
    <div class="settings-header">
      <div class="header-left">
        <button class="back-button" @click="goBack">
          <span class="material-icons-sharp">arrow_back</span> 返回
        </button>
        <h1>个人资料设置</h1>
      </div>
      <button
        class="save-button"
        @click="saveChanges"
        :disabled="!hasChanges"
        :class="{ disabled: !hasChanges }"
      >
        保存更改
      </button>
    </div>

    <!-- Profile Photo Section -->
    <div class="settings-card profile-photo-card">
      <div class="avatar-section">
        <div class="avatar-container">
          <img :src="userProfile.avatar" alt="用户头像" class="user-avatar" />
        </div>
        <div class="avatar-details">
          <h2>个人头像</h2>
          <p>上传一张清晰的照片作为你的个人头像</p>
          <button class="primary-button" @click="uploadAvatar">
            上传新头像
          </button>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            accept="image/*"
            class="hidden-input"
          />
        </div>
      </div>
    </div>

    <!-- Background Image Section -->
    <div class="settings-card background-card">
      <h2 class="section-title">个人主页背景</h2>
      <div class="background-preview" :style="backgroundStyle">
        <div class="background-overlay">
          <button class="primary-button" @click="uploadBackground">
            更换背景图片
          </button>
          <input
            type="file"
            ref="bgFileInput"
            @change="handleBgFileChange"
            accept="image/*"
            class="hidden-input"
          />
        </div>
      </div>
    </div>

    <!-- Basic Info Section -->
    <div class="settings-card">
      <h2 class="section-title">基本信息</h2>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">姓</label>
          <input
            type="text"
            class="form-input"
            v-model="userProfile.lastName"
          />
        </div>

        <div class="form-group">
          <label class="form-label">名</label>
          <input
            type="text"
            class="form-input"
            v-model="userProfile.firstName"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">用户名</label>
          <input
            type="text"
            class="form-input"
            v-model="userProfile.username"
          />
        </div>

        <div class="form-group">
          <label class="form-label">性别</label>
          <div class="select-wrapper">
            <select class="form-select" v-model="userProfile.gender">
              <option value="男">男</option>
              <option value="女">女</option>
              <option value="其他">其他</option>
              <option value="不愿透露">不愿透露</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-row full-width">
        <div class="form-group">
          <label class="form-label">个人简介</label>
          <textarea
            class="form-textarea"
            v-model="userProfile.bio"
            maxlength="200"
          ></textarea>
          <span class="character-count">{{ userProfile.bio.length }}/200</span>
        </div>
      </div>
    </div>

    <!-- Contact Info Section -->
    <div class="settings-card">
      <h2 class="section-title">联系方式</h2>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">电子邮箱</label>
          <input type="email" class="form-input" v-model="userProfile.email" />
        </div>

        <div class="form-group">
          <label class="form-label">手机号码</label>
          <input type="tel" class="form-input" v-model="userProfile.phone" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">生日</label>
          <input
            type="date"
            class="form-input"
            v-model="userProfile.birthday"
          />
        </div>

        <div class="form-group">
          <label class="form-label">所在地</label>
          <input
            type="text"
            class="form-input"
            v-model="userProfile.location"
          />
        </div>
      </div>
    </div>

    <!-- Social Media Section -->
    <div class="settings-card">
      <h2 class="section-title">社交媒体</h2>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">微信</label>
          <input type="text" class="form-input" v-model="socialLinks.wechat" />
        </div>

        <div class="form-group">
          <label class="form-label">微博</label>
          <input type="text" class="form-input" v-model="socialLinks.weibo" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Instagram</label>
          <input
            type="text"
            class="form-input"
            v-model="socialLinks.instagram"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Facebook</label>
          <input
            type="text"
            class="form-input"
            v-model="socialLinks.facebook"
          />
        </div>
      </div>
    </div>

    <!-- Preferences Section -->
    <div class="settings-card">
      <h2 class="section-title">偏好设置</h2>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">语言</label>
          <div class="select-wrapper">
            <select class="form-select" v-model="preferences.language">
              <option value="中文">中文</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>
      </div>

      <div class="preferences-list">
        <div class="preference-row">
          <div class="preference-info">
            <span>接收通知</span>
          </div>
          <div class="toggle-switch">
            <label class="switch">
              <input type="checkbox" v-model="preferences.notifications" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div class="preference-row">
          <div class="preference-info">
            <span>订阅电子邮件</span>
          </div>
          <div class="toggle-switch">
            <label class="switch">
              <input type="checkbox" v-model="preferences.newsletter" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div class="preference-row">
          <div class="preference-info">
            <span>暗黑模式</span>
          </div>
          <div class="toggle-switch">
            <label class="switch">
              <input type="checkbox" v-model="preferences.darkMode" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.workspace-settings-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #666;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  border-radius: 2rem;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #f0f0f0;
}

.back-button .material-icons-sharp {
  font-size: 1.25rem;
  margin-right: 0.25rem;
}

.settings-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
}

.save-button {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s, background-color 0.2s;
}

.save-button:hover:not(.disabled) {
  background-color: #e6e6e6;
}

.save-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.primary-button {
  background-color: #e619e6;
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.hidden-input {
  display: none;
}

.settings-card {
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.avatar-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.avatar-details h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
}

.avatar-details p {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

/* 背景图片预览样式 */
.background-card {
  margin-bottom: 1.5rem;
}

.background-preview {
  height: 150px;
  border-radius: 0.75rem;
  overflow: hidden;
  position: relative;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s;
}

.background-preview:hover .background-overlay {
  opacity: 1;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.full-width {
  width: 100%;
}

.form-group {
  flex: 1;
  min-width: 0;
  position: relative;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #333;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.character-count {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 12px;
  color: #999;
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: "▼";
  font-size: 0.75rem;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
}

.form-select {
  appearance: none;
  padding-right: 2rem;
  background-color: white;
}

.preferences-list {
  display: flex;
  flex-direction: column;
}

.preference-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.preference-row:last-child {
  border-bottom: none;
}

.preference-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.25rem;
  width: 1.25rem;
  left: 0.125rem;
  bottom: 0.125rem;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #4a90e2;
}

input:checked + .slider:before {
  transform: translateX(1.5rem);
}

.slider.round {
  border-radius: 1.5rem;
}

.slider.round:before {
  border-radius: 50%;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .workspace-settings-container {
    padding: 1rem;
  }

  .avatar-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
