<template>
  <div>
    <HeaderComponent />
    <h1 class="title">Home Page</h1>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";

export default {
  name: "HomePage",
  components: {
    HeaderComponent,
  },
};
</script>

<style>
.title {
  text-align: center;
}
</style>
