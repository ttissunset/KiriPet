<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <HomeHeader></HomeHeader>
  <div class="user-container">
    <div class="main-container">
      <!-- 个人信息头部 -->
      <div class="profile-header">
        <div class="profile-main">
          <div class="avatar-section">
            <img
              class="avatar"
              src="https://kiripet.tos-cn-beijing.volces.com/image/a1.png"
            />
          </div>
          <div class="profile-info">
            <h1 class="profile-name">
              [勢いにまかせて！]鬼塚夏美
              <svg
                t="1730014560457"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2358"
                width="25"
                height="25"
              >
                <path
                  d="M956.672 459.776L862.72 397.568c-16.64-11.008-24.832-30.976-20.992-50.688l22.272-110.592c4.096-20.736-2.304-42.24-17.152-57.344-15.104-15.104-36.352-21.504-57.344-17.152l-110.592 22.272c-19.712 4.096-39.424-4.352-50.688-20.992L565.76 69.12c-11.776-17.664-31.488-28.16-52.736-28.16s-40.96 10.496-52.736 28.16l-62.464 93.952c-11.008 16.64-30.976 24.832-50.688 20.992l-110.592-22.272c-20.736-4.096-42.24 2.304-57.344 17.152-15.104 15.104-21.504 36.352-17.152 57.344l22.272 110.592c3.84 19.712-4.352 39.424-20.992 50.688l-93.952 62.464c-17.664 11.776-28.16 31.488-28.16 52.736s10.496 40.96 28.16 52.736l93.952 62.464c16.64 11.008 24.832 30.976 20.992 50.688l-22.272 110.592c-4.096 20.736 2.304 42.24 17.152 57.344 15.104 15.104 36.352 21.504 57.344 17.152l110.592-22.272c19.712-4.096 39.424 4.352 50.688 20.992l62.464 93.952c11.776 17.664 31.488 28.16 52.736 28.16s40.96-10.496 52.736-28.16l62.464-93.952c11.008-16.64 30.976-24.832 50.688-20.992l110.592 22.272c20.736 4.096 42.24-2.304 57.344-17.152 15.104-15.104 21.504-36.352 17.152-57.344l-22.272-110.592c-3.84-19.712 4.352-39.424 20.992-50.688l93.952-62.464c17.664-11.776 28.16-31.488 28.16-52.736s-10.496-41.216-28.16-52.992z m-249.344-22.016l-211.456 215.04c-5.888 6.144-13.824 9.216-22.016 9.216-7.168 0-14.592-2.56-20.224-7.68l-138.24-122.112c-12.8-11.264-13.824-30.72-2.816-43.264 11.264-12.8 30.72-13.824 43.264-2.816l116.48 102.912 190.976-194.304c11.776-12.032 31.232-12.288 43.52-0.256 12.288 11.52 12.288 30.976 0.512 43.264z"
                  fill="#8b98e4"
                  p-id="2359"
                ></path>
              </svg>
            </h1>
            <div class="profile-stats">
              <div class="stat-item">
                <div class="stat-number">
                  1,354 <span class="stat-label">关注</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-number">
                  18.2w <span class="stat-label">粉丝</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-number">
                  152.3w <span class="stat-label">获赞</span>
                </div>
              </div>
            </div>
            <div class="profile-id">uid: k11111111</div>
            <div class="profile-tag"><span>简介：</span>资深宠物爱好者</div>
            <div class="action-buttons">
              <button class="btn btn-primary" @click="router.push('/userinfo')">
                编辑资料
              </button>
              <button class="btn btn-secondary">分享主页</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-section">
        <div class="tabs">
          <div class="tab active">我的动态</div>
          <div class="tab">
            喜欢 <i class="fa-regular fa-heart"></i>
            <!-- <i class="fa-solid fa-heart"></i> -->
          </div>
          <div class="tab">收藏 <i class="fa-regular fa-star"></i></div>
        </div>
        <div class="moments-container">
          <!-- 动态项目 -->
          <div class="moment-item">
            <div class="moment-header">
              <img
                class="moment-avatar"
                src="https://kiripet.tos-cn-beijing.volces.com/image/a1.png"
              />
              <div class="moment-info">
                <div class="moment-name">鬼塚夏美</div>
                <div class="moment-time">2小时前</div>
              </div>
            </div>
            <div class="moment-content">
              分享我家可爱的小猫咪，他们真的很可爱！！
              <div class="moment-tag">#布偶猫 #可爱猫咪</div>
            </div>
            <div class="moment-images">
              <img
                class="moment-image"
                src="https://kiripet.tos-cn-beijing.volces.com/image/cat-1.jpg"
              />
              <img
                class="moment-image"
                src="https://kiripet.tos-cn-beijing.volces.com/image/cat-10.jpg"
              />
              <img
                class="moment-image"
                src="https://kiripet.tos-cn-beijing.volces.com/image/cat-11.jpg"
              />
              <img
                class="moment-image"
                src="https://kiripet.tos-cn-beijing.volces.com/image/cat-1.jpg"
              />
              <img
                class="moment-image"
                src="https://kiripet.tos-cn-beijing.volces.com/image/cat-10.jpg"
              />
              <img
                class="moment-image"
                src="https://kiripet.tos-cn-beijing.volces.com/image/cat-11.jpg"
              />
              <img
                class="moment-image"
                src="https://kiripet.tos-cn-beijing.volces.com/image/cat-1.jpg"
              />
              <img
                class="moment-image"
                src="https://kiripet.tos-cn-beijing.volces.com/image/cat-10.jpg"
              />
              <img
                class="moment-image"
                src="https://kiripet.tos-cn-beijing.volces.com/image/cat-11.jpg"
              />
            </div>
            <div class="moment-actions">
              <div class="action-item">
                <i class="far fa-heart"></i>
                <span>1,234</span>
              </div>
              <div class="action-item">
                <i class="far fa-comment"></i>
                <span>89</span>
              </div>
              <div class="action-item">
                <i class="far fa-share-square"></i>
                <span>46</span>
              </div>
            </div>
          </div>

          <!-- 更多动态项目 -->
          <div class="moment-item">
            <div class="moment-header">
              <img
                class="moment-avatar"
                src="https://kiripet.tos-cn-beijing.volces.com/image/a1.png"
                alt="头像"
              />
              <div class="moment-info">
                <div class="moment-name">鬼塚夏美</div>
                <div class="moment-time">昨天</div>
              </div>
            </div>
            <div class="moment-content">
              今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。
              今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。
              今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。
              今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。
              今天参加了宠物知识享会，收获满满！讨论了很多关于宠物基本知识和高级知识的话题，准备写篇文章总结一下。
              <div class="moment-tag">#宠物大会</div>
            </div>
            <div class="moment-images">
              <!-- <img class="moment-image" src="@/assets/image/cat-1.jpg" />
            <img class="moment-image" src="@/assets/image/cat-10.jpg" />
            <img class="moment-image" src="@/assets/image/cat-11.jpg" /> -->
            </div>
            <div class="moment-actions">
              <div class="action-item">
                <i class="far fa-heart"></i>
                <span>876</span>
              </div>
              <div class="action-item">
                <i class="far fa-comment"></i>
                <span>54</span>
              </div>
              <div class="action-item">
                <i class="far fa-share-square"></i>
                <span>23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar-container">
      <div class="siderbar-top">
        <div class="container">
          <div class="coffee-header">
            <div class="coffee-header__buttons coffee-header__button-one"></div>
            <div class="coffee-header__buttons coffee-header__button-two"></div>
            <div class="coffee-header__display"></div>
            <div class="coffee-header__details"></div>
          </div>
          <div class="coffee-medium">
            <div class="coffe-medium__exit"></div>
            <div class="coffee-medium__arm"></div>
            <div class="coffee-medium__liquid"></div>
            <div class="coffee-medium__smoke coffee-medium__smoke-one"></div>
            <div class="coffee-medium__smoke coffee-medium__smoke-two"></div>
            <div class="coffee-medium__smoke coffee-medium__smoke-three"></div>
            <div class="coffee-medium__smoke coffee-medium__smoke-for"></div>
            <div class="coffee-medium__cup"></div>
          </div>
          <div class="coffee-footer"></div>
        </div>
      </div>
      <div class="siderbar-sub">
        <div class="sidersub-header">
          <h2>注意事项</h2>
          <span class="material-icons-sharp"> notifications_none </span>
        </div>

        <div class="notification">
          <div class="icon">
            <span class="material-icons-sharp"> volume_up </span>
          </div>
          <div class="content">
            <div class="info">
              <h3>给王美丽回电话</h3>
              <small class="text_muted"> 09:00 AM</small>
            </div>
            <span class="material-icons-sharp"> more_vert </span>
          </div>
        </div>

        <div class="notification deactive">
          <div class="icon">
            <span class="material-icons-sharp"> edit </span>
          </div>
          <div class="content">
            <div class="info">
              <h3>增删改查</h3>
              <small class="text_muted"> 08:00 AM - 12:00 PM </small>
            </div>
            <span class="material-icons-sharp"> more_vert </span>
          </div>
        </div>

        <div class="notification add-reminder">
          <div>
            <span class="material-icons-sharp"> add </span>
            <h3>新增事项</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-container {
  width: 76%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
}

