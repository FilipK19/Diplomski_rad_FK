<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <div v-if="error" class="error">Error: {{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const formData = new FormData();
        formData.append('username', this.username);
        formData.append('password', this.password);

        const response = await axios.post('http://localhost:8000/token', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        });
        console.log('Login successful:', response.data);

        // Save token to a cookie
        Cookies.set('token', response.data.access_token, { expires: 1 });

        this.$router.push({ name: 'MainPage' });
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Login failed:', error.response.data);
          this.error = 'Invalid username or password. Please try again.';
        } else if (error.request) {
          // Request was made but no response received
          console.error('No response received:', error.request);
          this.error = 'No response from the server. Please try again later.';
        } else {
          // Something else caused the error
          console.error('Error during login:', error.message);
          this.error = 'An error occurred during login. Please try again.';
        }
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
