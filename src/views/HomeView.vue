<script setup>

    import { computed, onMounted, watch } from 'vue'
    import store from '../store'
    import axiosClient from "../axiosClient.js"

    import { useRoute } from 'vue-router';
    const route = useRoute();

    const profil = computed(() => store.state.profil)

    const getMyProfil = () => {
        axiosClient(localStorage.getItem("access_token"))
            .get('user/myProfil')
            .then(({data}) => {
                store.dispatch('setProfil', data)
            })
            .catch(function (error) {
                if(error.response) {
                    console.log(error.response)
                }
            })
    }

    onMounted(() => {
        getMyProfil()
    })

    watch(route, () => {
        getMyProfil()
  })

</script>

<template class="h-full">
    <div class="p-2 bg-blue-200">
        <div class="bg-green-200 p-2 rounded">
            Bienvenue {{ profil.username }}
        </div>
    </div>
</template>