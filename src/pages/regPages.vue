<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

import { ref, computed, watch } from "vue";
import { registerAPI, sendVerificationCodeAPI } from "@/apis/user.js";
import Notification from "@/components/Notify/notification.vue";

const user_name = ref("");
const email = ref("");
const password = ref("");
const code = ref("");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 按钮禁用状态和倒计时
const verifyBtnDisabled = ref(false);
const countdownTime = ref(60);

// 邮箱自动补全
const showEmailSuggestions = ref(false);
const emailUsername = ref("");
const emailDomain = ref("");
const selectedDomainIndex = ref(-1);

const commonDomains = [
  "gmail.com",
  "qq.com",
  "163.com",
  "126.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
  "foxmail.com"
];

// 过滤邮箱域名建议
const filteredDomains = computed(() => {
  if (!emailDomain.value) return commonDomains;
  return commonDomains.filter(domain => 
    domain.startsWith(emailDomain.value.toLowerCase())
  );
});

// 监听email变化，分离用户名和域名部分
watch(email, (newValue) => {
  const parts = newValue.split('@');
  if (parts.length > 1) {
    emailUsername.value = parts[0];
    emailDomain.value = parts[1];
    showEmailSuggestions.value = true;
  } else {
    emailUsername.value = newValue;
    emailDomain.value = "";
    showEmailSuggestions.value = false;
  }
});

// 选择邮箱域名
const selectDomain = (domain) => {
  email.value = `${emailUsername.value}@${domain}`;
  showEmailSuggestions.value = false;
  selectedDomainIndex.value = -1;
};

// 处理键盘按键事件
const handleEmailKeydown = (e) => {
  if (!showEmailSuggestions.value) return;
  
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      selectedDomainIndex.value = Math.min(selectedDomainIndex.value + 1, filteredDomains.value.length - 1);
      break;
    case 'ArrowUp':
      e.preventDefault();
      selectedDomainIndex.value = Math.max(selectedDomainIndex.value - 1, 0);
      break;
    case 'Enter':
      e.preventDefault();
      if (selectedDomainIndex.value >= 0 && selectedDomainIndex.value < filteredDomains.value.length) {
        selectDomain(filteredDomains.value[selectedDomainIndex.value]);
      }
      break;
    case 'Escape':
      e.preventDefault();
      showEmailSuggestions.value = false;
      break;
  }
};

// 显示通知
const showNotification = (message, type = 'info') => {
  const event = new CustomEvent('show-notification', {
    detail: { message, type }
  });
  document.dispatchEvent(event);
};

// 验证码
const verify = () => {
  if (!email.value || !emailRegex.test(email.value)) {
    showNotification("请输入正确的邮箱！", "error");
  } else {
    sendVerificationCodeAPI(email.value).then((res) => {
      const { data } = res;
      showNotification("验证码发送成功，请查收邮件", "success");
      
      // 禁用按钮并开始倒计时
      verifyBtnDisabled.value = true;
      countdownTime.value = 60;
      
      const timer = setInterval(() => {
        countdownTime.value--;
        if (countdownTime.value <= 0) {
          clearInterval(timer);
          verifyBtnDisabled.value = false;
        }
      }, 1000);
    }).catch(err => {
      showNotification("验证码发送失败，请稍后重试", "error");
    });
  }
};

