<script setup>
    import Input from "../inputs/Input.component.vue"

    const props = defineProps({
        list: Object,
        userId: String
    })

    const emit = defineEmits(['updateList'])

</script>
<template>
        <form class="space-y-4 md:space-y-6" method="put" @submit.prevent="emit('updateList', userId, list._id)">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update {{ list.label }} list
            </h1>
            <Input 
                type="text"
                label="Name of your list"
                inputName="label"
                placeholder="label"
                v-model:newValue=list.label
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