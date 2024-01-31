import Vue from "vue";
import VueRouter from "vue-router";
import SignupPage from "../views/SignupPage.vue";
import HomePage from "../views/HomePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/signup",
    name: "SignupPage",
    component: SignupPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginPage.vue"),
  },
  {
    path: "/dashboard",
    name: "DashboardPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DashboardPage.vue"),
  },
  {
    path: "/profile",
    name: "ProfilePage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProfilePage.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
