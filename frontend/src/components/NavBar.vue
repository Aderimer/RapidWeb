<script setup>
    import Button from 'primevue/button'
    import { router } from '../main.js'


    const backButton = () => {
        router.go(-1)
    }
</script>

<template>
    <nav class="nav">
        <section class="nav-left">
            <Button v-on:click="backButton">Back</Button>
            <RouterLink to="/">Rapid Crew</RouterLink>
            <RouterLink to="/about">Om Oss</RouterLink>
            <RouterLink to="/merch">Merch</RouterLink>
        </section>

        <section class="nav-right">
            <RouterLink to="/login">Logg inn</RouterLink>
        </section>
    </nav>
            <h1>Current path:  {{ $route.fullPath }}</h1>

</template>

<style>
    .nav {
        position: static;
        display: flex;
        align-items: center;
        justify-content: space-between;
        top: 0px;
        max-width: 100vw;
        left: 0px;
        margin-bottom: 10px;
        padding-bottom: 20px;
        border-bottom: solid 1px gray;
    }

    .nav-left > a {
        padding: 7.5px;
        text-decoration: none;
        color: black;
        border: 1px solid rgb(0, 0, 0);
        border-radius: 10px;
        margin: 5px;

    }

    .nav-right > a {
        padding: 7.5px;
        text-decoration: none;
        color: black;
        border: 1px solid rgb(0, 0, 0);
        border-radius: 7px;
        margin: 5px;
    }

    a:hover {
        background-color: rgb(128, 128, 128);
        transition: all 0.5s;
    }
</style>