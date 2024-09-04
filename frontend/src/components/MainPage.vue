<template>
  <div id="app">
    <h1 v-if="message">Hello {{ message }}</h1>
    <h2 v-if="message">test</h2>
    <p v-else>Authenticating login...</p>
    <button v-if="isAuthenticated" @click="logout">Logout</button>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      message: '',
      isAuthenticated: false
    };
  },
  mounted() {
    this.checkAuthentication();
  },
  methods: {
    async checkAuthentication() {
      try {
        const response = await axios.get('http://localhost:8000/user', {
          withCredentials: true
        });
        this.message = response.data.message;
        this.isAuthenticated = true;
      } catch (error) {
        console.log('Error accessing protected route:', error.response ? error.response.data : error.message);
        this.isAuthenticated = false;
        this.$router.push({ name: 'LoginPage' });
      }
    },
    logout() {
      Cookies.remove('token');

      axios.post('http://localhost:8000/logout', {}, { withCredentials: true })
        .then(() => {
          this.$router.push({ name: 'LoginPage' });
        })
        .catch(error => {
          console.error('Logout failed:', error);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
