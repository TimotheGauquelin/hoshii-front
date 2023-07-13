<script setup lang="ts">
    import { computed } from 'vue'
    import store from '../store'
    import UserCard from '../components/user/Usercard.component.vue'

    const profil = computed(() => store.state.profil)

</script>
<template>
    <div class="p-2 overflow-y-auto">
        <p>Ma liste d'amis :</p>
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