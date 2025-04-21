<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { knowledge } from "../mock/infos.js";
import html2pdf from "html2pdf.js";
import MarkdownIt from "markdown-it";

const router = useRouter();
const route = useRoute();
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  // Ensure proper list rendering
  lists: true,
});

// 文章数据
const articleData = ref({});

// 返回上一页
const goBack = () => {
  router.back();
};

// 获取文章数据
const fetchArticleData = () => {
  const articleId = Number(route.params.id);
  const foundArticle = knowledge.find((article) => article.id === articleId);

  if (foundArticle) {
    articleData.value = foundArticle;
    console.log("成功获取文章数据:", foundArticle.title);
  } else {
    console.error(`未找到ID为${articleId}的文章数据`);
    // 设置默认数据或错误信息
    articleData.value = {
      title: "未找到文章",
      summary: "抱歉，我们找不到这篇文章的信息",
      content: "文章内容不存在",
      category: "未分类",
      timestamp: "",
      readTime: "",
    };
  }
};

// 判断内容是否为Markdown格式
const isMarkdown = computed(() => {
  if (!articleData.value.content) return false;

  // 检查常见的Markdown特征
  const mdPatterns = [
    /^#+ .*$/m, // 标题 (# Title)
    /\[.*\]\(.*\)/, // 链接 [text](url)
    /\*\*.*\*\*/, // 粗体 **text**
    /\*.*\*/, // 斜体 *text*
    /^\s*[\*\-\+] /m, // 无序列表
    /^\s*\d+\. /m, // 有序列表
    /^>.*/m, // 引用块
    /`.*`/, // 行内代码
    /```[\s\S]*```/, // 代码块
    /^\s*\|.*\|.*\|\s*$/m, // 表格
  ];

  return mdPatterns.some((pattern) => pattern.test(articleData.value.content));
});

// 渲染Markdown内容
const renderedContent = computed(() => {
  if (!articleData.value.content) return "";

  if (isMarkdown.value) {
    // 预处理 Markdown 内容以确保列表正确渲染
    let processedContent = articleData.value.content;

    // 确保无序列表项有正确的格式（确保 * 后面有空格）
    processedContent = processedContent.replace(/^\s*\*(?!\s)/gm, "* ");

    // 确保有序列表项有正确的格式（确保数字和点后面有空格）
    processedContent = processedContent.replace(/^\s*(\d+)\.(?!\s)/gm, "$1. ");

    return md.render(processedContent);
  }

  return articleData.value.content;
});

