<script setup>

    import { onMounted, ref } from 'vue';

    const props = defineProps({
        getNavbarHeight: Function,
    })

    const emit = defineEmits(['logout'])

    const navbarHeight = ref(0)

    onMounted(() => {
        props.getNavbarHeight(navbarHeight.value.clientHeight)
    })

</script>

<template lang="">
    <div 
        ref="navbarHeight"
        class="bg-white flex justify-between p-2">
        <h1> HOSHII </h1>
        <p class="cursor-pointer hover:text-red-400 hover:font-bold" @click="emit('logout')">Deconnexion</p>
    </div>
</template>
