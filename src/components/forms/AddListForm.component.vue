<script setup>
    import Input from "../inputs/Input.component.vue"

    const props = defineProps({
        list: Object,
        userId: String
    })

    const emit = defineEmits(['addNewList', 'whatFunctionForModalToggle'])

</script>
<template>
        <form class="space-y-4 md:space-y-6" method="post" @submit.prevent="emit('whatFunctionForModalToggle', 'addListForm'); emit('addNewList', userId)">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add a list
            </h1>
            <Input 
                type="text"
                label="Name of your list"
                inputName="label"
                placeholder="label"
                v-model:newValue=list.label
            />
            <button 
                type="submit"
                data-cy="submit-btn"
                class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                Submit
            </button>
        </form>
</template>