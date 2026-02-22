import {createApp} from 'vue'
import {createPinia, type Pinia} from "pinia";
import './styles/custom.scss'
import App from './App.vue'
import {createRouter, createWebHistory, type Router} from 'vue-router';
import ItemSearchControls from "./components/ItemSearchControls.vue";
import Countries from './components/Countries.vue';
import CountryDetails from "./components/CountryDetails.vue";

const routes = [{
    path: "/",
    components: {
        controls: ItemSearchControls,
        list: Countries
    },
}, {
    path: "/details/:code",
    name: "country-detail",
    component: CountryDetails,
    props: false
}];

const router: Router = createRouter({
    history: createWebHistory(),
    routes
});

const pinia: Pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
