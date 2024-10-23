<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

import { ref } from "vue";
import { useUserStore } from "@/stores/useStore";

const user_name = ref("");
const password = ref("");
const userStore = useUserStore();

// 登录
const login = async () => {
  if (user_name.value === "" || password.value === "") {
    alert("请填写所有必填项");
    return;
  }

  await userStore.getUserInfo(user_name.value, password.value);
  router.push("/home");
};

// const ouath = () => {
//   window.location.href =
//     "";
// };
</script>

<template>
  <div class="login-container">
    <div class="login-container-left">
      <div class="left-login-logo">
        <img src="@/assets/image/logo.png" @click="router.push('/home')" />
        <h2 @click="router.push('/home')">KiriPet</h2>
      </div>
      <div class="left-login-main">
        <h1>登录</h1>
        <div class="left-login-main-input-field">
          <input
            required="true"
            class="input"
            type="text"
            v-model="user_name"
          />
          <label class="label" for="input">输入用户名</label>
        </div>
        <div class="left-login-main-input-field">
          <input
            required="true"
            class="input"
            type="password"
            v-model="password"
          />
          <label class="label" for="input">输入密码</label>
        </div>
        <!-- <div class="left-login-main-remember">
          <label class="left-login-main-remember-checkbox">
            <input type="checkbox" id="checkbox" />
          </label>
          <label for="checkbox" class="left-login-main-remember-checkbox-text"
            >记住我</label
          >
        </div> -->
        <div class="left-login-main-submitBtn">
          <button @click="login()">登录</button>
        </div>
        <div class="left-login-main-line">
          <img src="../assets/image/dots.svg" />
        </div>
        <div class="left-login-main-toReg">
          <span>还没有账户?</span>
          <div class="toReg" @click="router.push('/reg')">现在注册</div>
        </div>
        <div class="left-login-main-authLogin">
          <div class="authLogin-google">
            <img src="../assets/image/google.png" alt="" /><span
              >Sign In With Google</span
            >
          </div>
          <div class="authLogin-github" @click="ouath">
            <img src="../assets/image/github.png" />
            <span>Sign In With Github</span>
          </div>
          <div class="authLogin-apple">
            <img src="../assets/image/apple.png" alt="" /><span
              >Sign In With Apple</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="login-container-right">
      <div class="login-container-right-text">
        <p>你想知道的你所不知道的都在这里...</p>
        <p>现在加入<span>KiriPet!</span></p>
        <p>带你走入毛茸茸宠物的世界</p>
      </div>
      <div class="login-container-right-svg">
        <img src="../assets/image/undraw_welcome_cats_thqn.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.login-container .login-container-left {
  width: 40vw;
  height: 100vh;
  position: relative;
  left: 100px;
  display: flex;
  flex-direction: column;
}

.login-container-left .left-login-logo {
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

.login-container-left .left-login-logo img {
  width: 40px;
  height: 40px;
}

/* 注册主体Start */
.login-container-left .left-login-main {
  width: 50%;
  height: 75vh;
  margin: 0 auto;
}

.left-login-main .left-login-main-input-field {
  position: relative;
  width: 100%;
  margin-top: 20px;
}

.left-login-main .input {
  margin-top: 15px;
  width: 100%;
  outline: none;
  border-radius: var(--radius-8);
  height: 45px;
  border: 1.5px solid #ecedec;
  background: transparent;
  padding-left: 10px;
}
.left-login-main .input:focus {
  border: 1.5px solid var(--deongaree);
}
.left-login-main .left-login-main-input-field .label {
  position: absolute;
  top: 25px;
  left: 15px;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 2;
}
.left-login-main .left-login-main-input-field .input:focus ~ .label,
.left-login-main .left-login-main-input-field .input:valid ~ .label {
  top: 5px;
  left: 5px;
  font-size: var(--fs-12);
  color: var(--deongaree);
  background-color: #ffffff;
  padding-left: 5px;
  padding-right: 5px;
}

/* .left-login-main .left-login-main-remember {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
}

.left-login-main .left-login-main-remember-checkbox input {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.left-login-main .left-login-main-remember-checkbox-text {
  margin-left: 5px;
  cursor: pointer;
  font-size: var(--fs-14);
  color: var(--dark-variant);
} */

.left-login-main .left-login-main-submitBtn {
  margin-top: 30px;
}

.left-login-main .left-login-main-submitBtn button {
  width: calc(100% + 10px);
  height: 45px;
  border-radius: var(--radius-8);
  color: var(--light-white);
  font-size: var(--fs-18);
  letter-spacing: 5px;
  font-weight: var(--fw-600);
  background-color: var(--deongaree);
}

.left-login-main .left-login-main-submitBtn button:hover {
  background-color: var(----light-white);
  border: 2px solid var(--deongaree);
  color: var(---deongaree);
  transition: var(--transition-4);
}

.left-login-main .left-login-main-line {
  margin: 35px 0;
}

.left-login-main .left-login-main-line img {
  width: 100%;
}

.left-login-main .left-login-main-toReg {
  display: flex;
  font-size: var(--fs-14);
  justify-content: center;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.left-login-main .toReg {
  color: var(--blue-crayola);
  cursor: pointer;
  transition: var(--transition-1);
}

.left-login-main .toReg:hover {
  padding: 0 2px;
  color: var(--danger);
}

.left-login-main .left-login-main-authLogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.left-login-main-authLogin img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.left-login-main-authLogin .authLogin-google {
  width: calc(100% + 10px);
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-8);
  color: var(--black);
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  margin: 10px 0;
  border: 1px solid var(--dark-variant);
  box-sizing: border-box;
}

.left-login-main-authLogin .authLogin-google img {
  width: 25px;
  height: 25px;
}

.left-login-main-authLogin .authLogin-github {
  width: calc(100% + 10px);
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-8);
  color: var(--light-white);
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  margin: 10px 0;
  background-color: var(--blue-crayola);
}

.left-login-main-authLogin .authLogin-apple {
  width: calc(100% + 10px);
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-8);
  color: var(--light-white);
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  margin: 10px 0;
  background-color: var(--black);
}

.left-login-main-authLogin div:hover {
  background-color: var(--deongaree);
  color: var(--light-white);
  border: none;
  transition: var(--transition-4);
}
/* 登录主体End */

.login-container .login-container-right {
  width: 60vw;
  height: 100vh;
}

.login-container-right .login-container-right-text {
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  /* background-color: #2d79f3; */
  color: var(--dark);
  align-items: center;
  justify-content: end;
  font-size: var(--fs-48);
  font-weight: var(--fw-600);
  font-family: var(--ff-hymhtw);
  letter-spacing: 5px;
}

.login-container-right-text span {
  font-size: var(--fs-60);
  color: var(--deongaree);
}

.login-container-right-text span:hover {
  color: var(--danger);
  transition: var(--transition-4);
}
.login-container-right .login-container-right-svg {
  display: flex;
  height: 70vh;
  justify-content: center;
  align-items: center;
}

.login-container-right .login-container-right-svg img {
  transform: scale(0.8);
}
</style>
