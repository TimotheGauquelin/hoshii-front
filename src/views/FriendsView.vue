<script setup>
    import { computed } from 'vue'
    import { useRouter } from 'vue-router';
    import store from '../store'
    import UserCard from '../components/user/UserCard.component.vue'

    const router = useRouter()

    const profil = computed(() => store.state.profil)

    const redirectToAddFriendsView = () => {
        router.push("/friends/add-friends")
    }

</script>
<template>
    <div class="p-2 overflow-y-auto">
       
        <div class="flex justify-between items-center mb-2">
            <p>Ma liste d'amis :</p>
            <button class="bg-blue-400 p-2 text-white rounded" @click="redirectToAddFriendsView()" > Add a friend </button>
        </div>
        <router-link 
            :to="{ name:'user', params: {id :friend.id}}" 
            :key="id"
            v-for="(friend, id) of profil.friends"
            class="flex p-2 mb-1 bg-green-200 rounded items-center"
        >
            <UserCard :user="friend" />
        </router-link>
     </div>
</template>