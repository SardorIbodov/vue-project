<template>
  <div>
    <HeaderComponent msg="Welcome to Your Vue.js App" />
    <ArticleList />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComponent from "@/components/Header.vue";
import ArticleList from "@/components/ArticleList.vue";

export default {
  created() {
    this.isLoggedIn();
  },
  name: "DashboardPage",
  components: {
    HeaderComponent,
    ArticleList,
  },
  methods: {
    isLoggedIn() {
      if (!localStorage.getItem("token")) this.$router.push("/");
    }
  }
};
</script>
