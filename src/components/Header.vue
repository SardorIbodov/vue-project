<template>
  <el-header>
    <el-dropdown
      v-if="token"
      trigger="click"
      @command="handleCommand"
    >
      <span class="el-dropdown-link">
        <i class="el-icon-user"></i>
        {{ getUsername() }}
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="profile">Profile</el-dropdown-item>
        <el-dropdown-item command="dashboard">Dashboard</el-dropdown-item>
        <el-dropdown-item command="logout">Log out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div v-else>
      <el-button type="primary" @click="pushLogin">Login</el-button>
      <el-button type="primary" @click="pushSignup">Sign-up</el-button>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    msg: String,
  },
  data() {
    return {
      token: false,
    };
  },
  mounted() {
    fetch("https://api.realworld.io/api/user", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.ok) this.token = true;
    });
  },
  methods: {
    getUsername() {
      return JSON.parse(localStorage.getItem("userData"))?.username;
    },
    handleCommand(command) {
      switch (command) {
        case "logout":
          {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            this.$router.push("/");
            window.location.reload();
          }
          break;
        case "profile":
          {
            this.$router.push("/profile");
          }
          break;
        case "dashboard": {
          this.$router.push("/dashboard");
        }
      }
    },
    pushLogin() {
      this.$router.push("/login");
    },
    pushSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
