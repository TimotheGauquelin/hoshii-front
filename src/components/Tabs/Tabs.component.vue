<script setup>
    import { onMounted, ref, computed } from 'vue';
    import store from "../../store"

    import Tab from "./Tab.component.vue"
    
    const props = defineProps({
        getTabsHeight: Function,
    })

    const tabsHeight = ref(0)
    const userData = computed(() => store.state.profil)


    onMounted(() => {
        props.getTabsHeight(tabsHeight.value.clientHeight)
    })
    
</script>

<template lang="">
    {{userData.profilIsLog}}
    <ul
    ref="tabsHeight"
    class="flex list-none flex-row border-b-0 pl-0 grid grid-cols-12 bg-white"
    role="tablist">
            <Tab tabName="Accueil" href="/home" />
            <Tab tabName="Profil"  href="/user/123" />
    </ul>
</template>
