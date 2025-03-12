<template>
  <div class="design-root">
    <div class="layout-container">
      <header class="header">
        <div class="logo-container">
          <div class="logo-icon">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 class="brand-name">San Francisco Coffee Co.</h2>
        </div>
        <div class="header-right">
          <div class="nav-links">
            <a class="nav-link" href="#">Coffee</a>
            <a class="nav-link" href="#">Subscriptions</a>
            <a class="nav-link" href="#">Gear</a>
            <a class="nav-link" href="#">Gifts</a>
          </div>
          <div class="header-buttons">
            <button class="icon-button">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"
                  ></path>
                </svg>
              </div>
            </button>
            <button class="icon-button">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
          <div class="profile-pic"></div>
        </div>
      </header>

      <div class="content-wrapper">
        <div class="content-container">
          <div class="hero-container">
            <div class="hero-banner">
              <div class="hero-content">
                <h1 class="hero-title">Coffee Subscriptions</h1>
                <h2 class="hero-subtitle">
                  Get our best coffee delivered to your door, as often as you
                  want. Plus, get free shipping on all subscriptions.
                </h2>
              </div>
              <label class="search-bar-container">
                <div class="search-bar">
                  <div class="search-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Enter an address to start"
                    class="search-input"
                    value=""
                  />
                  <div class="search-button-container">
                    <button class="search-button">
                      <span>Start Subscription</span>
                    </button>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div class="subscription-cards">
            <div class="subscription-card">
              <div class="card-header">
                <div class="card-title-row">
                  <h1 class="card-title">Light Roast</h1>
                  <p class="card-badge">Popular</p>
                </div>
                <p class="card-price">
                  <span class="price-amount">$15</span>
                  <span class="price-period">/month</span>
                </p>
              </div>
              <div class="card-features">
                <div class="feature-item">
                  <div class="check-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
                      ></path>
                    </svg>
                  </div>
                  12 oz bag
                </div>
                <div class="feature-item">
                  <div class="check-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
                      ></path>
                    </svg>
                  </div>
                  Single Origin or Blend
                </div>
              </div>
            </div>

            <div class="subscription-card">
              <div class="card-header">
                <h1 class="card-title">Medium Roast</h1>
                <p class="card-price">
                  <span class="price-amount">$15</span>
                  <span class="price-period">/month</span>
                </p>
              </div>
              <div class="card-features">
                <div class="feature-item">
                  <div class="check-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
                      ></path>
                    </svg>
                  </div>
                  12 oz bag
                </div>
                <div class="feature-item">
                  <div class="check-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
                      ></path>
                    </svg>
                  </div>
                  Single Origin or Blend
                </div>
              </div>
            </div>

            <div class="subscription-card">
              <div class="card-header">
                <h1 class="card-title">Dark Roast</h1>
                <p class="card-price">
                  <span class="price-amount">$15</span>
                  <span class="price-period">/month</span>
                </p>
              </div>
              <div class="card-features">
                <div class="feature-item">
                  <div class="check-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
                      ></path>
                    </svg>
                  </div>
                  12 oz bag
                </div>
                <div class="feature-item">
                  <div class="check-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
                      ></path>
                    </svg>
                  </div>
                  Single Origin or Blend
                </div>
              </div>
            </div>
          </div>

          <h2 class="section-title">Deliver Every</h2>
          <div class="delivery-options">
            <div class="delivery-option">
              <p class="delivery-text">1 Week</p>
            </div>
            <div class="delivery-option">
              <p class="delivery-text">2 Weeks</p>
            </div>
            <div class="delivery-option">
              <p class="delivery-text">3 Weeks</p>
            </div>
            <div class="delivery-option">
              <p class="delivery-text">4 Weeks</p>
            </div>
          </div>

          <h2 class="section-title">Choose Your Beans</h2>
          <div class="beans-gallery">
            <div class="bean-card">
              <div class="bean-image bean-image-1"></div>
              <div class="bean-info">
                <p class="bean-name">Hayes Valley Espresso</p>
                <p class="bean-price">$15.00</p>
              </div>
            </div>
            <div class="bean-card">
              <div class="bean-image bean-image-2"></div>
              <div class="bean-info">
                <p class="bean-name">Giant Steps Blend</p>
                <p class="bean-price">$15.00</p>
              </div>
            </div>
            <div class="bean-card">
              <div class="bean-image bean-image-3"></div>
              <div class="bean-info">
                <p class="bean-name">Bella Donovan Blend</p>
                <p class="bean-price">$15.00</p>
              </div>
            </div>
            <div class="bean-card">
              <div class="bean-image bean-image-4"></div>
              <div class="bean-info">
                <p class="bean-name">Fog Chaser Blend</p>
                <p class="bean-price">$15.00</p>
              </div>
            </div>
            <div class="bean-card">
              <div class="bean-image bean-image-5"></div>
              <div class="bean-info">
                <p class="bean-name">Roaster's Choice</p>
                <p class="bean-price">$15.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoffeeSubscription",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Plus Jakarta Sans", "Noto Sans", sans-serif;
  color: #1c160c;
}

.design-root {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  background-color: #ffffff;
  overflow-x: hidden;
}

.layout-container {
  display: flex;
  height: 100%;
  flex-grow: 1;
  flex-direction: column;
}

/* Header Styles */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  border-bottom: 1px solid #f4efe6;
  padding: 0.75rem 2.5rem;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #1c160c;
}

.logo-icon {
  width: 1rem;
  height: 1rem;
}

.brand-name {
  color: #1c160c;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.015em;
}

.header-right {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  gap: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2.25rem;
}

.nav-link {
  color: #1c160c;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: normal;
  text-decoration: none;
}

.header-buttons {
  display: flex;
  gap: 0.5rem;
}

