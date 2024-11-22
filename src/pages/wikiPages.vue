<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";

const navItems = [
  { name: "猫咪百科", path: "/wiki/cats", icon: "icon-cat" },
  { name: "狗狗百科", path: "/wiki/dogs", icon: "icon-dog" },
];
</script>

<template>
  <HomeHeader></HomeHeader>
  <div class="wiki-container"> 
    <aside class="wiki-sidebar">
      <nav class="wiki-nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="wiki-nav__link"
          active-class="wiki-nav__link--active"
        >
          <i :class="item.icon"></i>
          {{ item.name }}
        </router-link>
      </nav>
    </aside>

    <main class="wiki-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
  <HomeFooter></HomeFooter>
</template>

<style scoped lang="scss">
.wiki-container {
  max-width: 76%;
  min-height: 68vh;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  position: relative;
  justify-content: center;
  gap: 2rem;
}

.wiki-sidebar {
  width: 240px;
  position: sticky;
  top:px;

  @media (min-width: 768px) {
    display: block;
  }
}

.wiki-nav {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow-2);

  &__link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    color: #64748b;
    transition: all 0.3s ease;

    i {
      font-size: 1.25rem;
    }

    &:hover {
      background: #f8fafc;
      color: #3b82f6;
    }

    &--active {
      background: #eff6ff;
      color: #3b82f6;
      font-weight: 500;
    }
  }
}

.wiki-content {
  flex: 1;
  min-height: 500px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
