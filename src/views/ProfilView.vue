<script setup>
    import listPresent from "../mock/list.ts"
    import PresentList from "../components/present-list/PresentList.component.vue"
    import UserCard from "../components/user/UserCard.component.vue"

</script>

<template>
    <UserCard name="Timothé GAUQUELIN" birthday="5 Mai 1994"/>
    <div class="mt-2 p-2 bg-green-200 rounded ">
        <p>Ma Liste :</p>
        <PresentList :presentList="listPresent" />
    </div>
</template>
