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

    const emit = defineEmits(['deleteList', "deletePresent", "displayAddListModal", "displayAddPresentModal", "displayUpdateListModal", "displayUpdatePresentModal"])
    
    const isDisplayed = ref(false)

    const displayList = () => {
        isDisplayed.value = !isDisplayed.value
    }

</script>

<template>
            <div class="flex justify-between bg-green-200 p-2" @click="displayList" data-cy="list-tile">
                <p data-cy="list-name">{{ props.list.label }}</p>
                <v-icon name="fa-angle-down" />
            </div>
            <div v-if="isDisplayed" class="bg-gray-300 p-1">
                <div v-if="thisProfilIsCurrentUserPage" class="p-1 grid grid-cols-12" >
                    <button class="bg-green-300 col-span-4 p-1 rounded text-white w-full" @click="emit('displayAddPresentModal', list)">Ajouter cadeau</button>
                    <button class="bg-yellow-300 col-span-4 p-1 rounded text-white w-full" @click="emit('displayUpdateListModal', list)">Modifier liste</button>
                    <button 
                      class="bg-red-300 col-span-4 p-1 rounded text-white w-full" 
                      @click="emit('deleteList', userId, list._id)"
                      data-cy="delete-list-btn"
                    >
                        Supprimer liste
                    </button>
                </div>
                <div class="">
                    <div class="bg-blue-200 mb-1 p-2" v-for="(present, presentIndex) of list.presents" v-if="list.presents.length > 0">
                        <PresentCard 
                            :thisProfilIsCurrentUserPage=thisProfilIsCurrentUserPage
                            :present=present
                            :list=list
                            @displayUpdatePresentModal="emit('displayUpdatePresentModal', list, presentIndex)"
                            @deletePresent="emit('deletePresent', userId, list._id, present._id)"
                        />  
                    </div>
                    <div v-else class="p-1">
                        <p>Aucun cadeau dans cette liste</p>
                    </div>
                </div>
            </div>
</template>
