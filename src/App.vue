<script setup>
  import { computed, ref } from 'vue';
  import store from './store'
  import Tabs from './components/Tabs/Tabs.component.vue'
  import Modal from './components/modal/Modal.component.vue'

  const profil = computed(() => store.state.profil)
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
  <div class="">
    <div :class="`${profil.accessToken && 'h-screen overflow-hidden'} bg-blue-200`" :style="{minHeight: `calc(100vh)`}">
      <main :class="`bg-red-200 ${profil.accessToken ? 'overflow-y-auto' : 'overflow-hidden'} text-justify relative`" 
            :style="{minHeight: `calc(100vh ${profil.accessToken && `- ${tabsHeight}px`})`}">
        <router-view />
      </main>
      <Tabs v-if="profil.accessToken" :getTabsHeight="getTabsHeight" :profil=profil />
    </div>
  </div>
</template>