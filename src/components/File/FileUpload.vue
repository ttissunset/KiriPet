<script setup>
import { ref } from "vue";
import axios from "axios";

// 常量定义
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// refs
const fileInputRef = ref(null);
const fileList = ref([]);
const previewVisible = ref(false);
const currentPreview = ref("");

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
    // uploadFile(fileItem, fileList.value.length - 1);
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

// 上传文件
// const uploadFile = async (fileItem, index) => {
//   const formData = new FormData();
//   formData.append("file", fileItem.file);

//   try {
//     const response = await axios.post("/api/upload", formData, {
//       onUploadProgress: (progressEvent) => {
//         const progress = Math.round(
//           (progressEvent.loaded * 100) / progressEvent.total
//         );
//         fileList.value[index].progress = progress;
//       },
//     });

//     fileList.value[index].status = "success";
//     fileList.value[index].url = response.data.url;
//   } catch (error) {
//     fileList.value[index].status = "error";
//     fileList.value[index].error = "上传失败，请重试";
//     console.error("File upload failed:", error);
//   }
// };

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
</script>
<template>
  <div class="upload-container">
    <!-- 上传按钮区域 -->
    <div class="upload-trigger">
      <input
        ref="fileInputRef"
        type="file"
        @change="handleFileChange"
        multiple
        class="hidden-input"
        accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx"
      />

      <div class="upload-icon" @click="triggerFileInput">
        <i class="fa-solid fa-paperclip"></i>
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
            <i class="fa-solid fa-rotate-right" @click="retryUpload(index)"></i>
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
  </div>
</template>

<style scoped>
.upload-container {
  padding: 20px;
}

.upload-trigger {
  position: relative;
}

.hidden-input {
  display: none;
}

.upload-icon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
}

.upload-icon:hover {
  border-color: #409eff;
  color: #409eff;
}

.file-list {
  margin-top: 16px;
}

.file-item {
  display: flex;
  align-items: center;
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
  gap: 8px;
  margin-left: 16px;
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

.icon-loading {
  animation: spin 1s linear infinite;
}
</style>
