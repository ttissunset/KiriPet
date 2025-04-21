<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import { ref, computed, nextTick, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// 表单数据
const formData = reactive({
  title: "",
  content: "",
  tags: [],
  mediaFiles: [],
});

// 预览URL数组
const previewUrls = ref([]);

// 拖拽状态
const dragActive = ref(false);

// 标签输入相关
const customTagInput = ref("");
const customTagInputVisible = ref(false);
const customTagInputRef = ref(null);

// 预览状态
const previewVisible = ref(false);

// 推荐标签列表
const suggestedTags = [
  "生活",
  "美食",
  "旅行",
  "音乐",
  "电影",
  "游戏",
  "学习",
  "摄影",
  "穿搭",
  "科技",
  "运动",
  "宠物",
];

// 计算属性：是否显示上传区域
const showUploadArea = computed(() => previewUrls.value.length === 0);

// 处理文件拖放
const handleDrop = (e) => {
  e.preventDefault();
  dragActive.value = false;
  const files = [...e.dataTransfer.files];
  handleFiles(files);
};

// 添加文件输入框的引用
const fileInput = ref(null);

// 修改处理件的方法
const handleFiles = (files) => {
  if (!files || files.length === 0) return;

  files.forEach((file) => {
    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      // 检查文件大小（例如：限制为10MB）
      if (file.size > 10 * 1024 * 1024) {
        alert("文件大小不能超过10MB");
        return;
      }

      const url = URL.createObjectURL(file);
      previewUrls.value.push({
        url,
        type: file.type.startsWith("image/") ? "image" : "video",
        file,
      });
      formData.mediaFiles.push(file);
    } else {
      alert("只支持图片和视频文件");
    }
  });
};

// 添加点击上传的方法
const handleClickUpload = () => {
  fileInput.value?.click();
};

// 移除媒体
const removeMedia = (index) => {
  URL.revokeObjectURL(previewUrls.value[index].url);
  previewUrls.value.splice(index, 1);
  formData.mediaFiles.splice(index, 1);
};

// 修改提交方法
const handleSubmit = async () => {
  if (!formData.title.trim()) {
    alert("请填写标题");
    return;
  }

  try {
    // 创建要提交的数据副本
    const submitData = {
      title: formData.title,
      content: formData.content,
      tags: [...formData.tags], // 确保复制数组
      mediaFiles: [...formData.mediaFiles],
    };

    console.log("提交的数据：", submitData); // 调试用
    console.log("test:", formData.tags);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 提交成功后再重置表单
    formData.title = "";
    formData.content = "";
    formData.tags = [];
    formData.mediaFiles = [];

    previewUrls.value = [];
    previewVisible.value = false;
  } catch (error) {
    console.error("发布失败:", error);
    alert("发布失败，请重试");
  }
};

// 显示自定义标签输入
const showCustomTagInput = () => {
  customTagInputVisible.value = true;
  nextTick(() => {
    if (customTagInputRef.value) {
      customTagInputRef.value.focus();
    }
  });
};

// 处理自定义标签确认
const handleCustomTagConfirm = () => {
  if (customTagInput.value && customTagInput.value.trim()) {
    const newTag = customTagInput.value.trim();
    if (!formData.tags.includes(newTag)) {
      formData.tags.push(newTag);
    }
    customTagInputVisible.value = false;
    customTagInput.value = "";
  }
};

// 移除标签
const removeTag = (tag) => {
  const index = formData.tags.indexOf(tag);
  if (index > -1) {
    formData.tags.splice(index, 1);
  }
};

// 预览相关的响应式数据和方法
const currentMediaIndex = ref(0);

// 计算当前显示的媒体
const currentMedia = computed(
  () => previewUrls.value[currentMediaIndex.value] || {}
);

// 上一个媒体
const prevMedia = () => {
  if (currentMediaIndex.value > 0) {
    currentMediaIndex.value--;
  }
};

// 下一个媒体
const nextMedia = () => {
  if (currentMediaIndex.value < previewUrls.value.length - 1) {
    currentMediaIndex.value++;
  }
};

// 处理预览
const handlePreview = () => {
  previewVisible.value = true;
};

// 关闭预览
const closePreview = () => {
  previewVisible.value = false;
  currentMediaIndex.value = 0;
};
</script>