.icon-button {
  display: flex;
  max-width: 30rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 9999px;
  height: 2.5rem;
  background-color: #f4efe6;
  color: #1c160c;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.015em;
  min-width: 0;
  padding: 0 0.625rem;
  border: none;
}

.icon {
  color: #1c160c;
}

.profile-pic {
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 1 / 1;
  background-size: cover;
  border-radius: 9999px;
  width: 2.5rem;
  height: 2.5rem;
  background-image: url("https://cdn.usegalileo.ai/sdxl10/fdfc9d0a-21eb-49f7-b052-18e481f33a95.png");
}

/* Content Styles */
.content-wrapper {
  padding: 0 10rem;
  display: flex;
  flex: 1;
  justify-content: center;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.content-container {
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  flex: 1;
}

/* Hero Section */
.hero-container {
  width: 100%;
}

.hero-banner {
  display: flex;
  min-height: 30rem;
  flex-direction: column;
  gap: 1.5rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 0.75rem;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    url("https://cdn.usegalileo.ai/sdxl10/6407a5ac-b898-4ffb-8479-75bd92546eb3.png");
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

.hero-title {
  color: white;
  font-size: 2.25rem;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.033em;
}

.hero-subtitle {
  color: white;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: normal;
}

/* Search Bar */
.search-bar-container {
  display: flex;
  flex-direction: column;
  min-width: 10rem;
  height: 3.5rem;
  width: 100%;
  max-width: 30rem;
}

.search-bar {
  display: flex;
  width: 100%;
  flex: 1;
  align-items: stretch;
  border-radius: 0.75rem;
  height: 100%;
}

.search-icon {
  color: #a18249;
  display: flex;
  border: 1px solid #e9dfce;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  padding-left: 0.9375rem;
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
  border-right: 0;
}

.search-input {
  flex: 1;
  width: 100%;
  min-width: 0;
  resize: none;
  overflow: hidden;
  border-radius: 0.75rem;
  color: #1c160c;
  border: 1px solid #e9dfce;
  background-color: #ffffff;
  height: 100%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
  padding-right: 0.5rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
  padding-left: 0.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: normal;
}

.search-input::placeholder {
  color: #a18249;
}

.search-input:focus {
  outline: 0;
  border-color: #e9dfce;
}

.search-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  border-left: 0;
  border: 1px solid #e9dfce;
  background-color: #ffffff;
  padding-right: 0.4375rem;
}

.search-button {
  display: flex;
  min-width: 5.25rem;
  max-width: 30rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 9999px;
  height: 2.5rem;
  padding: 0 1rem;
  background-color: #019863;
  color: #ffffff;
  border: none;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.015em;
}

.search-button span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Subscription Cards */
.subscription-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14.25rem, 1fr));
  gap: 0.625rem;
  padding: 1rem;
  margin-top: 1rem;
}

.subscription-card {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e9dfce;
  background-color: #ffffff;
  padding: 1.5rem;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  color: #1c160c;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.1;
}

.card-badge {
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.015em;
  border-radius: 9999px;
  background-color: #019863;
  padding: 0.1875rem 0.75rem;
  text-align: center;
}

.card-price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  color: #1c160c;
}

.price-amount {
  color: #1c160c;
  font-size: 2.25rem;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.033em;
}

.price-period {
  color: #1c160c;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.1;
}

.card-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: normal;
  display: flex;
  gap: 0.75rem;
  color: #1c160c;
}

.check-icon {
  color: #1c160c;
}

/* Delivery Section */
.section-title {
  color: #1c160c;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.015em;
  padding: 0 1rem;
  padding-bottom: 0.75rem;
  padding-top: 1.25rem;
}

.delivery-options {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  flex-wrap: wrap;
  padding-right: 1rem;
}

.delivery-option {
  display: flex;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  background-color: #f4efe6;
  padding: 0 1rem;
  cursor: pointer;
}

.delivery-text {
  color: #1c160c;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: normal;
}

/* Beans Gallery */
.beans-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9.875rem, 1fr));
  gap: 0.75rem;
  padding: 1rem;
}

.bean-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
}

.bean-image {
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 16 / 9;
  background-size: cover;
  border-radius: 0.75rem;
}

.bean-image-1 {
  background-image: url("https://cdn.usegalileo.ai/sdxl10/29732b50-51e3-4044-b7a0-b86cc54c9322.png");
}

.bean-image-2 {
  background-image: url("https://cdn.usegalileo.ai/sdxl10/4875ded6-5e68-4cb8-aa02-d32446af69d5.png");
}

.bean-image-3 {
  background-image: url("https://cdn.usegalileo.ai/sdxl10/e0ca19a9-9ef2-436d-8dff-46abd39e04ee.png");
}

.bean-image-4 {
  background-image: url("https://cdn.usegalileo.ai/sdxl10/9234d863-2317-4d5a-b125-8ffa28f3ded1.png");
}

.bean-image-5 {
  background-image: url("https://cdn.usegalileo.ai/sdxl10/1a6760ab-6c54-4ea4-9f6a-87974c8b3dc3.png");
}

.bean-info {
  display: flex;
  flex-direction: column;
}

.bean-name {
  color: #1c160c;
  font-size: 1rem;
  font-weight: 500;
  line-height: normal;
}

.bean-price {
  color: #a18249;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: normal;
}

/* Media Queries */
@media (max-width: 1024px) {
  .content-wrapper {
    padding: 0 2rem;
  }

  .hero-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0.75rem 1.25rem;
  }

  .nav-links {
    gap: 1.25rem;
  }

  .hero-banner {
    min-height: 24rem;
  }

  .subscription-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .nav-links {
    display: none;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .hero-subtitle {
    font-size: 0.75rem;
  }

  .beans-gallery {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
