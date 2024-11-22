<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>宠物百科</h4>
        <ul>
          <li>猫咪百科</li>
          <li>狗狗百科</li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>宠物商城</h4>
        <ul>
          <li>宠物食品</li>
          <li>宠物玩具</li>
          <li>宠物服装</li>
          <li>宠物用品</li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>宠物服务</h4>
        <ul>
          <li>宠物医疗</li>
          <li>宠物领养</li>
          <li>宠物托管</li>
          <li>宠物托运</li>
          <li>线下门店</li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>公司</h4>
        <ul>
          <li>关于我们</li>
          <li>工作机会</li>
          <li>联系我们</li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="social-links">
        <i class="fab fa-twitter"></i>
        <i class="fab fa-linkedin"></i>
        <i class="fab fa-facebook"></i>
        <i class="fab fa-youtube"></i>
      </div>
      <div class="legal-links"><span>隐私政策</span> <span>服务条款</span></div>
      <p class="copyright">
        © 2024 &nbsp; KiriPet &nbsp; <span>赣ICP备2024047770号-1</span>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: #f8f9fad3;
  padding: 4rem 2rem 2rem;
  margin-top: 2rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
    margin-bottom: 2rem;
  }

  .footer-section {
    h4 {
      color: #1b1b1b;
      margin-bottom: 1.5rem;
      font-size: 20px;
    }

    ul {
      list-style: none;

      li {
        margin-bottom: 0.8rem;
        color: #666;
        text-decoration: none;
        transition: color 0.3s;
        font-size: 16px;

        &:hover {
          color: #565bef;
        }
      }
    }
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
    border-top: 1px solid #ddd;
    text-align: center;

    .social-links {
      margin-bottom: 1.5rem;

      i {
        color: #666;
        font-size: 1.5rem;
        margin: 0 1rem;
        transition: color 0.3s;

        &:hover {
          color: #565bef;
        }
      }
    }

    .legal-links {
      margin-bottom: 1rem;

      span {
        color: #666;
        text-decoration: none;
        margin: 0 1rem;
        font-size: 0.9rem;

        &:hover {
          color: #565bef;
        }
      }
    }

    .copyright {
      color: #999;
      font-size: 0.9rem;
    }
  }
}
</style>
