<script setup>
  import { computed, ref, watch } from 'vue';
  import store from './store'
  import Tabs from './components/tabs/Tabs.component.vue'
  import Navbar from './components/navbar/Navbar.component.vue'
  import Modal from './components/modal/Modal.component.vue'

  import { useRoute } from 'vue-router';
    const route = useRoute();

  const profil = computed(() => store.state.profil)

  const tabsHeight = ref(0)
  const navbarHeight = ref(0)

  // const accessToken = localStorage.setItem("access_token")

  const getTabsHeight = (height) => {
      store.dispatch('setTabsHeight', height)
  }

  const getNavbarHeight = (height) => {
      store.dispatch('setNavbarHeight', height)
  }

  watch(route, () => {
      getTabsHeight(tabsHeight)
      getNavbarHeight(navbarHeight)
  })



</script>

<template>
    <div :class="`${profil.accessToken && 'overflow-hidden'} bg-blue-200 h-screen`">
      <Navbar v-if="profil.accessToken" :getNavbarHeight="getNavbarHeight"/>
      <router-view 
        :style="{height: `calc(100vh ${profil.accessToken && ` - ${tabsHeight}px - ${navbarHeight}px`} )`}"
        class="bg-yellow-200"
        data-cy="page-body"
      />
      <Tabs v-if="profil.accessToken" :getTabsHeight="getTabsHeight" :profil=profil />
    </div>
</template>    