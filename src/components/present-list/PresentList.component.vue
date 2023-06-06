<script setup>

    import { ref } from "vue"

    const props = defineProps({
        list: Object,
        thisProfilIsCurrentUserPage: Boolean,
    }) 
    
    const emit = defineEmits(['addNewList', 'addNewPresent', 'deleteList', 'deletePresent', 'updateList', 'updatePresent'])
    
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
                    <button class="bg-green-300 col-span-4 p-1 rounded text-white w-full" @click="emit('addNewPresent')">Ajouter cadeau</button>
                    <button class="bg-yellow-300 col-span-4 p-1 rounded text-white w-full" @click="emit('UpdateList')">Modifier liste</button>
                    <button class="bg-red-300 col-span-4 p-1 rounded text-white w-full" @click="emit('deleteList')">Supprimer liste</button>
                </div>
                <div key="index" class="bg-blue-200 mb-1 p-2" v-for="(present, index) of list.presents" v-if="list.presents.length > 0">
                    <div class="">
                        
                        <div class="flex justify-between mb-1">
                            <p class="font-bold">{{ present.label }}</p>
                            <div v-if="thisProfilIsCurrentUserPage">
                                <button class="btn bg-yellow-300 hover:bg-yellow-400 text-white p-1 rounded mr-1" @click="emit('updatePresent', present.label)">
                                    <v-icon name="fa-pen"/>
                                </button>
                                <button class="btn bg-red-300 hover:bg-red-400 text-white p-1 rounded" @click="emit('deletePresent')">
                                    <v-icon name="fa-trash-alt"/>
                                </button>
                            </div>
                            <div v-else>
                                <input type="checkbox" name="" id="">
                            </div>
                        </div>
                        <p v-if="!thisProfilIsCurrentUserPage">{{`Ce cadeau est pris par : `}}</p>
                    </div>
                    
                </div>
                <div v-else class="p-1">
                    <p>Aucun cadeau dans cette liste</p>
                </div>
            </div>
</template>
