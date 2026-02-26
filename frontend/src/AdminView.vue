<script setup>
  import Button from "primevue/button";
import NavBar from "./components/NavBar.vue";

</script>

<template>
  <NavBar />
  <h1>Boink</h1>
  <Button label="Save">Test</Button>
  <span>Admin</span>

  <main>
    <RouterView />
  </main>

</template>

<style scoped></style>
