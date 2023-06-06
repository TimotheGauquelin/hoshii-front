<script setup>
    import listPresent from "../mock/list.ts"
    import PresentList from "../components/present-list/PresentList.component.vue"
    import UserCard from "../components/user/UserCard.component.vue"

    import { computed,ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router';

    import store from '../store'

    import axiosClient from "../axiosClient.js"

    const route = useRoute();   
    const paramsId = route.params.id;

    const profil = computed(() => store.state.profil)
    const inPageUser = ref({})

    const getUser = (userId) => {
        axiosClient.get(`user/${userId}`)
            .then(({data}) => {
                console.log(data)
                inPageUser.value = data
            })  
    }

    onMounted(() => {
        getUser(paramsId)
    })

</script>

<template>
    <UserCard :name=inPageUser.username birthday="5 Mai 1994"/>
    <div class="mt-2 p-2 bg-green-200 rounded ">
        <div class="flex justify-between mb-1">
            <p>Ma Liste :</p>
            <button class="btn bg-green-300 hover:bg-green-400 rounded p-1 text-white">Ajouter une liste</button>
        </div>
        <div v-for="list of inPageUser.lists" class="mb-2 p-2 rounded bg-red-200">
            <PresentList :list="list" />
        </div>
    </div>

</template>
