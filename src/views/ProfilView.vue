<script setup>
    import listPresent from "../mock/list.ts"
    import PresentList from "../components/present-list/PresentList.component.vue"
    import UserCard from "../components/user/UserCard.component.vue"

    import { computed,ref, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router';

    import store from '../store'

    import axiosClient from "../axiosClient.js"

    const route = useRoute();
    
    const paramsId = computed(() => route.params.id)
    const profil = computed(() => store.state.profil)

    const inPageUserData = ref({})
    const thisProfilIsCurrentUserPage = computed(() => String(paramsId.value) === String(profil.value._id))

    const getUser = (userId) => {
        axiosClient.get(`user/${userId}`)
            .then(({data}) => {
                inPageUserData.value = data
            })  
    }

    const addNewList = () => {
        console.log("ADD LIST")
    }

    const addNewPresent = () => {
        console.log("ADD PRESENT")
    }

    const deleteList = () => {
        console.log("DELETE LIST")
    }

    const deletePresent = () => {
        console.log("DELETE PRESENT")
    }

    const updateList = () => {
        console.log("UPDATE LIST")
    }

    const updatePresent = (id) => {
        console.log("UPDATE PRESENT" + id)
    }

    onMounted(() => {
        getUser(paramsId.value)
    })

    watch(route, () => {
        thisProfilIsCurrentUserPage.value,
        getUser(paramsId.value)    
    })

</script>

<template>
    <UserCard :name=inPageUserData.username birthday="5 Mai 1994"/>
    <div class="mt-2 p-2 bg-green-200 rounded ">
        <div class="flex justify-between mb-1">
            <p>Ma Liste :</p>
            <button class="btn bg-green-300 hover:bg-green-400 rounded p-1 text-white">Ajouter une liste</button>
            <div v-if="thisProfilIsCurrentUserPage">JE SUIS MOI</div>
            <div v-else>CE N'EST PAS MOI</div>
        </div>
        <div :key=index v-for="(list, index) of inPageUserData.lists" class="mb-2 p-2 rounded bg-red-200">
            <PresentList 
                :list=list 
                :thisProfilIsCurrentUserPage="thisProfilIsCurrentUserPage" 
                @addNewList="addNewList"
                @addNewPresent="addNewPresent"
                @deleteList="deleteList"
                @deletePresent="deletePresent"
                @updateList="updateList"
                @updatePresent="updatePresent"
            />
        </div>
    </div>

</template>
