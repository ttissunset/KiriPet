<script setup>
import ChatFriend from "../components/Chat/ChatFriend.vue";
import ChatMain from "../components/Chat/ChatMain.vue";
</script>

<template>
  <div class="chat-container">
    <ChatFriend></ChatFriend>
    <ChatMain></ChatMain>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>
