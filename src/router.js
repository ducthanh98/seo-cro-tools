import Measure from "./pages/Measure";
import ABTesting from "./pages/ABTesting";
import VueRouter from "vue-router";
import HeatMap from "./pages/HeatMap";


const routes = [
    { path: '/measure', component: Measure },
    { path: '/', component: Measure },
    { path: '/ab-testing', component: ABTesting },
    { path: '/heatmap', component: HeatMap }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

export default  router;