<script setup>
    const props = defineProps({
        user: Object,
        // picture: String,
        birthday: String
    })

</script>

<template lang="">
    <div class="flex p-2 bg-green-200 rounded items-center">
        <div class="inline-block mr-4">
          <img class="rounded-full max-w-none w-12 h-12 border-2 border-black" :src="user.picture" />
        </div>
        <div class="flex flex-col">
          <div>
            <p class="inline-block text-lg font-bold">{{user.username}}</p>
          </div>
          <div class="text-slate-500">
            {{birthday}}
          </div>
        </div>
    </div>
</template>