.main-container {
  width: 60%;
}

.profile-header {
  background: linear-gradient(rgba(70, 67, 67, 0.5), rgba(63, 60, 60, 0.5)),
    url(@/assets/image/08.jpg) no-repeat center/cover;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.profile-main {
  display: flex;
  gap: 24px;
}

.avatar-section {
  position: relative;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--deongaree);
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  transform: rotate(3600deg);
}

.profile-info {
  position: relative;
  flex: 1;
}

.profile-name {
  font-size: 24px;
  font-weight: var(--fw-700);
  margin-bottom: 8px;
  display: flex;
  color: #fff;
  align-items: center;
  gap: 8px;
}

.profile-id {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.profile-stats {
  display: flex;
  gap: 48px;
  margin-bottom: 10px;
}

.stat-item {
  color: #fff;
  cursor: pointer;
}

.stat-number {
  font-weight: 600;
  font-size: 18px;
}

.stat-label {
  color: #bec6d1;
  font-size: 14px;
  font-weight: var(--fw-500);
}

.profile-tag {
  font-size: var(--fs-14);
  font-weight: var(--fw-500);
  color: #fff;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btn {
  padding: 8px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--deongaree);
  color: white;
  border: none;
}

.btn-secondary {
  background: transparent;
  border: 1px solid #e6e6e6;
  color: var(--deongaree);
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  transition: var(--transition-1);
}

