import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/tailwind.css";
import BaseModal from "./components/BaseModal.vue"

const app = createApp(App);

app.component("BaseModal", BaseModal);

app.use(router);

app.mount('#app');
