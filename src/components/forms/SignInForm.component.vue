<script setup>
    import { defineProps, defineEmits } from 'vue'

    import Input from '../inputs/Input.component.vue'

    const props = defineProps({
        user: Object
    })

    const emit = defineEmits(['isSignUpToggle', 'signIn'])


</script>

<template lang="">
        <form class="space-y-4 md:space-y-6" method="post" @submit.prevent="emit('signIn')">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign In to your account
        </h1>
        <Input 
            type="text"
            label="Your Username"
            inputName="username"
            placeholder="username"
            v-model:newValue=user.username
        />
        <Input 
            type="password"
            label="Your Password"
            inputName="password"
            placeholder="••••••"
            v-model:newValue=user.password
        />
        <div v-if="!isSignUp" class="flex items-center justify-between">
            <div class="flex items-start">
                <div class="flex items-center h-5">
        <input id="remember" 
            aria-describedby="remember" 
            type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
            required="">
        </div>
        <div class="ml-3 text-sm">
            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
        </div>
        </div>
        <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
        </div>
        <button 
            type="submit"
            class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign In</button>
        <div class="flex text-sm font-light text-gray-500 dark:text-gray-400">
            <p>Don't have already an account ?</p> 
            <p class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer" @click="emit('isSignUpToggle')">Sign Up</p>
        </div>
    </form>
</template>