/* 内容区域 */
.content-section {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tabs {
  display: flex;
  /* border-bottom: 1px solid #c5a8a8; */
  padding: 0 20px;
}

.tab {
  padding: 16px 32px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  color: #73767a;
  transition: color 0.3s ease;
}

.tab.active {
  color: var(--deongaree);
}

.tab.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--deongaree);
}

/* 动态内容 */
.moments-container {
  padding: 20px;
}

.moment-item {
  padding: 20px;
  /* border-bottom: 1px solid #c5a8a8; */
  border-radius: var(--radius-8);
  box-shadow: 0 1px 1px #bdc2c9;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.moment-item:hover {
  background-color: #fafafa;
}

.moment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.moment-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}

.moment-info {
  flex: 1;
}

.moment-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.moment-time {
  font-size: 12px;
  color: var(--light-gray);
}

.moment-content {
  margin-bottom: 16px;
  font-size: 15px;
  line-height: 1.6;
}

.moment-tag {
  color: var(--deongaree);
}

.moment-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 15px;
  margin-bottom: 16px;
}

.moment-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  /* background-color: #e21b1b; */
  transition: transform 0.3s ease;
}

.moment-image:hover {
  transform: scale(1.02);
}

.moment-actions {
  display: flex;
  gap: 32px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #73767a;
  cursor: pointer;
  transition: color 0.3s ease;
}

.action-item:hover {
  color: var(--dark-pink);
}

.sidebar-container {
  width: 30%;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 2fr;
  gap: 10px;
}

.siderbar-top {
  /* background-color: #6c9bcf; */
  box-shadow: var(--shadow-2);
  border-radius: var(--radius-10);
  position: relative;
}

.container {
  width: 300px;
  height: 280px;
  position: absolute;
  top: calc(50% - 140px);
  left: calc(50% - 150px);
}

.coffee-header {
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ddcfcc;
  border-radius: 10px;
}

.coffee-header__buttons {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 25px;
  background-color: #282323;
  border-radius: 50%;
}

.coffee-header__buttons::after {
  content: "";
  width: 8px;
  height: 8px;
  position: absolute;
  bottom: -8px;
  left: calc(50% - 4px);
  background-color: #615e5e;
}

.coffee-header__button-one {
  left: 15px;
}

.coffee-header__button-two {
  left: 50px;
}

.coffee-header__display {
  width: 50px;
  height: 50px;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  border-radius: 50%;
  background-color: #9acfc5;
  border: 5px solid #43beae;
  box-sizing: border-box;
}

.coffee-header__details {
  width: 8px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #9b9091;
  box-shadow: -12px 0 0 #9b9091, -24px 0 0 #9b9091;
}

.coffee-medium {
  width: 90%;
  height: 160px;
  position: absolute;
  top: 80px;
  left: calc(50% - 45%);
  background-color: #bcb0af;
}

.coffee-medium:before {
  content: "";
  width: 90%;
  height: 100px;
  background-color: #776f6e;
  position: absolute;
  bottom: 0;
  left: calc(50% - 45%);
  border-radius: 20px 20px 0 0;
}

.coffe-medium__exit {
  width: 60px;
  height: 20px;
  position: absolute;
  top: 0;
  left: calc(50% - 30px);
  background-color: #231f20;
}

.coffe-medium__exit::before {
  content: "";
  width: 50px;
  height: 20px;
  border-radius: 0 0 50% 50%;
  position: absolute;
  bottom: -20px;
  left: calc(50% - 25px);
  background-color: #231f20;
}

