<script setup>

    import { ref } from "vue"

    const props = defineProps({
        list: Object,
    })        
    
    const isDisplayed = ref(false)

    const displayList = () => {
        isDisplayed.value = !isDisplayed.value
    }

</script>

<template lang="">
            <div class="flex justify-between bg-green-200 mb-2">
                <p>{{ list.listName }}</p>
                <p @click="displayList">V</p>
            </div>
            <div v-if="isDisplayed" class="bg-gray-300 p-1">
                <div class="bg-blue-200 mb-1 p-2" v-for="present of list.presents" v-if="list.presents.length > 0">
                    <div  >
                        <p>{{ present.name }}</p>
                    </div> 
                </div>
                <div v-else >
                    <p>Aucun cadeau dans cette liste</p>
                </div>
            </div>
</template>
