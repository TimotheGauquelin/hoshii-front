<script setup>
    import { computed } from 'vue'
    import store from '../store'
    import UserCard from '../components/user/Usercard.component.vue'

    const profil = computed(() => store.state.profil)

</script>
<template>
    <div class="bg-blue-200 p-2">
        <p>Ma liste d'amis :</p>
            <router-link 
                :to="{ name:'user', params: {id :friend.friendId}}" 
                key="friend.id" 
                v-for="friend of profil.friends"
                class="flex p-2 mb-1 bg-green-200 rounded items-center"
            >
                <UserCard :name="friend.friendUsername" />
            </router-link>
     </div>
</template>