import { createApp } from "vue";
import App from "./App.vue";
import useVuelidate from "@vuelidate/core";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import bootstrap from "bootstrap/dist/js/bootstrap.min";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(useVuelidate)
  .use(VueAxios, axios)
  .mount("#app");

app.config.globalProperties.$filters = {
  dateTimeFormat(value) {
    if (value == undefined) return " ";

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Intl.DateTimeFormat("ro-RO", options).format(new Date(value));
  },
};
window.bootstrap = bootstrap;