<template>
  <HomeHeader />
  <div class="upload-container">
    <div class="layout-container">
      <div class="main-content">
        <div class="content-container">
          <div class="post-header">
            <p class="page-title">创作新内容</p>
          </div>

          <!-- 标题表单 -->
          <div class="title-input-container">
            <label class="input-label">
              <div class="input-wrapper">
                <input
                  placeholder="标题"
                  v-model.trim="formData.title"
                  type="text"
                  class="title-input"
                  maxlength="20"
                />
                <span class="input-counter"
                  >{{ formData.title.length }}/20</span
                >
              </div>
            </label>
          </div>

          <!-- 内容表单 -->
          <div class="post-content-container">
            <label class="textarea-label">
              <div class="textarea-wrapper">
                <div class="textarea-container">
                  <textarea
                    placeholder="为你的灵感题词，或让链接传递故事"
                    v-model.trim="formData.content"
                    maxlength="250"
                    class="post-textarea"
                  ></textarea>
                  <span class="textarea-counter"
                    >{{ formData.content.length }}/250</span
                  >
                  <div class="textarea-toolbar">
                    <div class="toolbar-actions">
                      <div class="toolbar-buttons">
                        <button class="toolbar-button">
                          <div
                            class="icon"
                            v-if="showUploadArea"
                            :class="{ 'drag-active': dragActive }"
                            @dragenter.prevent="dragActive = true"
                            @dragover.prevent="dragActive = true"
                            @dragleave.prevent="dragActive = false"
                            @drop="handleDrop"
                            @click="handleClickUpload"
                          >
                            <input
                              ref="fileInput"
                              type="file"
                              multiple
                              accept="image/*,video/*"
                              class="file-input"
                              @change="
                                (e) => handleFiles(Array.from(e.target.files))
                              "
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20px"
                              height="20px"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                            >
                              <path
                                d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"
                              ></path>
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>

          <!-- 图片渲染 -->
          <div class="image-gallery">
            <div class="gallery-item" v-if="previewUrls.length > 0">
              <div
                class="gallery-image"
                v-for="(item, index) in previewUrls"
                :key="index"
              >
                <img
                  v-if="item.type === 'image'"
                  :src="item.url"
                  alt="preview"
                />
                <video
                  v-else
                  :src="item.url"
                  controls
                  class="video-preview"
                ></video>
                <div class="media-overlay">
                  <button class="remove-btn" @click="removeMedia(index)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                v-if="previewUrls.length < 9 && previewUrls.length > 0"
                class="add-more-btn"
                @click="handleClickUpload"
              >
                <svg
                  class="plus-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>添加更多</span>
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  class="file-input"
                  @change="(e) => handleFiles(Array.from(e.target.files))"
                />
              </div>
            </div>
          </div>

          <!-- 标签区域 -->
          <div class="tags-container">
            <!-- 已选标签 -->
            <div class="tags-container">
              <span v-for="tag in formData.tags" :key="tag" class="tag">
                # {{ tag }}
                <button class="tag-remove" @click="removeTag(tag)">×</button>
              </span>

              <div v-if="customTagInputVisible" class="tag-input-wrapper">
                <input
                  ref="customTagInputRef"
                  v-model="customTagInput"
                  type="text"
                  maxlength="5"
                  class="tag-input"
                  @keyup.enter="handleCustomTagConfirm"
                  @blur="handleCustomTagConfirm"
                />
              </div>

              <button v-else class="add-tag-btn" @click="showCustomTagInput">
                <svg
                  t="1732946794373"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2332"
                  width="16"
                  height="16"
                >
                  <path
                    d="M512 832a32 32 0 0 0 32-32v-256h256a32 32 0 0 0 0-64h-256V224a32 32 0 0 0-64 0v256H224a32 32 0 0 0 0 64h256v256a32 32 0 0 0 32 32"
                    fill="#c6a1ee"
                    p-id="2333"
                  ></path>
                </svg>
                添加标签
              </button>
            </div>

            <!-- 推荐标签 -->
            <div class="suggested-tags">
              <div class="tags-grid">
                <button
                  v-for="tag in suggestedTags"
                  :key="tag"
                  class="suggested-tag"
                  :class="{ active: formData.tags.includes(tag) }"
                  @click="
                    formData.tags.includes(tag)
                      ? (formData.tags = formData.tags.filter((t) => t !== tag))
                      : formData.tags.push(tag)
                  "
                >
                  # {{ tag }}
                </button>
              </div>
            </div>
          </div>

          <!-- 按钮区域 -->
          <div class="action-buttons">
            <div class="buttons-container">
              <button class="cancel-button" @click="router.push('/social')">
                取消
              </button>
              <button class="post-button" @click="handlePreview">预览</button>
            </div>
          </div>

          <!-- 预览弹窗  -->
          <div v-if="previewVisible" class="preview-modal">
            <!-- 退出预览  -->
            <div class="preview-overlay" @click="closePreview"></div>
            <div class="preview-content-container">
              <!-- 媒体预览 -->
              <div class="preview-media-section">
                <div
                  v-if="previewUrls.length > 0"
                  class="preview-media-container"
                >
                  <!-- 左按钮 -->
                  <button
                    v-if="previewUrls.length > 1"
                    class="nav-btn prev"
                    @click="prevMedia"
                  >
                    ❮
                  </button>

                  <!-- 图片/视频预览区域 -->
                  <div class="media-display">
                    <img
                      v-if="currentMedia.type === 'image'"
                      :src="currentMedia.url"
                      alt="preview"
                    />
                    <div
                      v-else-if="currentMedia.type === 'video'"
                      class="video-container"
                    >
                      <video
                        :src="currentMedia.url"
                        controls
                        class="video-preview"
                      ></video>
                    </div>
                  </div>

                  <!-- 右按钮 -->
                  <button
                    v-if="previewUrls.length > 1"
                    class="nav-btn next"
                    @click="nextMedia"
                  >
                    ❯
                  </button>

                  <!-- 缩略图区域 -->
                  <div v-if="previewUrls.length > 1" class="preview-thumbnails">
                    <div
                      v-for="(item, index) in previewUrls"
                      :key="index"
                      class="thumbnail"
                      :class="{ active: currentMediaIndex === index }"
                      @click="currentMediaIndex = index"
                    >
                      <img
                        v-if="item.type === 'image'"
                        :src="item.url"
                        alt="thumbnail"
                      />
                      <div v-else class="video-thumbnail">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="no-media-placeholder">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>未上传图片</p>
                </div>
              </div>

              <!-- 用户信息 -->
              <div class="preview-info-section">
                <div class="preview-user-info">
                  <div class="user-avatar">
                    <img src="https://picsum.photos/100/100" alt="用户头像" />
                  </div>
                  <div class="user-details">
                    <h4>用户名称</h4>
                    <span class="post-time">{{
                      new Date().toLocaleString()
                    }}</span>
                  </div>
                  <button class="close-btn" @click="closePreview">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div class="preview-content-scroll">
                  <div class="preview-text">
                    <h2 class="preview-title">
                      {{ formData.title || "未填写标题" }}
                    </h2>
                    <div class="preview-content">
                      {{ formData.content || "未填写内容" }}
                    </div>
                  </div>
                  <div class="preview-tags">
                    <span
                      v-if="formData.tags.length > 0"
                      v-for="tag in formData.tags"
                      :key="tag"
                      class="preview-tag"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>
                <!-- 预览区域行为 -->
                <div class="preview-actions">
                  <button class="btn preview-close" @click="closePreview">
                    返回编辑
                  </button>
                  <button
                    class="btn preview-post"
                    @click="handleSubmit"
                    :disabled="!formData.title.trim()"
                    :title="!formData.title.trim() ? '请填写标题' : ''"
                  >
                    立即发布
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?display=swap&family=Noto+Sans:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;700;800");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.upload-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
  background-color: #faf8fc;
  overflow-x: hidden;
  font-family: "Plus Jakarta Sans", "Noto Sans", sans-serif;
}

