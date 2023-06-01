<script setup>
    import { ref } from 'vue'
    import { useRoute } from 'vue-router';
    import store from '../store'
    import axiosClient from "../axiosClient.js"
    import router from '../router'


    const isSignUp = ref(false)
    const loginForm = ref({
        username: "",
        password: ""
    })

    const route = useRoute();

    const isSignUpToggle = () => {
        isSignUp.value = !isSignUp.value
    }

    const signIn = () => {
        axiosClient.post(`auth/login`, loginForm.value)
        .then(({data}) => {
            // console.log(data)
            store.dispatch('setProfil', data)
            router.push(`/home`)
        })
        // .error((err) => {
        //     console.log(err)
        // })
    }

</script>

<template class="">
    <section class="bg-gray-300 dark:bg-gray-900 min-h-screen grid">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-autolg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                HOSHII    
            </a>
           <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {{`${isSignUp ? "Sign Up" : "Sign In"} to your account`}}
                    </h1>
                    <form class="space-y-4 md:space-y-6" method="post" @submit.prevent="signIn"
>
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input type="username" 
                                   name="username" 
                                   id="username" 
                                   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                   placeholder="username" 
                                   required=""
                                   v-model="loginForm.username"
                                   @change="updateLoginForm"
                                   >
                        </div>
                        <div v-if="isSignUp">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mail@mail.com" required="">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" 
                                   name="password" 
                                   id="password" 
                                   placeholder="••••••••" 
                                   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                   required=""
                                   v-model="loginForm.password"
                                   @change="updateLoginForm"
                                   >
                        </div>
                        <div v-if="isSignUp">
                            <label for="check-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Check Password</label>
                            <input type="check-password" name="check-password" id="check-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                        </div>
                        <!-- <div v-if="!isSignUp" class="flex items-center justify-between">
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
                        </div> -->
                        <button 
                            type="submit"
                            class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{{`${isSignUp ? "Sign Up" : "Sign In"}`}}</button>
                        <div class="flex text-sm font-light text-gray-500 dark:text-gray-400">
                            <p>{{`${isSignUp ? "You have already an account: " : "Don’t have an account yet ? "}`}}</p> 
                            <p class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer" @click="isSignUpToggle">{{`${isSignUp ? " Sign In" : " Sign Up"}`}} </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>