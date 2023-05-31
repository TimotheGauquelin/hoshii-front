<script setup>
    const props = defineProps({
        tabName: String,
        href: String
    })
</script>
<template lang="">
    <li role="presentation" class="col-span-6 text-center">
        <router-link 
            :to='href'
            class="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
        >
            {{tabName}}
        </router-link>
    </li>
</template>