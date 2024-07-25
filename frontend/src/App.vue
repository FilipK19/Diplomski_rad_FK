<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/aboutme">About Me</router-link>
      <router-link to="/login">Login Page</router-link>
      <router-link to="/register">Register Page</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
nav {
  display: flex;
  gap: 10px;
}
</style>