.layout-container {
  display: flex;
  height: 100%;
  flex-grow: 1;
  flex-direction: column;
}

/* 主区域样式 */
.main-content {
  padding: 0 10rem;
  display: flex;
  flex: 1;
  justify-content: center;
  padding-bottom: 1.25rem;
}

.content-container {
  display: flex;
  flex-direction: column;
  width: 512px;
  max-width: 512px;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  max-width: 960px;
  flex: 1;
}

/* Post header */
.post-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem;
}

.page-title {
  color: #140e1b;
  letter-spacing: light;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.25;
  min-width: 18rem;
}

/* Title input */
.title-input-container {
  display: flex;
  max-width: 480px;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
  padding: 0 1rem 0.75rem 1rem;
}

.input-label {
  display: flex;
  flex-direction: column;
  min-width: 10rem;
  flex: 1;
}

.input-wrapper {
  display: flex;
  width: 100%;
  flex: 1;
  align-items: stretch;
  border-radius: 0.75rem;
  position: relative;
}

.title-input {
  display: flex;
  width: 100%;
  min-width: 0;
  flex: 1;
  resize: none;
  overflow: hidden;
  border-radius: 0.75rem;
  color: #140e1b;
  border: none;
  background-color: #ede7f3;
  height: 3.5rem;
  padding: 1rem;
  border-right: 0;
  padding-right: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
}

