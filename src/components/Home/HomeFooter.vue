<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- 顶部广告和订阅区域 -->
      <div class="footer-top">
        <div class="footer-join">
          <h3>加入 KiriPet</h3>
          <p>让您的 KiriPet 账户在宠物百科上进行编辑！</p>
          <button class="join-button">立即加入</button>
        </div>
        <div class="footer-subscribe">
          <h3>订阅我们的新闻简报</h3>
          <p>KiriPet 生态系统报告将让您及时掌握KiriPet的所有更新</p>

          <div class="email-container">
            <div class="email-input-wrapper">
              <input
                type="text"
                class="email-input"
                placeholder="请输入您的邮箱"
                v-model="email"
                @input="handleEmailInput"
              />

              <!-- 邮箱自动补全下拉框 -->
              <div
                v-if="showEmailSuggestions && filteredDomains.length > 0"
                class="email-suggestions"
                ref="suggestionRef"
              >
                <div
                  v-for="domain in filteredDomains"
                  :key="domain"
                  class="suggestion-item"
                  @click="selectDomain(domain)"
                >
                  {{ email.split("@")[0] }}@{{ domain }}
                </div>
              </div>
            </div>

            <button class="subscribe-button" @click="submitSubscription">
              订阅
            </button>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="footer-main">
        <div class="footer-brand">
          <div class="footer-logo">
            <img
              src="https://kiripet.tos-cn-beijing.volces.com/image/logo.png"
            />
            <h3>KiriPet</h3>
          </div>
          <p>KiriPet 的愿景是为宠物知识献给世界，并将知识上链。</p>
          <div class="footer-social">
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-reddit"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-telegram"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-github"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-discord"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
          </div>
        </div>

        <div class="footer-links-container">
          <div class="footer-links">
            <h4>KiriPet</h4>
            <ul>
              <li><a href="#">什么是 KiriPet?</a></li>
              <li><a href="#">新知</a></li>
              <li><a href="#">反馈</a></li>
            </ul>
          </div>

          <div class="footer-links">
            <h4>公司</h4>
            <ul>
              <li><a href="#">关于我们</a></li>
              <li><a href="#">职业生涯</a></li>
              <li><a href="#">品牌</a></li>
              <li><a href="#">AIDEN</a></li>
              <li><a href="#">KiriPet 仪表板</a></li>
            </ul>
          </div>

          <div class="footer-links">
            <h4>资源</h4>
            <ul>
              <li><a href="#">帮助</a></li>
              <li><a href="#">博客</a></li>
              <li><a href="#">宠物百科</a></li>
              <li><a href="#">宠物门店</a></li>
            </ul>
          </div>

          <div class="footer-links">
            <h4>政策</h4>
            <ul>
              <li><a href="#">招商</a></li>
              <li><a href="#">隐私政策</a></li>
              <li><a href="#">服务条款</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 底部版权区域 -->
      <div class="footer-bottom">
        <p class="copyright">
          © 2024 &nbsp; KiriPet. All rights reserved. Made By Kiri&nbsp;
          <a href="https://beian.miit.gov.cn" target="_blank"
            >赣ICP备2024047770号-1</a
          >
        </p>

        <div class="theme-language">
          <div class="language-select">
            <span>ZH</span>
            <span class="dropdown-icon">▼</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// 邮箱输入和自动补全功能
const email = ref("");
const showEmailSuggestions = ref(false);
const commonDomains = [
  "gmail.com",
  "163.com",
  "qq.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
];
const suggestionRef = ref(null);

// 根据输入筛选邮箱后缀
const filteredDomains = computed(() => {
  const inputValue = email.value;
  // 如果已经包含@符号，提取@后面的部分作为筛选条件
  if (inputValue.includes("@")) {
    const domain = inputValue.split("@")[1];
    return domain
      ? commonDomains.filter((d) => d.startsWith(domain))
      : commonDomains;
  }
  return [];
});

// 选择邮箱后缀
const selectDomain = (domain) => {
  const username = email.value.includes("@")
    ? email.value.split("@")[0]
    : email.value;
  email.value = `${username}@${domain}`;
  showEmailSuggestions.value = false;
};

// 处理输入变化
const handleEmailInput = () => {
  if (email.value.includes("@")) {
    showEmailSuggestions.value = true;
  } else {
    showEmailSuggestions.value = false;
  }
};

