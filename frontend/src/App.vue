<template>
  <div id="app">
    <nav>
      <!-- Links visible when user is not logged in -->
      <template v-if="!isLoggedIn">
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login Page</router-link>
        <router-link to="/register">Register Page</router-link>
      </template>

      <!-- Links visible when user is logged in -->
      <template v-if="isLoggedIn">
        <router-link to="/main">Main Page</router-link>
        <router-link to="/CRDT">CRDT</router-link>
        <router-link to="/Locking">Locking</router-link>
        <router-link to="/NoMethod">No Method</router-link>
      </template>
    </nav>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false
    };
  },
  async mounted() {
    try {
      // Check if the user is logged in
      await axios.get('http://localhost:8000/user', { withCredentials: true });
      this.isLoggedIn = true;
    } catch (error) {
      this.isLoggedIn = false;
    }
  }
}
</script>

<style>
nav {
  display: flex;
  gap: 10px;
}
</style>
