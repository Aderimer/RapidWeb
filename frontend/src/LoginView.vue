<script setup>
    import NavBar from './components/NavBar.vue';
    import { useAuthStore } from './stores/auth.js';
    import { router } from './main.js'
    import {Button} from 'primevue'
    import { ref } from 'vue';

    const authStore = useAuthStore();
    const email = ref('');
    const password = ref('');
    
    const handleSubmit = async () => {
        try {
            await authStore.login({
                email: email.value,
                password: password.value
            });
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
</script>

<template>
    <NavBar />
    <form @submit.prevent="handleSubmit()">
        <label for="email">Email</label>
        <input v-model="email" type="text" name="email" placeholder="Email">

        <label for="password">Password</label>
        <input v-model="password" type="password" name="password" placeholder="********">

        <Button id="btn-signup" label="login" type="submit">Log in</Button>
        <Button label="Sign up"><RouterLink to="/signup">Sign up</RouterLink></Button>
    </form>

</template>


<style scoped>
    form {
        display: flex;
        position: absolute;
        align-content: center;
        justify-content: center;
        flex-direction: column;
        position: absolute;
        font-weight: bold;
        font-size: large;
        max-width: 80vw;
        min-width: 30vw;

        left: 500px;
        border: 1px solid;
        padding: 20px;
        box-shadow: 10px 10px 20px black;
    }

    form > button, form > label {
        display: flex;
        justify-content: start;
        padding: 10px;
        margin: 15px;
        border-radius: 10px;
    }

    form > input {
        display: flex;
        justify-content: start;
        border-radius: 10px;
        border: solid 2px black;
        padding: 10px;
        font-weight: 600;
        font-size: medium;
    }

    form > input:hover, form > button:hover {
        cursor: pointer;
    }
</style>