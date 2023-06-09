<script setup>
    import { ref, computed } from "vue"

    const props = defineProps({
        thisProfilIsCurrentUserPage: Boolean,
        present: Object,
    })

    const emit = defineEmits(['deletePresent'])

    const forceRerender = () => {
        console.log(props.present._id)
        props.present._id += 1;
        console.log(props.present._id)
    };

</script>
<template>
    <div :key=present._id class="">
        <div class="flex justify-between mb-1">       
            <p class="font-bold">{{ present.label }}</p>
            <div v-if="thisProfilIsCurrentUserPage">
                <button class="btn bg-yellow-300 hover:bg-yellow-400 text-white p-1 rounded mr-1" @click="emit('updatePresent', present.label)">
                    <v-icon name="fa-pen"/>
                </button>
                <button class="btn bg-red-300 hover:bg-red-400 text-white p-1 rounded" @click="emit('deletePresent'); forceRerender()">
                    <v-icon name="fa-trash-alt"/>
                </button>
            </div>
            <div v-else>
                <input type="checkbox" name="" id="">
            </div>
        </div>
        <p v-if="!thisProfilIsCurrentUserPage">{{`Ce cadeau est pris par : `}}</p>
    </div>
</template>