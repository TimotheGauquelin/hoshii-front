<script setup>
    import { computed } from 'vue'
    import store from '../store'

    const profil = computed(() => store.state.profil)

</script>
<template class="h-full">
    <div class="p-2 bg-blue-200">
        <div class="bg-green-200 p-2 rounded">
            Bienvenue {{ profil.username }}
        </div>
    </div>
</template>