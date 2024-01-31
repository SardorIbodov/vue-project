<template>
  <div>
    <h1 class="title">Login</h1>
    <el-card class="box-card">
      <div class="text">
        <el-form ref="form" :model="form" class="form-elements">
          <el-input v-model="form.email" placeholder="Email"></el-input>
          <el-input
            v-model="form.password"
            placeholder="Password"
            show-password
          ></el-input>
          <el-form-item>
            <el-button type="primary" :plain="true" @click="onSubmit"
              > Login</el-button
            >
            <br />
            <el-link type="primary" @click="pushSignup"
              >Do not have account? Sign-up</el-link
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.form.email && this.form.password) {
        fetch("https://api.realworld.io/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: this.form }),
        })
          .then((res) => {
            if (!res.ok) this.$message("Password or email is wrong!");
            return res.json();
          })
          .then((res) => {
            localStorage.setItem("token", res.user.token);
            localStorage.setItem("userData", JSON.stringify(res.user))
            this.$router.push("/dashboard");
          })
          .catch((res) => console.log(res));
      } else this.$message("Please fill all inputs...");
    },
    pushSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  text-align: center;
}
.text {
  font-size: 14px;
}
.box-card {
  width: 480px;
  margin: 0 auto;
}

.form-elements {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}

.el-form-item {
  margin-bottom: 0;
}
</style>
