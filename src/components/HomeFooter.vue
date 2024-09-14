<script setup></script>

<template>
  <div class="home-footer">
    <div class="home-footer-container">
      <div class="home-footer-left">
        <div class="home-footer-left-logo">
          <img src="@/assets/image/logo.png" />
          <h2>KiriPet</h2>
        </div>
        <div class="home-footer-left-list">
          <div class="home-footer-left-list-title">专业的宠物服务平台</div>
          <div class="home-footer-left-list-social">
            <div class="home-footer-left-list-social-icon">
              <img src="../assets/image/facebook.png" />
            </div>
            <div class="home-footer-left-list-social-icon">
              <img src="../assets/image/telegram.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="home-footer-right">
        <div class="home-footer-right-list">
          <div class="home-footer-right-list-item">
            <div class="home-footer-right-list-item-title">宠物百科</div>
            <div class="home-footer-right-list-item-sub">
              <div class="home-footer-right-list-item-subTi">猫科</div>
              <div class="home-footer-right-list-item-subTi">犬科</div>
            </div>
          </div>
          <div class="home-footer-right-list-item">
            <div class="home-footer-right-list-item-title">宠物领养</div>
            <div class="home-footer-right-list-item-sub">
              <div class="home-footer-right-list-item-subTi">可爱小猫</div>
              <div class="home-footer-right-list-item-subTi">可爱小狗</div>
            </div>
          </div>
          <div class="home-footer-right-list-item">
            <div class="home-footer-right-list-item-title">宠物商城</div>
            <div class="home-footer-right-list-item-sub">
              <div class="home-footer-right-list-item-subTi">宠物食物</div>
              <div class="home-footer-right-list-item-subTi">宠物用品</div>
            </div>
          </div>
          <div class="home-footer-right-list-item">
            <div class="home-footer-right-list-item-title">宠物乐园</div>
            <div class="home-footer-right-list-item-sub">
              <div class="home-footer-right-list-item-subTi">宠物分享</div>
              <div class="home-footer-right-list-item-subTi">动态</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-footer {
  width: 100%;
  height: 15vh;
  font-family: var(--ff-almm);
  background-color: var(--deongaree);
}

.home-footer-container {
  width: 56%;
  height: 100%;
  display: flex;
  margin: 0 auto;
}

.home-footer-left {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-left: 100px;
  flex-direction: column;
}

.home-footer-left .home-footer-left-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  color: var(--light-white);
  font-size: var(--fs-20);
  font-family: var(--ff-hymhtw);
}
.home-footer-left .home-footer-left-logo img {
  width: 30px;
  height: 30px;
}

.home-footer-left-list {
  display: flex;
  flex-direction: column;
}

.home-footer-left-list-title {
  font-size: var(--fs-14);
  margin: 10px 0;
  color: var(--light-white);
  letter-spacing: 1px;
  font-family: var(--ff-llt);
}

.home-footer-left-list-social {
  display: flex;
}

.home-footer-left-list-social img {
  width: 30px;
  height: 30px;
}

.home-footer-left-list-social-icon {
  margin-right: 10px;
}

.home-footer-left-list-social-icon:hover{
    transform: translateY(-5px);
    cursor: pointer;
    transition: var(--transition-3);
}

.home-footer-container .home-footer-right {
  width: 60%;
  height: 100%;
}

.home-footer-right-list {
  display: flex;
  height: 100%;
  color: var(--light-white);
  font-family: var(--ff-llt);
  justify-content: end;
  align-items: center;
}

.home-footer-right-list-item {
  width: 150px;
  display: flex;
  flex-direction: column;
  text-align: start;
}

.home-footer-right-list-item-title {
  margin: 10px 0;
  font-size: var(--fs-18);
}

.home-footer-right-list-item-subTi {
  font-size: var(--fs-14);
}

.home-footer-right-list-item-subTi:hover {
  color: var(--danger);
  transition:var(--transition-3);
}
</style>

