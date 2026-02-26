<script setup>
    import Button from 'primevue/button'
    import { router } from '../main.js'
    import { useAuthStore } from '../stores/auth.js'
import Cookies from 'universal-cookie';

    const authStore = useAuthStore();
    const isUser = localStorage.getItem('token') !== null;
    const role = localStorage.getItem('role');
    const isAdmin = role === 'Admin';
    const username = localStorage.getItem('username');
    
    const logout = () => {
        authStore.logout();
        router.push('/login');
        Cookies.remove('jwt');
    }

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
            <RouterLink v-if="isAdmin" to="/admin">Admin</RouterLink>
            <RouterLink v-if="!isUser" to="/login">Logg inn</RouterLink>
            <RouterLink v-if="!isUser" to="/signup">Registrer</RouterLink>
            <Button v-if="isUser" v-on:click="logout()">Logg ut</Button>
            <span v-if="isUser">{{ username }}</span>
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