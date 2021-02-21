import { createApp } from "vue";
import App from "./App.vue";
import Toast from "./components/Toast.vue";
import router from "./router";

createApp(App)
  .use(router)
  .component("Toast", Toast)
  .mount("#app");
