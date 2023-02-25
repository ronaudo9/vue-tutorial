import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import IndexView from "../views/IndexView.vue";
import GlobalHeader from "../components/GlobalHeader.vue";
import ItemDetail from "../views/ItemDetail.vue";
import signView from "../views/SignView.vue";
import shoppingCart from "../views/shoppingCart.vue";
import order from "../views/orderView.vue";
import thanks from "../views/thanksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:id",
      name: "detail",
      props: true,
      component: ItemDetail,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/index",
      name: "index",
      component: IndexView,
    },
    {
      path: "/header",
      name: "header",
      component: GlobalHeader,
    },
    {
      path: "/signin",
      name: "sign",
      component: signView,
    },
    {
      path: "/cart",
      name: "cart",
      component: shoppingCart,
    },
    {
      path: "/order",
      name: "prder",
      component: order,
    },
    {
      path: "/thanks",
      name: "thanks",
      component: thanks,
    },
  ],
});

export default router;
