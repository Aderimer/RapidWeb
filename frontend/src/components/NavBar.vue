<script setup>
    import Button from 'primevue/button'
    import { router } from '../main.js'


    const backButton = () => {
        router.go(-1)
    }
</script>

<template>
    <nav>
        <h1>Current path:  {{ $route.fullPath }}</h1>
        <Button v-on:click="backButton">Back</Button>
        <RouterLink to="/">Rapid Crew</RouterLink>
        <RouterLink to="/about">Om Oss</RouterLink>
        <RouterLink to="/merch">Merch</RouterLink>
        <RouterLink to="/login">Logg inn</RouterLink>
    </nav>
</template>

<style>
</style>