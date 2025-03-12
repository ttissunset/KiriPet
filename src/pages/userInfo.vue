<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import { ref, reactive } from "vue";
const formData = reactive({
  avatar: "",
  username: "",
  profile: "",
});
</script>

<template>
  <HomeHeader />
  <div class="layout-container">
    <div class="content-wrapper">
      <div class="layout-content-container">
        <div class="profile-container">
          <div class="profile-section">
            <div class="profile-image-large"></div>
            <div class="profile-details">
              <h1 class="profile-title">Let's get your profile ready!</h1>
              <button class="primary-button">Add Profile Photo</button>
            </div>
          </div>
        </div>
        <div class="form-field-container">
          <label class="form-label">
            <p class="form-label-text">昵称:</p>
            <input
              class="form-input"
              v-model.trim="formData.username"
              maxlength="10"
            />
            <span class="input-counter">{{ formData.username.length }}/10</span>
          </label>
        </div>
        <h3 class="section-heading">个人简介:</h3>
        <div class="form-field-container">
          <label class="form-label">
            <textarea
              class="form-textarea"
              maxlength="100"
              v-model.trim="formData.profile"
              placeholder="Tell us about yourself"
            ></textarea>
            <span class="input-counter">{{ formData.profile.length }}/100</span>
          </label>
        </div>
        <div class="section-footing">
          *我们将利用这些信息来个性化您的体验，并呈现相关内容
        </div>
        <div class="form-actions">
          <button class="secondary-button">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.layout-container {
  display: flex;
  height: 100%;
  flex-grow: 1;
  flex-direction: column;
}

/* Content styles */
.content-wrapper {
  padding: 0 10rem;
  display: flex;
  flex: 1;
  justify-content: center;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.layout-content-container {
  display: flex;
  flex-direction: column;
  max-width: 960px;
  flex: 1;
}

/* Profile section */
.profile-container {
  width: 100%;
}

.profile-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 1rem 2.5rem 1rem;
}

.profile-image-large {
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 16/9;
  background-size: cover;
  border-radius: 0.75rem;
  background-image: url("https://cdn.usegalileo.ai/sdxl10/6dcc06f7-8344-41e4-a739-4a447450bc34.png");
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.profile-title {
  color: #181118;
  font-size: 2.25rem;
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: -0.033em;
  text-align: center;
}

.primary-button {
  display: flex;
  min-width: 84px;
  max-width: 480px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 9999px;
  height: 2.5rem;
  padding: 0 1rem;
  background-color: #e619e6;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.015em;
  border: none;
}

.primary-button span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

/* Form styles */
.form-field-container {
  display: flex;
  max-width: 480px;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
  padding: 0.75rem 1rem;
}

.form-label {
  display: flex;
  flex-direction: column;
  min-width: 10rem;
  flex: 1;
  position: relative;
}

.form-label-text {
  color: #181118;
  font-size: 1rem;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 0.5rem;
}

.input-counter {
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-size: 12px;
  color: #6b7280;
}

.form-input {
  display: flex;
  width: 100%;
  min-width: 0;
  flex: 1;
  resize: none;
  overflow: hidden;
  border-radius: 0.75rem;
  color: #181118;
  border: 1px solid #e5dce5;
  background-color: white;
  height: 3.5rem;
  padding: 0.9375rem;
  font-size: 1rem;
  font-weight: normal;
  line-height: normal;
}

.form-input:focus {
  outline: 0;
  border-color: #e5dce5;
}

.form-textarea {
  display: flex;
  width: 100%;
  min-width: 0;
  flex: 1;
  resize: none;
  overflow: hidden;
  border-radius: 0.75rem;
  color: #181118;
  border: 1px solid #e5dce5;
  background-color: white;
  min-height: 9rem;
  padding: 0.9375rem;
  font-size: 1rem;
  font-weight: normal;
  line-height: normal;
}

.form-textarea:focus {
  outline: 0;
  border-color: #e5dce5;
}

.form-textarea::placeholder {
  color: #886388;
}

.section-heading {
  color: #181118;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.015em;
  padding: 0 1rem 0rem 1rem;
  padding-top: 0.5rem;
}

.section-footing {
  color: #a39ea3;
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.015em;
  padding: 0 1rem 0.5rem 1rem;
}

.form-actions {
  display: flex;
  padding: 0.75rem 1rem;
  justify-content: flex-end;
}

.secondary-button {
  display: flex;
  min-width: 84px;
  max-width: 480px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 9999px;
  height: 2.5rem;
  padding: 0 1rem;
  padding-top: 0.5rem;
  background-color: #f4f0f4;
  color: #181118;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.015em;
  border: none;
}

.secondary-button span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

/* Media Queries for Responsive Design */
@media (min-width: 480px) {
  .profile-section {
    gap: 2rem;
  }

  .profile-details {
    min-width: 400px;
    gap: 2rem;
  }

  .profile-title {
    font-size: 3rem;
  }

  .primary-button {
    height: 3rem;
    padding: 0 1.25rem;
    font-size: 1rem;
  }
}

@media (min-width: 864px) {
  .profile-section {
    flex-direction: row;
  }

  .profile-image-large {
    width: 100%;
    height: auto;
    min-width: 400px;
  }

  .profile-details {
    justify-content: center;
  }
}
</style>
