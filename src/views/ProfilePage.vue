<template>
  <div>
    <HeaderComponent />
    <h1 class="title">Profile Page</h1>
    <ArticleList />
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import ArticleList from "@/components/ArticleList.vue";

export default {
  name: "ProfilePage",
  components: {
    HeaderComponent,
    ArticleList,
  },
};
</script>

<style>
.title {
  text-align: center;
}
</style>