// 处理点击外部区域关闭下拉框
const handleClickOutside = (event) => {
  if (suggestionRef.value && !suggestionRef.value.contains(event.target)) {
    showEmailSuggestions.value = false;
  }
};

// 挂载和卸载事件
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// 提交订阅
const submitSubscription = () => {
  if (email.value && email.value.includes("@")) {
    // 这里可以添加提交邮箱订阅的逻辑
    alert(`订阅成功，邮箱：${email.value}`);
    email.value = "";
  } else {
    alert("请输入有效的邮箱地址");
  }
};
</script>

<style scoped>
.footer {
  background-color: var(--deongaree); /* 品牌紫色背景 */
  padding: 0;
  margin-top: 3rem;
  color: #fff;
}

.footer-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0;
}

/* 顶部区域样式 */
.footer-top {
  display: flex;
  padding: 3rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-join,
.footer-subscribe {
  flex: 1;
  padding: 0 1rem;
}

.footer-join h3,
.footer-subscribe h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
}

.footer-join p,
.footer-subscribe p {
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 90%;
}

.join-button,
.subscribe-button {
  background-color: var(--deongaree-pr);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.7rem 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.join-button:after,
.subscribe-button:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.join-button:focus:not(:active)::after,
.subscribe-button:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  20% {
    transform: scale(25, 25);
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
}

.subscribe-button {
  background-color: white;
  color: var(--deongaree);
}

.subscribe-button:hover {
  background-color: #f0f0f0;
}

/* 主要内容区域样式 */
.footer-main {
  display: flex;
  padding: 3rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
  width: 25%;
  padding-right: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.footer-logo img {
  width: 30px;
  height: 30px;
  margin-right: 0.75rem;
}

.footer-logo h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.footer-brand p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.footer-social {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.social-icon {
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.social-icon:hover,
.social-icon:active,
.social-icon:focus {
  color: var(--deongaree-pr);
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.footer-links-container {
  display: flex;
  flex: 1;
}

.footer-links {
  flex: 1;
  padding: 0 1rem;
}

.footer-links h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links ul li {
  margin-bottom: 0.75rem;
}

.footer-links ul li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: block;
  padding: 0.5rem 0;
}

.footer-links ul li a:hover,
.footer-links ul li a:active,
.footer-links ul li a:focus {
  color: white;
  padding-left: 5px;
}

/* 底部版权区域样式 */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
}

.copyright {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  margin: 0;
}

.copyright a {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.copyright a:hover {
  color: white;
}

.theme-language {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.language-select {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: white;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
}

.language-select:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.dropdown-icon {
  font-size: 0.6rem;
  margin-left: 0.25rem;
}

/* 响应式布局 */
@media screen and (max-width: 1024px) {
  .footer-top,
  .footer-main {
    flex-direction: column;
  }

  .footer-join,
  .footer-subscribe {
    width: 100%;
    margin-bottom: 2rem;
  }

  .footer-brand {
    width: 100%;
    margin-bottom: 2rem;
  }

  .footer-links-container {
    flex-wrap: wrap;
  }

  .footer-links {
    width: 50%;
    margin-bottom: 2rem;
  }

  .join-button:active,
  .subscribe-button:active {
    transform: scale(0.96);
  }
}

@media screen and (max-width: 768px) {
  .footer-links {
    width: 100%;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
  }

  .copyright {
    text-align: center;
  }

  .copyright a {
    font-size: 14px;
  }

  .footer-links ul li a {
    padding: 0.75rem 0;
  }

  .footer-social {
    justify-content: center;
    gap: 1.5rem;
  }

  .social-icon {
    width: 44px;
    height: 44px;
  }
}

/* 邮箱输入框样式 */
.email-container {
  display: flex;
  width: 100%;
  max-width: 400px;
}

.email-input-wrapper {
  position: relative;
  flex: 1;
  margin-right: 10px;
}

.email-input {
  width: 90%;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  color: var(--deongaree);
  outline: none;
  transition: all 0.3s ease;
}

.email-input:focus {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
}

.email-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}

.suggestion-item {
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--deongaree);
  font-size: 0.9rem;
}

.suggestion-item:hover {
  background-color: rgba(var(--deongaree-rgb), 0.1);
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .email-container {
    flex-direction: column;
    width: 100%;
  }

  .email-input-wrapper {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .subscribe-button {
    align-self: flex-start;
  }
}
</style>
