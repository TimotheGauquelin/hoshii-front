<script setup>
    import { onMounted, ref } from 'vue';

    const props = defineProps({
        getNavbarHeight: Function,
    })

    const navbarHeight = ref(0)

    onMounted(() => {
        props.getNavbarHeight(navbarHeight.value.clientHeight)
    })
</script>

<template lang="">
    <div 
        ref="navbarHeight"
        class="bg-white p-2">
        <h1> HOSHII </h1>
    </div>
</template>
