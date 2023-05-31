<script setup>
    import { onMounted, ref } from 'vue';

    import Tab from "./Tab.component.vue"
    
    const props = defineProps({
        getTabsHeight: Function,
    })

    const tabsHeight = ref(0)

    onMounted(() => {
        props.getTabsHeight(tabsHeight.value.clientHeight)
    })
    
</script>

<template lang="">
    <ul
    ref="tabsHeight"
    class="flex list-none flex-row border-b-0 pl-0 grid grid-cols-12 bg-white"
    role="tablist">
            <Tab tabName="Accueil" href="/" />
            <Tab tabName="Profil" href="/profil" />
    </ul>
</template>
