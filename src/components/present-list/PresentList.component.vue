<script setup>

    import { ref, watch } from "vue"
    import { useRoute } from 'vue-router';
    import PresentCard from './PresentCard.component.vue'

    const route = useRoute()

    const props = defineProps({
        userId: String,
        list: Object,
        thisProfilIsCurrentUserPage: Boolean,
    }) 

    
    const emit = defineEmits(['deleteList', 'deletePresent', 'updateList', 'updatePresent', "modalDisplayer", "buttonInsider"])
    
    const isDisplayed = ref(false)

    const displayList = () => {
        isDisplayed.value = !isDisplayed.value
    }

</script>

<template>
            <div class="flex justify-between bg-green-200 p-2" @click="displayList">
                <p>{{ props.list.label }}</p>
                <v-icon name="fa-angle-down" />
            </div>
            <div v-if="isDisplayed" class="bg-gray-300 p-1">
                <div v-if="thisProfilIsCurrentUserPage" class="p-1 grid grid-cols-12" >
                    <button class="bg-green-300 col-span-4 p-1 rounded text-white w-full" @click="emit('buttonInsider', list) ; emit('modalDisplayer')">Ajouter cadeau</button>
                    <button class="bg-yellow-300 col-span-4 p-1 rounded text-white w-full" @click="emit('UpdateList')">Modifier liste</button>
                    <button class="bg-red-300 col-span-4 p-1 rounded text-white w-full" @click="emit('deleteList', userId, list._id)">Supprimer liste</button>
                </div>
                <div class="bg-blue-200 mb-1 p-2" v-for="(present) of list.presents" v-if="list.presents.length > 0">
                    <PresentCard 
                        :index=present._id 
                        :thisProfilIsCurrentUserPage=thisProfilIsCurrentUserPage
                        :present=present 
                        @deletePresent="emit('deletePresent', userId, list._id, present._id)"/>  
                </div>
                <div v-else class="p-1">
                    <p>Aucun cadeau dans cette liste</p>
                </div>
            </div>
</template>
