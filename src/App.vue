<script setup lang="ts">
  import { computed, ref } from 'vue';
  import store from './store'
  import Tabs from './components/Tabs/Tabs.component.vue'

  const profilIsLog = computed(() => store.state.profil.accessToken)
  // const tabsHeight = computed(() => store.state.tabsHeight)
  const tabsHeight = ref(47)

  const getTabsHeight = (height) => {
      store.dispatch('setTabsHeight', height)
  }

  // const getNavbarHeight = (height) => {
  //     store.dispatch('setNavbarHeight', height)
  // }

</script>

<template>
  <div :class="`${profilIsLog && 'h-screen overflow-hidden'} bg-blue-200`" :style="{minHeight: `calc(100vh)`}">
    <main :class="`bg-red-200 ${profilIsLog ? 'overflow-y-auto' : 'overflow-hidden'} text-justify`" :style="{minHeight: `calc(100vh ${profilIsLog && `- ${tabsHeight}px`})`}">
      <router-view />
    </main>
    <Tabs v-if="profilIsLog" :getTabsHeight="getTabsHeight" />
  </div>
</template>