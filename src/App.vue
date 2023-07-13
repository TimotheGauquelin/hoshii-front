<script setup>
  import { computed, ref, watch } from 'vue';
  import store from './store'
  import Tabs from './components/tabs/Tabs.component.vue'
  import Navbar from './components/navbar/Navbar.component.vue'
  import Modal from './components/modal/Modal.component.vue'

  import { useRoute, useRouter } from 'vue-router';
    const route = useRoute();
    const router = useRouter();

  const profil = computed(() => store.state.profil)
  const refresh = ref(false)

  const tabsHeight = ref(0)
  const navbarHeight = ref(0)

  const getTabsHeight = (height) => {
    store.dispatch('setTabsHeight', height)
  }

  const getNavbarHeight = (height) => {
    store.dispatch('setNavbarHeight', height)
  }

  const logout = () => {

    store.dispatch('setIsAccessTokenPresent')
    router.push('/guest')
  
  }

  watch(route, () => {
    getTabsHeight(tabsHeight)
    getNavbarHeight(navbarHeight)
  })

</script>

<template>
    <div :class="`${profil.accessTokenInStorage === true && 'overflow-hidden'} bg-blue-200 h-screen`">
      <Navbar v-if="profil.accessTokenInStorage === true" :getNavbarHeight="getNavbarHeight" @logout="logout"/>
      <router-view 
        :style="{height: `calc(100vh ${profil.accessTokenInStorage === true && ` - ${tabsHeight}px - ${navbarHeight}px`} )`}"
        class="bg-yellow-200"
        data-cy="page-body"
      />
      <Tabs v-if="profil.accessTokenInStorage === true" :getTabsHeight="getTabsHeight" :profil=profil />
    </div>
</template>    