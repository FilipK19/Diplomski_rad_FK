<template>
  <div>
    <h1>Welcome Page</h1>
    <p>Welcome to the App</p>
    <button @click="goToLogin" v-if="!isLoggedIn">Login</button>
    <button @click="goToRegister" v-if="!isLoggedIn">Register</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WelcomePage',
  data() {
    return {
      isLoggedIn: false,
    };
  },
  async mounted() {
    try {
      // Check if the user is logged in
      await axios.get('http://localhost:8000/user', { withCredentials: true });
      this.isLoggedIn = true;
      // Redirect to /main if logged in
      this.$router.push({ name: 'MainPage' });
    } catch (error) {
      // If an error occurs (e.g., 401 Unauthorized), the user is not logged in
      this.isLoggedIn = false;
    }
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'LoginPage' });
    },
    goToRegister() {
      this.$router.push({ name: 'RegisterPage' });
    }
  }
}
</script>
