<script setup>

    import { ref } from "vue"

    const props = defineProps({
        list: Object,
        thisProfilIsCurrentUserPage: Boolean,
    })        
    
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
                <div key="index" class="bg-blue-200 mb-1 p-2" v-for="(present, index) of list.presents" v-if="list.presents.length > 0">
                    <div class="">
                        <div class="flex justify-between mb-1">
                            <p class="font-bold">{{ present.label }}</p>
                            <div v-if="thisProfilIsCurrentUserPage">
                                <button class="btn bg-yellow-300 hover:bg-yellow-400 text-white p-1 rounded mr-1">
                                    <v-icon name="fa-pen"/>
                                </button>
                                <button class="btn bg-red-300 hover:bg-red-400 text-white p-1 rounded">
                                    <v-icon name="fa-trash-alt"/>
                                </button>
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
