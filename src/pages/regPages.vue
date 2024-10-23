<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

import { ref } from "vue";
import { registerAPI, sendVerificationCodeAPI } from "@/apis/user.js";

const user_name = ref("");
const email = ref("");
const password = ref("");
const code = ref("");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 验证码
const verify = () => {
  if (!email.value || !emailRegex.test(email.value)) {
    alert("请输入邮箱！");
  } else {
    console.log(email.value);
    sendVerificationCodeAPI(email.value).then((res) => {
      const { data } = res;
      console.log(data.message);
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
    alert("请填写所有必填项");
    return;
  }
  registerAPI(user_name.value, password.value, email.value, code.value).then(
    (res) => {
      const { data } = res;
      console.log(data);
    }
  );

  user_name.value = "";
  password.value = "";
  email.value = "";
  code.value = "";

  router.push("/login");
};
</script>

<template>
  <div class="reg-container">
    <div class="reg-container-reg">
      <div class="reg-container-reg-text">
        <p>你想知道的你所不知道的都在这里...</p>
        <p>现在加入<span>KiriPet!</span></p>
        <p>带你走入毛茸茸宠物的世界</p>
      </div>
      <div class="reg-container-reg-svg">
        <img src="../assets/image/undraw_friends_r511.svg" alt="" />
      </div>
    </div>
    <div class="reg-container-right">
      <div class="right-reg-logo">
        <img src="@/assets/image/logo.png" @click="router.push('/home')" />
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
        <div class="right-reg-main-input-field">
          <input required="true" class="input" type="email" v-model="email" />
          <label class="label" for="input">输入邮箱</label>
        </div>
        <div class="right-reg-main-input-field verify-code">
          <input required="" class="input" type="text" v-model="code" />
          <label class="label" for="input">输入验证码</label>
          <button @click="verify">验证</button>
        </div>
        <div class="right-reg-main-input-field">
          <input required="" class="input" type="password" v-model="password" />
          <label class="label" for="input">输入密码</label>
        </div>
        <div class="right-reg-main-submitBtn">
          <button @click="register()">注册</button>
        </div>
        <div class="right-reg-main-line">
          <img src="../assets/image/dots.svg" />
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
}

.verify-code button:hover {
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
</style>
