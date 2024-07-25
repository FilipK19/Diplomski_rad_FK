import { createMemoryHistory, createRouter } from 'vue-router';
import Home from '../components/Home.vue';
import AboutMe from '../components/AboutMe.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/aboutme',
    name: 'AboutMe',
    component: AboutMe
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