.title-input::placeholder {
  color: #734e97;
}

.title-input:focus {
  outline: none;
  box-shadow: none;
}

.input-counter {
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-size: 12px;
  color: #6b7280;
}

/* Post content */
.post-content-container {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  gap: 0.75rem;
  height: 100%;
  max-height: 480px;
}

.textarea-label {
  display: flex;
  flex-direction: column;
  min-width: 10rem;
  height: 100%;
  flex: 1;
}

.textarea-wrapper {
  display: flex;
  width: 100%;
  flex: 1;
  align-items: stretch;
  border-radius: 0.75rem;
  flex-direction: column;
  position: relative;
}

.textarea-container {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.post-textarea {
  display: flex;
  width: 100%;
  min-width: 0;
  flex: 1;
  resize: none;
  overflow: hidden;
  border-radius: 0.75rem;
  color: #140e1b;
  border: 1px solid #dbd0e7;
  background-color: #faf8fc;
  min-height: 9rem;
  padding: 0.9375rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
  padding-top: 1rem;
  padding-bottom: 0;
}

.post-textarea::placeholder {
  color: #c2aed5;
}

.post-textarea:focus {
  outline: none;
  border-color: #dbd0e7;
  box-shadow: none;
}

.textarea-counter {
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-size: 12px;
  color: #6b7280;
}

.textarea-toolbar {
  display: flex;
  border: 1px solid #dbd0e7;
  background-color: #faf8fc;
  align-items: center;
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  border-top: 0;
  padding: 0 0 0 0.9375rem;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: space-between;
}

.file-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  position: absolute;
  overflow: hidden;
  z-index: -1;
}

.toolbar-buttons {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.toolbar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem;
  background: none;
  border: none;
  cursor: pointer;
}

.toolbar-button .icon {
  color: #734e97;
}

/* Image gallery */
.gallery-item {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 16px;
  padding-bottom: 0;
  border-radius: 16px;
}

.gallery-image {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.gallery-image img,
.gallery-image video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-image:hover img,
.gallery-image:hover video {
  transform: scale(1.05);
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.gallery-image:hover .media-overlay {
  opacity: 1;
}

.remove-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(239, 68, 68, 0.9);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  transform: scale(0.9);
}

.media-preview-item:hover .remove-btn {
  transform: scale(1);
}

.remove-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.remove-btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 2.5;
}

/* 添加更多图片 */
.add-more-btn {
  aspect-ratio: 1;
  border-radius: 12px;
  border: 2px dashed #93c5fd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fff;
  padding: 20px;
}

.add-more-btn:hover {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
  transform: translateY(-2px);
}

.plus-icon {
  width: 32px;
  height: 32px;
  color: #93c5fd;
  transition: color 0.3s ease;
}

.add-more-btn:hover .plus-icon {
  color: #3b82f6;
}

.add-more-btn span {
  font-size: 14px;
  color: #6b7280;
  transition: color 0.3s ease;
}

.add-more-btn:hover span {
  color: #3b82f6;
}

/* Tags */
.tags-container {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  flex-wrap: wrap;
  padding-right: 1rem;
}

.tag {
  display: flex;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  background-color: #ede7f3;
  padding: 0 1rem;
  color: #140e1b;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: normal;
}

.tag-remove {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: #6b7280;
  cursor: pointer;
  font-size: 16px;
  padding-top: 2px;
}

.tag-remove:hover {
  color: #ef4444;
}

.tag-input {
  max-width: 100px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.tag-input:focus {
  outline: none;
  border: 1px solid #dbd0e7;
  box-shadow: none;
}

.add-tag-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  padding: 6px 12px;
  border: 1px dashed #dbd0e7;
  border-radius: 20px;
  color: #c6a1ee;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-tag-btn:hover {
  border-color: #c6a1ee;
  background: rgba(59, 130, 246, 0.05);
}

