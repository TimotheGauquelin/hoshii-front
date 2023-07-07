<script setup>
    import { ref, reactive, computed } from 'vue'
    import { useRouter } from 'vue-router';
    import store from '../store'
    import axiosClient from "../axiosClient.js"
    import router from '../router'
    import SignUpForm from '../components/forms/SignUpForm.component.vue'
    import SignInForm from '../components/forms/SignInForm.component.vue'

    const isSignUp = ref(false)

    const signInForm = ref({
        username: "",
        password: ""
    })

    const signUpForm = ref({
        username: "",
        password: "",
        checkPassword: "",
        email: ""
    })

    const route = useRouter();

    const isSignUpToggle = () => {
        isSignUp.value = !isSignUp.value
    }

    const signUp = () => {
        if(signUpForm.password === signUpForm.checkPassword) {
            axiosClient().post('auth/register', signUpForm.value)
            .then(({data}) => {
                isSignUp.value = false
            })  
        } else {
            console.log("Mots de passe différents..")
        }
    }

    const signIn = () => {
        axiosClient().post('auth/login', signInForm.value)
        .then(({data}) => {
            store.dispatch('setProfil', data)
            if (data.accessToken) {
                localStorage.setItem("access_token", data.accessToken)
                route.push('/home')
            }
        })
        .catch(function (error) {
            if(error.response) {
                console.log(error.response)
            }
        })
    }

</script>

<template class="">
    <section class="bg-gray-300 dark:bg-gray-900 min-h-screen grid">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-autolg:py-0">
            <a  href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <p id="appName">HOSHII</p> 
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <SignUpForm v-if="isSignUp === true" :user=signUpForm @isSignUpToggle="isSignUpToggle" @signUp="signUp"/>
                    <SignInForm v-else :user="signInForm" @isSignUpToggle="isSignUpToggle" @signIn="signIn"/>
                </div>
            </div>
        </div>
    </section>
</template>