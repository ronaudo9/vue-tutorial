import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import '@/styles.css'
import store from './store';

const app = createApp(App);
app.use(store)
app.use(createPinia());
app.use(router);

app.mount("#app");