.coffe-medium__exit::after {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: -30px;
  left: calc(50% - 5px);
  background-color: #231f20;
}

.coffee-medium__arm {
  width: 70px;
  height: 20px;
  position: absolute;
  top: 15px;
  right: 25px;
  background-color: #231f20;
}

.coffee-medium__arm::before {
  content: "";
  width: 15px;
  height: 5px;
  position: absolute;
  top: 7px;
  left: -15px;
  background-color: #9e9495;
}

.coffee-medium__cup {
  width: 80px;
  height: 47px;
  position: absolute;
  bottom: 0;
  left: calc(50% - 40px);
  background-color: #fff;
  border-radius: 0 0 70px 70px / 0 0 110px 110px;
}

.coffee-medium__cup::after {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  top: 6px;
  right: -13px;
  border: 5px solid #fff;
  border-radius: 50%;
}

@keyframes liquid {
  0% {
    height: 0px;
    opacity: 1;
  }
  5% {
    height: 0px;
    opacity: 1;
  }
  20% {
    height: 62px;
    opacity: 1;
  }
  95% {
    height: 62px;
    opacity: 1;
  }
  100% {
    height: 62px;
    opacity: 0;
  }
}

.coffee-medium__liquid {
  width: 6px;
  height: 63px;
  opacity: 0;
  position: absolute;
  top: 50px;
  left: calc(50% - 3px);
  background-color: #74372b;
  animation: liquid 4s 4s linear infinite;
}

.coffee-medium__smoke {
  width: 8px;
  height: 20px;
  position: absolute;
  border-radius: 5px;
  background-color: #b3aeae;
}

@keyframes smokeOne {
  0% {
    bottom: 20px;
    opacity: 0;
  }
  40% {
    bottom: 50px;
    opacity: 0.5;
  }
  80% {
    bottom: 80px;
    opacity: 0.3;
  }
  100% {
    bottom: 80px;
    opacity: 0;
  }
}

@keyframes smokeTwo {
  0% {
    bottom: 40px;
    opacity: 0;
  }
  40% {
    bottom: 70px;
    opacity: 0.5;
  }
  80% {
    bottom: 80px;
    opacity: 0.3;
  }
  100% {
    bottom: 80px;
    opacity: 0;
  }
}

.coffee-medium__smoke-one {
  opacity: 0;
  bottom: 50px;
  left: 102px;
  animation: smokeOne 3s 4s linear infinite;
}

.coffee-medium__smoke-two {
  opacity: 0;
  bottom: 70px;
  left: 118px;
  animation: smokeTwo 3s 5s linear infinite;
}

.coffee-medium__smoke-three {
  opacity: 0;
  bottom: 65px;
  right: 118px;
  animation: smokeTwo 3s 6s linear infinite;
}

.coffee-medium__smoke-for {
  opacity: 0;
  bottom: 50px;
  right: 102px;
  animation: smokeOne 3s 5s linear infinite;
}

.coffee-footer {
  width: 95%;
  height: 15px;
  position: absolute;
  bottom: 25px;
  left: calc(50% - 47.5%);
  background-color: #41bdad;
  border-radius: 10px;
}

.coffee-footer::after {
  content: "";
  width: 106%;
  height: 26px;
  position: absolute;
  bottom: -25px;
  left: -8px;
  background-color: #000;
}

.siderbar-sub {
  box-shadow: var(--shadow-2);
  padding: 15px;
  border-radius: var(--radius-10);
}

.siderbar-sub .sidersub-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.sidersub-header span {
  padding: 10px;
  box-shadow: var(--shadow-1);
  border-radius: 50%;
}

.notification {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 11px;
  padding: 22px 25px;
  border-radius: 10px;
  box-shadow: var(--shadow-5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.notification:hover {
  box-shadow: none;
}

.notification .content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  width: 100%;
}

.notification .icon {
  padding: 10px;
  color: #ffff;
  background-color: var(--success);
  border-radius: 20%;
  display: flex;
}

.notification.deactive .icon {
  background-color: var(--danger);
}

.add-reminder {
  background-color: #fff;
  border: 2px dashed var(--youth-blue-purple);
  color: var(--youth-blue-purple);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.add-reminder:hover {
  background-color: #6c9bcf;
  color: white;
}

.add-reminder div {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 768px) {
  .profile-main {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-stats {
    justify-content: center;
  }

  .action-buttons {
    justify-content: center;
  }

  .tabs {
    overflow-x: auto;
    white-space: nowrap;
  }

  .moment-images {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .profile-stats {
    gap: 24px;
  }

  .tab {
    padding: 12px 16px;
  }

  .moment-actions {
    gap: 16px;
  }
}
</style>