/* 推荐标签 */
.tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: 7px;
}

.suggested-tag {
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  color: #6b7280;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.suggested-tag:hover,
.suggested-tag.active {
  border-color: #c6a1ee;
  color: #dbd0e7;
  background: rgba(59, 130, 246, 0.05);
}

/* Action buttons */
.action-buttons {
  display: flex;
  justify-content: stretch;
}

.buttons-container {
  display: flex;
  flex: 1;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  justify-content: flex-end;
}

.cancel-button {
  display: flex;
  min-width: 84px;
  max-width: 480px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 9999px;
  height: 2.5rem;
  padding: 0 1rem;
  background-color: #ede7f3;
  color: #140e1b;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.015em;
  border: none;
}

.post-button {
  display: flex;
  min-width: 84px;
  max-width: 480px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 9999px;
  height: 2.5rem;
  padding: 0 1rem;
  background-color: #8019e6;
  color: #faf8fc;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.015em;
  border: none;
}

.cancel-button span,
.post-button span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive styling */
@media (max-width: 768px) {
  .main-content {
    padding: 0 1rem;
  }

  .navigation-links {
    gap: 1rem;
  }

  .content-container {
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .navigation-links {
    display: none;
  }

  .image-gallery {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}

/* 预览弹窗 */
.preview-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
}

.preview-content-container {
  position: relative;
  width: 95%;
  height: 90vh;
  max-width: 1600px;
  background: transparent;
  display: flex;
  gap: 24px;
  z-index: 1;
}

/* 左侧媒体区域样式优化 */
.preview-media-section {
  flex: 1;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-media-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.media-display {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-height: calc(90vh - 100px);
}

.media-display img,
.media-display video {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
}

/* 右侧信息区域 */
.preview-info-section {
  width: 400px;
  height: 100%;
  background: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.preview-user-info {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  position: relative;
}

.close-btn {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.2s ease;
  border-radius: 50%;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  transform: translateY(-50%) rotate(90deg);
}

.close-btn svg {
  width: 20px;
  height: 20px;
}

.preview-content-scroll {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.preview-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
  line-height: 1.3;
}

.preview-content {
  width: 100%;
  font-size: 16px;
  color: #4b5563;
  margin-bottom: 24px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  line-height: 1.6;
}

.preview-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 0;
  background-color: #fff;
}

.preview-tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  color: #c6a1ee;
  border-radius: 20px;
  font-size: 14px;
  transition: all 0.2s ease;
  border: 1px solid #93c5fd;
  margin-bottom: 8px;
  background: #fff;
  cursor: pointer;
}

.preview-actions {
  padding: 16px;
  display: flex;
  gap: 12px;
  border-top: 1px solid #e5e7eb;
  background: white;
}

.preview-actions .btn {
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.preview-actions .btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.preview-close {
  border: 2px solid #e5e7eb;
  background: #fff;
  color: #6b7280;
}

.preview-close:hover {
  border-color: #8019e6;
}

.preview-post {
  background: #8019e6;
  color: #fff;
  border: none;
}

.preview-post:hover {
  background: #734e97;
}

/* 用户头像*/
.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 无媒体时的占位 */
.no-media-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  color: #94a3b8;
  padding: 20px;
}

.no-media-placeholder svg {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  color: #cbd5e1;
}

.no-media-placeholder p {
  font-size: 18px;
  color: #64748b;
  font-weight: 500;
}

/* 导航按钮位置调整 */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;
  border-radius: 50%;
  backdrop-filter: blur(4px);
}

.nav-btn.prev {
  left: 20px;
}

.nav-btn.next {
  right: 20px;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.6);
  transform: translateY(-50%) scale(1.1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .media-display {
    padding: 10px;
  }

  .nav-btn {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }

  .nav-btn.prev {
    left: 10px;
  }
  .nav-btn.next {
    right: 10px;
  }
}

/* 缩略图导航位置调整 */
.preview-thumbnails {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  display: flex;
  gap: 8px;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.thumbnail {
  width: 120px;
  height: 120px;
  border-radius: 8px;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
}

/* 视频缩略图样式 */
.video-thumbnail {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
}

.video-thumbnail svg {
  width: 24px;
  height: 24px;
}

/* 视频容器样式 */
.video-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.video-preview {
  max-width: 100%;
  max-height: 100%;
}
</style>