// 注册
const register = () => {
  console.log(user_name.value, password.value, email.value, code.value);
  if (
    user_name.value === "" ||
    email.value === "" ||
    password.value === "" ||
    code.value === ""
  ) {
    showNotification("请填写所有必填项", "warning");
    return;
  }
  registerAPI(user_name.value, password.value, email.value, code.value).then(
    (res) => {
      const { data } = res;
      showNotification("注册成功，即将跳转到登录页面", "success");
      
      user_name.value = "";
      password.value = "";
      email.value = "";
      code.value = "";

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  ).catch(err => {
    showNotification("注册失败，请稍后重试", "error");
  });
};
</script>

<template>
  <div class="reg-container">
    <Notification />
    <div class="reg-container-reg">
      <div class="reg-container-reg-text">
        <p>你想知道的你所不知道的都在这里...</p>
        <p>现在加入<span>KiriPet!</span></p>
        <p>带你走入毛茸茸宠物的世界</p>
      </div>
      <div class="reg-container-reg-svg">
        <img
          src="https://kiripet.tos-cn-beijing.volces.com/image/undraw_friends_r511.svg"
          alt=""
        />
      </div>
    </div>
    <div class="reg-container-right">
      <div class="right-reg-logo">
        <img
          src="https://kiripet.tos-cn-beijing.volces.com/image/logo.png"
          @click="router.push('/home')"
        />
        <h2 @click="router.push('/home')">KiriPet</h2>
      </div>
      <div class="right-reg-main">
        <h1>注册</h1>
        <div class="right-reg-main-input-field">
          <input
            required="true"
            class="input"
            type="text"
            v-model="user_name"
          />
          <label class="label" for="input">输入用户名</label>
        </div>
        <div class="right-reg-main-input-field email-field">
          <input 
            required="true" 
            class="input" 
            type="email" 
            v-model="email" 
            @keydown="handleEmailKeydown"
            @focus="showEmailSuggestions = email.includes('@') && emailDomain.value !== ''"
            @blur="setTimeout(() => showEmailSuggestions = false, 200)"
          />
          <label class="label" for="input">输入邮箱</label>
          <div class="email-suggestions" v-if="showEmailSuggestions && filteredDomains.length > 0">
            <ul>
              <li 
                v-for="(domain, index) in filteredDomains" 
                :key="domain"
                :class="{ active: index === selectedDomainIndex }"
                @mousedown.prevent="selectDomain(domain)"
                @mouseover="selectedDomainIndex = index"
              >
                {{ emailUsername }}@{{ domain }}
              </li>
            </ul>
          </div>
        </div>
        <div class="right-reg-main-input-field verify-code">
          <input required="" class="input" type="text" v-model="code" />
          <label class="label" for="input">输入验证码</label>
          <button @click="verify" :disabled="verifyBtnDisabled">
            {{ verifyBtnDisabled ? `${countdownTime}s` : '验证' }}
          </button>
        </div>
        <div class="right-reg-main-input-field">
          <input required="" class="input" type="password" v-model="password" />
          <label class="label" for="input">输入密码</label>
        </div>
        <div class="right-reg-main-submitBtn">
          <button @click="register()">注册</button>
        </div>
        <div class="right-reg-main-line">
          <img src="https://kiripet.tos-cn-beijing.volces.com/image/dots.svg" />
        </div>
        <div class="right-reg-main-toLogin">
          <span>已有账户!</span>
          <div class="toLogin" @click="router.push('/login')">现在登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reg-container {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.reg-container-reg {
  width: 60vw;
  height: 100vh;
}

.reg-container-reg .reg-container-reg-text {
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  color: var(--dark);
  align-items: center;
  justify-content: end;
  font-size: var(--fs-48);
  font-weight: var(--fw-600);
  font-family: var(--ff-hymhtw);
  letter-spacing: 5px;
}

.reg-container-reg-text span {
  font-size: var(--fs-60);
  color: var(--deongaree);
}

.reg-container-reg-text span:hover {
  color: var(--danger);
  transition: var(--transition-4);
}

.reg-container-reg .reg-container-reg-svg {
  display: flex;
  height: 70vh;
  justify-content: center;
  align-items: center;
}

.reg-container-reg .reg-container-reg-svg img {
  transform: scale(0.6);
}

.reg-container .reg-container-right {
  width: 40vw;
  height: 100vh;
  position: relative;
  right: 100px;
  display: flex;
  flex-direction: column;
}

.reg-container-right .right-reg-logo {
  width: 100%;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: var(--fs-20);
  font-family: var(--ff-hymhtw);
  margin-top: 50px;
}

.reg-container-right .right-reg-logo img {
  width: 40px;
  height: 40px;
}

/* 注册主体Start */
.reg-container-right .right-reg-main {
  width: 50%;
  height: 75vh;
  margin: 0 auto;
}

.right-reg-main .right-reg-main-input-field {
  position: relative;
  width: 100%;
  margin-top: 20px;
}

.right-reg-main .input {
  margin-top: 15px;
  width: 100%;
  outline: none;
  border-radius: var(--radius-8);
  height: 45px;
  border: 1.5px solid #ecedec;
  background: transparent;
  padding-left: 10px;
}

.verify-code {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.verify-code button {
  width: 25%;
  margin-top: 15px;
  height: 45px;
  font-size: var(--fs-14);
  letter-spacing: 2px;
  border-radius: var(--radius-10);
  background-color: var(--deongaree);
  color: var(--light-white);
  transition: var(--transition-1);
}

.verify-code button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.verify-code button:hover:not(:disabled) {
  transform: scale(1.05);
  transition: var(--transition-1);
}

.verify-code .input {
  width: 70%;
}

.right-reg-main .input:focus {
  border: 1.5px solid var(--deongaree);
}

.right-reg-main .right-reg-main-input-field .label {
  position: absolute;
  top: 25px;
  left: 15px;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 2;
}

.right-reg-main .right-reg-main-input-field .input:focus ~ .label,
.right-reg-main .right-reg-main-input-field .input:valid ~ .label {
  top: 5px;
  left: 5px;
  font-size: var(--fs-12);
  color: var(--deongaree);
  background-color: #ffffff;
  padding-left: 5px;
  padding-right: 5px;
}

.right-reg-main .right-reg-main-submitBtn {
  margin-top: 20px;
}

.right-reg-main .right-reg-main-submitBtn button {
  width: calc(100% + 10px);
  height: 45px;
  border-radius: var(--radius-8);
  color: var(--light-white);
  font-size: var(--fs-18);
  letter-spacing: 5px;
  font-weight: var(--fw-600);
  background-color: var(--deongaree);
}

.right-reg-main .right-reg-main-submitBtn button:hover {
  background-color: var(----light-white);
  border: 2px solid var(--deongaree);
  color: var(--deongaree);
  transition: var(--transition-4);
}

.right-reg-main .right-reg-main-line {
  margin: 35px 0;
}

.right-reg-main .right-reg-main-line img {
  width: 100%;
}

.right-reg-main .right-reg-main-toLogin {
  display: flex;
  font-size: var(--fs-14);
  justify-content: center;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.right-reg-main .toLogin {
  color: var(--deongaree);
  cursor: pointer;
  transition: var(--transition-1);
}

.right-reg-main .toLogin:hover {
  padding: 0 2px;
  color: var(--danger);
}
/* 注册主体End */

.email-field {
  position: relative;
}

.email-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.email-suggestions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.email-suggestions li {
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.9rem;
}

.email-suggestions li:hover,
.email-suggestions li.active {
  background-color: rgba(63, 72, 204, 0.1);
  color: var(--deongaree);
}
</style>
