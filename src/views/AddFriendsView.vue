<script setup>

    import { computed,ref, onMounted, watch } from 'vue'

    import axiosClient from "../axiosClient.js"

    import { useRoute } from 'vue-router';

    import UserCard from '../components/user/UserCard.component.vue'

    const route = useRoute()
    const users = ref([])
    const searchBarText = ref("T")

    const getUsers = (searchBarText) => {
            axiosClient(localStorage.getItem("access_token")).get(`user/allUsersButMySearchAndMeAndMyFriends/${searchBarText.value}`)
                .then(({data}) => {
                    console.log(data)
                    users.value = data
                })  
        }

    onMounted(() => {
        getUsers(searchBarText)
    })

    watch(route, () => {
        getUsers(searchBarText)
    })

</script>
<template>
    <div>
        <input type="text">
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