<script setup lang="ts">
  import { computed } from 'vue';
  import store from './store'
  import Navbar from './components/Navbar.component.vue'
  import Tabs from './components/Tabs/Tabs.component.vue'

  const profilIsLog = computed(() => store.state.profil.isLog)
  const tabsHeight = computed(() => store.state.tabsHeight)
  const navbarHeight = computed(() => store.state.navbarHeight)

  const getTabsHeight = (height) => {
      store.dispatch('setTabsHeight', height)
  }

  const getNavbarHeight = (height) => {
      store.dispatch('setNavbarHeight', height)
  }

</script>

<template>
  <div class="h-screen bg-blue-200 ">
    <Navbar :getNavbarHeight="getNavbarHeight"/>
    <main :class="`${profilIsLog ? 'overflow-y-auto' : 'overflow-hidden'} p-2 text-justify`" :style="{height: `calc(100%  ${profilIsLog && `- ${tabsHeight}px`} - ${navbarHeight}px)`}">
      <router-view />
    </main>
    <Tabs v-if="profilIsLog" :getTabsHeight="getTabsHeight" />
  </div>
</template>