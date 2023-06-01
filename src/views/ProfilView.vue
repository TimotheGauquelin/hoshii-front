<script setup>
    import listPresent from "../mock/list.ts"
    import PresentList from "../components/present-list/PresentList.component.vue"
    import UserCard from "../components/user/UserCard.component.vue"

    import axiosClient from "../axiosClient.js"

    // const getUser = (userId) => {
    //     axiosClient.get(`user/${userId}`)
    //     .then(({data}) => {
    //         console.log(data)
    //     })
    // }

</script>

<template>
    <UserCard name="Timothé GAUQUELIN" birthday="5 Mai 1994"/>
    <div class="mt-2 p-2 bg-green-200 rounded ">
        <p>Ma Liste :</p>
        <div v-for="list of listPresent" class="mb-2 p-2 rounded bg-red-200">
            <PresentList :list="list" />
        </div>
    </div>

</template>
