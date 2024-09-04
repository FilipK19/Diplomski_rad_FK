<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <div v-if="error" class="error">Error: {{ error }}</div>
  </div>
  <button @click="goToStart">Return to start</button>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    goToStart() {
      this.$router.push({ name: 'Welcome' });
    },
    async register() {
      this.error = null;
      try {
        const response = await axios.post('http://localhost:8000/register/', {
          username: this.username,
          hashed_password: this.password
        });

        console.log('Registration successful:', response.data);
        this.error = null;
        
        window.alert('Registered successfully, please login');
        
        // Redirect to login page
        this.$router.push({ name: 'LoginPage' });
      } catch (error) {
        console.error('Registration failed:', error.response.data);
        this.error = error.response.data.detail;
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
