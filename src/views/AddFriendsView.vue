<script setup>

    import { computed,ref, onMounted, watch } from 'vue'

    import axiosClient from "../axiosClient.js"

    import { useRoute } from 'vue-router';

    import UserCard from '../components/user/UserCard.component.vue'

    const route = useRoute()
    const users = ref([])
    const searchBarText = ref("")

    function updateVariable(event) {
        searchBarText.value = event.target.value;
    }   

    console.log(searchBarText.value)

    const getUsers = (searchBarText) => {
        console.log(searchBarText)
        if(searchBarText.value !== ""){
            axiosClient(localStorage.getItem("access_token")).get(`user/allUsersButMySearchAndMeAndMyFriends/${searchBarText.value}`)
                .then(({data}) => {
                    console.log(searchBarText.value)
                    console.log(data)
                    users.value = data
                })}
    }

    onMounted(() => {
        if(searchBarText.value) {
            getUsers(searchBarText.value)
        }
    })

    watch(route, () => {
        getUsers(searchBarText.value)
    })

</script>
<template>
    <div class="p-2 overflow-y-auto">
        <input type="text" v-model="searchBarText" @change="updateVariable(searchBarText)" />
        {{ searchBarText }}
        <div>
            <router-link 
            :to="{ name:'user', params: {id :user._id}}" 
            :key="id"
            v-for="(user, id) of users"
            class="flex p-2 mb-1 bg-green-200 rounded items-center"
        >
            <UserCard :user="user" />
        </router-link>
        </div>
    </div>
</template>