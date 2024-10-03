<script setup>
import { RouterView } from 'vue-router'
import MainNav from './components/MainNav.vue';

</script>

<template>

    <html>
        <nav>
            <MainNav></MainNav>
        </nav>

        <body>
            <RouterView />
        </body>
    </html>

</template>

<style>
</style>