// 导出为PDF
const exportPDF = async () => {
  const content = document.getElementById("article-content");
  const opt = {
    margin: [25, 25, 25, 25],
    filename: `${articleData.value.title}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: "avoid-all" },
  };

  try {
    await html2pdf().set(opt).from(content).save();
  } catch (error) {
    console.error("PDF生成失败:", error);
  }
};

onMounted(() => {
  fetchArticleData();
});
</script>

<template>
  <div class="article-detail-page">
    <!-- 顶部导航区域 -->
    <div class="page-navigation">
      <div class="back-button" @click="goBack">
        <i class="material-icons-sharp">arrow_back</i>
        <span>返回</span>
      </div>

      <button id="exportPDF" class="export-button" @click="exportPDF">
        <i class="material-icons-sharp">picture_as_pdf</i>
        导出为PDF
      </button>
    </div>

    <div class="article-container">
      <!-- 文章头部 - 按照图片样式修改 -->
      <div class="article-header">
        <h1 class="article-title">{{ articleData.title }}</h1>
        <div class="article-meta">
          <span class="article-date">
            <i class="material-icons-sharp">calendar_today</i>
            {{ articleData.timestamp }}
          </span>
          <span class="article-category">
            <i class="material-icons-sharp">folder</i>
            {{ articleData.category }}
          </span>
          <span class="article-author">
            <i class="material-icons-sharp">person</i>
            {{ articleData.author || "Kiri" }}
          </span>
          <span class="article-readtime">
            <i class="material-icons-sharp">access_time</i>
            预计阅读时间{{ articleData.readTime }}
          </span>
        </div>
        <div class="article-divider"></div>
      </div>

      <!-- 文章摘要区域 -->
      <div class="article-summary" v-if="articleData.summary">
        <p>{{ articleData.summary }}</p>
      </div>

      <!-- 文章主图区域 -->
      <div class="article-featured-image" v-if="articleData.image">
        <img :src="articleData.image" :alt="articleData.title">
      </div>

      <!-- 文章内容 - 根据内容类型渲染 -->
      <div
        id="article-content"
        class="article-content"
        :class="{ 'markdown-content': isMarkdown }"
        v-html="renderedContent"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.article-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;
  padding: 8px 16px;
  border-radius: var(--radius-8);
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: var(--light);
  color: var(--deongaree);
}

.back-button i {
  margin-right: 0.5rem;
}

.export-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.export-button:hover {
  transform: translateY(-2px);
  color: var(--deongaree);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.article-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.article-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
}

.article-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  color: var(--dark);
  font-weight: 700;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
  color: var(--gray);
  font-size: 0.9rem;
}

.article-meta span {
  display: flex;
  align-items: center;
}

.article-meta i {
  font-size: 1.1rem;
  margin-right: 0.5rem;
  color: var(--deongaree);
}

.article-divider {
  height: 4px;
  background-color: var(--light);
  width: 100px;
  margin: 1.5rem auto;
  border-radius: 2px;
}

.article-summary {
  padding: 0.8rem 0;
  margin: 0 2rem;
  background-color: #eeeeee73;
  color: var(--dark-variant);
  padding-left: 1rem;
  margin-bottom: 0;
  font-size: 1.1rem;
  font-style: italic;
  position: relative;
  border-left: 4px solid var(--deongaree);
}

.article-featured-image {
  width: 100%;
  padding: 1.5rem 2rem;
  text-align: center;
}

.article-featured-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.article-content {
  padding: 0 2rem 2rem;
  line-height: 1.8;
  color: var(--dark);
  font-size: 1.05rem;
}

/* Markdown內容特殊样式 */
.markdown-content {
  line-height: 1.8;
}

.article-content h2 {
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: var(--dark);
  border-bottom: 1px solid var(--light);
  padding-bottom: 0.5rem;
}

.article-content h3 {
  font-size: 1.4rem;
  margin: 1.5rem 0 1rem;
  color: var(--dark);
}

.article-content h4 {
  font-size: 1.2rem;
  margin: 1.2rem 0 0.8rem;
  color: var(--dark);
}

.article-content p {
  margin-bottom: 1rem;
}

.article-content ul,
.article-content ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.article-content li {
  margin-bottom: 0.5rem;
}

.article-content strong,
.article-content b {
  font-weight: 600;
}

.article-content a {
  color: var(--deongaree);
  text-decoration: none;
  border-bottom: 1px dashed var(--deongaree);
}

.article-content a:hover {
  border-bottom: 1px solid var(--deongaree);
}

.article-content blockquote {
  border-left: 4px solid var(--deongaree-yw);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: var(--gray);
}

.article-content pre,
.article-content code {
  background-color: var(--light);
  border-radius: var(--radius-4);
  padding: 0.2rem 0.4rem;
  font-family: monospace;
}

.article-content pre {
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.article-content pre code {
  background: none;
  padding: 0;
}

/* 文章内容样式 */
:deep(ul),
:deep(ol) {
  margin: 1rem 0;
  padding-left: 1.5rem;
  list-style-position: outside;
}

:deep(ul) {
  list-style-type: disc;
}

:deep(ol) {
  list-style-type: decimal;
}

:deep(ul ul) {
  list-style-type: circle;
}

:deep(ol ol) {
  list-style-type: lower-alpha;
}

:deep(li) {
  margin-bottom: 0.5rem;
}

:deep(strong),
:deep(b) {
  font-weight: 600;
}

:deep(h2) {
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: var(--dark);
  border-bottom: 1px solid var(--light);
  padding-bottom: 0.5rem;
}

:deep(h3) {
  font-size: 1.4rem;
  margin: 1.5rem 0 1rem;
  color: var(--dark);
}

:deep(h4) {
  font-size: 1.2rem;
  margin: 1.2rem 0 0.8rem;
  color: var(--dark);
}

:deep(blockquote) {
  border-left: 4px solid var(--deongaree-yw);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: var(--gray);
}

:deep(pre),
:deep(code) {
  background-color: var(--light);
  border-radius: var(--radius-4);
  padding: 0.2rem 0.4rem;
  font-family: monospace;
}

:deep(pre) {
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

:deep(pre code) {
  background: none;
  padding: 0;
}

:deep(a) {
  color: var(--deongaree);
  text-decoration: none;
  border-bottom: 1px dashed var(--deongaree);
}

:deep(a:hover) {
  border-bottom: 1px solid var(--deongaree);
}

:deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1.5rem 0;
}

:deep(th),
:deep(td) {
  padding: 0.75rem;
  border: 1px solid var(--light);
  text-align: left;
}

:deep(th) {
  background-color: var(--light);
  font-weight: 600;
}

/* 文章内容中的图片样式 */
:deep(img) {
  max-width: 90%;
  height: auto;
  display: block;
  margin: 1.5rem auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

:deep(img:hover) {
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
</style>
