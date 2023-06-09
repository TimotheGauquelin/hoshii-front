<script setup>

    const props = defineProps({
        modalToggle: Boolean
    })

    const emit = defineEmits(['modalDisplayer'])


</script>
<template>
    <div v-if=modalToggle class="fixed flex left-0 top-0 w-screen h-screen z-1" @click="emit('modalDisplayer')">
        <div class="maxHeight w-5/6 m-auto overflow-y-auto border border-black p-3 md:p-8 bg-blue-300 rounded">
            <button class="bg-red-200 p-2">Fermer</button>
            <div>ABC MODAL {{ modalToggle }}</div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, eos!        
            </div>
    </div>
</template>

<style>
    .maxHeight {
        max-height: 80vh
    }
</style>