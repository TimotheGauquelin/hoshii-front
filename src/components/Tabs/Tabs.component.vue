<script setup>
    import { onMounted, ref, computed } from 'vue';
    import store from "../../store"

    import Tab from "./Tab.component.vue"
    
    const props = defineProps({
        getTabsHeight: Function,
        profil: Object,
    })

    const tabsHeight = ref(0)
    const userData = computed(() => store.state.profil)


    onMounted(() => {
        props.getTabsHeight(tabsHeight.value.clientHeight)
    })
    
</script>

<template lang="">
    {{userData.profilIsLog}}
    <div
        ref="tabsHeight"
        class="inline-grid w-full border-b-0 pl-0 grid-cols-12 bg-white"
        role="tablist">
            <Tab tabName="Accueil" href="/home" />
            <Tab tabName="Profil"  :href='"/user/" + profil._id' />
            <Tab tabName="Friends"  href="/friends" />
    </div>
</template>
