import { createApp } from 'vue';
import App from './App.vue';
import { initializeApp } from 'firebase/app';
import router from './router';

// coloque as suas configurações do firebase aqui
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

const firebaseApp = initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app');
