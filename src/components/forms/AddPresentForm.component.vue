<script setup>
    import Input from '../inputs/Input.component.vue'

    const props = defineProps({
        present: Object,
        userId: String,
        clickedList: Object,
    })

    const emit = defineEmits(['addNewPresent'])

</script>
<template>
    <form class="space-y-4 md:space-y-6" method="post" @submit.prevent="emit('addNewPresent', userId, clickedList._id)">
        <p class="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Add a present inside <b>{{ clickedList.label }}</b>
        </p>
        <Input 
            type="text"
            label="Name of your present"
            inputName="label"
            placeholder="label"
            v-model:newValue=present.label
            />
        <Input 
            type="text"
            label="Desc of your present"
            inputName="desc"
            placeholder="desc"
            v-model:newValue=present.desc
            />
        <Input 
            type="number"
            label="Price of your present"
            inputName="price"
            placeholder="price"
            v-model:newValue=present.price
            />
        <button 
            data-cy='submit-btn'
            type="submit"
            class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
            Submit
        </button>
    </form>
</template>