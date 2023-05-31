<script setup>

    const props = defineProps({
        presentList: Array,
    })

</script>

<template lang="">
    <div v-for="list of presentList" class="mb-2 p-2 rounded bg-red-200">
            <div class="flex justify-between">
                <p>{{ list.listName }}</p>
                <p>V</p>
            </div>
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
