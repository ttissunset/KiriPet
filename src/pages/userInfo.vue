<script setup>
import { ref } from "vue";

const nickname = ref("");
const description = ref("");
const sex = ref("");
const birthday = ref("");
const address = ref("");
</script>

<template>
  <div class="userinfo-container">
    <div class="userinfo-header">
      <h2>编辑个人信息</h2>
    </div>
    <div class="userinfo-main">
      <div class="mian-left">
        <div class="info-item">
          <div class="item-name">昵称：</div>
          <div class="input-wrapper">
            <input
              type="text"
              placeholder="输入您的昵称"
              name="text"
              class="input"
              v-model="nickname"
            />
          </div>
        </div>
        <div class="info-item" style="height: 150px">
          <div class="item-name">简介:</div>
          <div class="input-wrapper">
            <textarea
              required=""
              cols="50"
              rows="10"
              id="textarea"
              name="textarea"
              v-model="description"
            >
            </textarea>
          </div>
        </div>
        <div class="info-item">
          <div class="input-wrapper">
            <input
              type="text"
              placeholder="Type here..."
              name="text"
              class="input"
            />
          </div>
        </div>
      </div>
      <div class="mian-right"></div>
    </div>
  </div>
</template>

<style scoped>
.userinfo-container {
  width: 56%;
  height: 100vh;
  margin: 0 auto;
  /* background-color: rgb(238, 234, 226); */
}

.userinfo-header {
  display: flex;
  align-items: center;
  height: 10vh;
}

.userinfo-main {
  width: 100%;
  height: 90vh;
  border-radius: var(--radius-8);
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: space-between;
}

.mian-left {
  width: 64%;
}

.mian-right {
  width: 33%;
}

.info-item {
  width: 90%;
  height: 70px;
  display: flex;
  padding-top: 20px;
}

.item-name {
  width: 70px;
}

.input-wrapper input {
  background-color: #eee;
  border: none;
  padding: 10px;
  font-size: 1rem;
  width: 200%;
  border-radius: 10px;
  cursor: pointer;
}

.input-wrapper input:focus {
  outline-color: lightcoral;
}

.input-wrapper textarea {
  width: 104%;
  padding: 12px 16px;
  border-radius: 8px;
  resize: none;
  height: 96px;
  border: 1px solid #414141;
  background-color: transparent;
  font-family: inherit;
}

.input-wrapper textarea:focus {
  outline-color: lightcoral;
}
</style>
