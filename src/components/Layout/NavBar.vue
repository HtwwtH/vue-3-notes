<template>
  <nav
    class="navbar is-success"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <span class="navbar-item is-size-4 is-family-monospace">
        Notes
        </span>
  
        <a
          @click.prevent="isMobileNavVisible = !isMobileNavVisible"
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': isMobileNavVisible }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="navbarBurgerRef"
        >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        </a>
      </div>
  
      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': isMobileNavVisible }"
        ref="navbarRef"
      >
        <div class="navbar-end">
          <RouterLink
            @click="isMobileNavVisible = false"
            to="/"
            class="navbar-item"
            active-class="is-active"
          >
            Notes
          </RouterLink>
          <RouterLink
            @click="isMobileNavVisible = false"
            to="/stats"
            class="navbar-item"
            active-class="is-active"
          >
            Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
const isMobileNavVisible = ref(false)
const navbarRef = ref(null)
const navbarBurgerRef = ref(null)

onClickOutside(navbarRef, () => isMobileNavVisible.value = false, {
  ignore: [navbarBurgerRef]
})
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>