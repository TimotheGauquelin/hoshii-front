<script setup>
    import { ref, computed } from "vue"

    const props = defineProps({
        thisProfilIsCurrentUserPage: Boolean,
        userId: String,
        list: Object,
        present: Object,
    })

    const emit = defineEmits(['deletePresent', 'displayUpdatePresentModal', 'takeThisPresent', 'putAPresentBackInTheList'])

    const displayedCardDesc = ref(false)

    const toggleDisplayedCardDesc = () => {
        displayedCardDesc.value = !displayedCardDesc.value
    }

</script>
<template>
    <div :key=present._id class="">
        <div class="flex justify-between mb-1" data-cy="present-tile">       
            <p class="font-bold">Cadeau: {{ present.label }}</p>
            <div v-if="thisProfilIsCurrentUserPage"  >
                <button class="btn bg-yellow-300 hover:bg-yellow-400 text-white p-1 rounded mr-1" @click="emit('displayUpdatePresentModal')">
                    <v-icon name="fa-pen"/>
                </button>
                <button class="btn bg-red-300 hover:bg-red-400 text-white p-1 rounded" @click="emit('deletePresent');" data-cy="delete-present-btn">
                    <v-icon name="fa-trash-alt"/>
                </button>
            </div>
            <div v-else>
                <div v-if="!present?.giver?.giverUsername">
                    <input type="checkbox" name="" id="" @click="emit('takeThisPresent')">
                </div>
                <div v-if="present?.giver?.giverId === userId" @click="emit('putAPresentBackInTheList')">
                    <input type="checkbox" name="" id="" checked>
                </div>
                <div else>
                    <p>{{`Ce cadeau est pris par : ${present?.giver?.giverUsername}`}}</p>
                </div>
            </div>
            
        </div>
        <div class="">
            <p><b>Description:</b> {{ present.desc ? present.desc : "Aucune description" }}</p>
            <p><b>Price:</b> {{ present.price ? present.price : "Aucun prix défini" }}</p>
        </div>
    </div>
</template>