<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>宠物百科</h4>
          <ul>
            <li><a href="#">猫咪百科</a></li>
            <li><a href="#">狗狗百科</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>宠物商城</h4>
          <ul>
            <li><a href="#">宠物食品</a></li>
            <li><a href="#">宠物玩具</a></li>
            <li><a href="#">宠物服装</a></li>
            <li><a href="#">宠物用品</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>宠物服务</h4>
          <ul>
            <li><a href="#">宠物医疗</a></li>
            <li><a href="#">宠物领养</a></li>
            <li><a href="#">宠物托管</a></li>
            <li><a href="#">宠物托运</a></li>
            <li><a href="#">线下门店</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>关于</h4>
          <ul>
            <li><a href="#">关于我们</a></li>
            <li><a href="#">工作机会</a></li>
            <li><a href="#">联系我们</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="social-links">
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
        </div>
        <div class="legal-links">
          <a href="#">隐私政策</a>
          <span class="divider">·</span>
          <a href="#">服务条款</a>
        </div>
        <p class="copyright">
          © 2024 &nbsp; KiriPet. All rights reserved. Made By Kiri&nbsp;
          <a href="https://beian.miit.gov.cn" target="_blank"
            >赣ICP备2024047770号-1</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 0;
  margin-top: 3rem;
  border-top: 1px solid #eee;
  color: #212529;
}

.footer-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 4rem 1rem 1.5rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-section h4 {
  color: #212529;
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-section h4:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #565bef;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 0.75rem;
}

.footer-section ul li a {
  color: #6c757d;
  text-decoration: none;
  transition: color 0.2s ease-in-out, padding-left 0.2s ease-in-out;
  display: inline-block;
  font-size: 1rem;
}

.footer-section ul li a:hover {
  color: #565bef;
  padding-left: 5px;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid #eee;
  text-align: center;
}

.social-links {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f8f9fa;
  border-radius: 50%;
  color: #6c757d;
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.social-icon:hover {
  color: #fff;
  background-color: #565bef;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.legal-links {
  margin-bottom: 1rem;
}

.legal-links a {
  color: #6c757d;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.legal-links a:hover {
  color: #565bef;
}

.divider {
  margin: 0 10px;
  color: #6c757d;
}

.copyright {
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 1.5rem;
}

.copyright a {
  color: #6c757d;
  text-decoration: none;
  transition: color 0.2s;
}

.copyright a:hover {
  color: #565bef;
}

/* 响应式布局 - 大屏幕 */
@media screen and (max-width: 1399px) {
  .footer-container {
    max-width: 1140px;
  }
}

/* 响应式布局 - 中等大屏幕 */
@media screen and (max-width: 1199px) {
  .footer-container {
    max-width: 960px;
  }

  .footer-content {
    gap: 1.5rem;
  }
}

/* 响应式布局 - 中等屏幕 */
@media screen and (max-width: 991px) {
  .footer-container {
    max-width: 720px;
    padding: 3rem 1rem 1.5rem;
  }

  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 3rem;
  }

  .footer-section h4 {
    font-size: 18px;
  }

  .footer-section ul li a {
    font-size: 14px;
  }

  .copyright a {
    font-size: 0.8rem;
  }
}

/* 响应式布局 - 平板 */
@media screen and (max-width: 767px) {
  .footer-container {
    max-width: 540px;
    padding: 2.5rem 1rem 1.5rem;
  }

  .footer-content {
    gap: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .footer-section h4:after {
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
  }

  .footer-section ul li a:hover {
    padding-left: 0;
  }

  .social-icon {
    width: 36px;
    height: 36px;
  }
}

/* 响应式布局 - 移动设备 */
@media screen and (max-width: 575px) {
  .footer-container {
    padding: 2rem 1rem 1rem;
  }

  .footer-content {
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .footer-section h4 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .footer-section ul li {
    margin-bottom: 0.5rem;
  }

  .footer-section ul li a {
    font-size: 0.9rem;
  }

  .legal-links {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .divider {
    display: none;
  }
}
</style>
