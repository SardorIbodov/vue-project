<template>
  <div>
    <h1 class="title">Sign-Up</h1>
    <el-card class="box-card">
      <div class="text">
        <el-form ref="form" :model="form" class="form-elements">
          <el-form-item>
            <el-input v-model="form.username" placeholder="Username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              @input="isValidEmail"
              type="email"
              v-model="form.email"
              placeholder="Email"
            ></el-input>
            <span class="message" v-if="form.emailMessage !== ''">{{
              form.emailMessage
            }}</span>
          </el-form-item>
          <el-form-item>
            <el-input
              @input="isValidPassword"
              v-model="form.password"
              placeholder="Password"
              show-password
            ></el-input>
            <span class="message" v-if="form.passwordMessage !== ''">{{
              form.passwordMessage
            }}</span>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="form.isEnabledSubmitButton"
              type="primary"
              :plain="true"
              @click="onSubmit"
              >Registrate</el-button
            >
            <el-button
              v-else
              type="primary"
              :plain="true"
              @click="onSubmit"
              disabled
              >Registrate</el-button
            >
            <br />
            <el-link type="primary" @click="pushLogin"
              >Already have account? Login</el-link
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      form: {
        username: "",
        email: "",
        emailMessage: "",
        password: "",
        passwordMessage: "",
        isEnabledSubmitButton: false,
      },
    };
  },
  methods: {
    isValidEmail() {
      if (!this.form.email.includes("@")) {
        this.form.emailMessage = "Enter valid email";
      } else {
        this.form.emailMessage = "";
      }
      this.updateSubmitButtonState();
    },
    isValidPassword() {
      if (this.form.password.length < 6) {
        this.form.passwordMessage = "At least 6 characters";
      } else {
        this.form.passwordMessage = "";
      }
      this.updateSubmitButtonState();
    },
    updateSubmitButtonState() {
      this.form.isEnabledSubmitButton = !(
        this.form.emailMessage ||
        this.form.passwordMessage ||
        !this.form.email ||
        !this.form.password
      );
    },
    onSubmit() {
      if (this.form.username && this.form.email && this.form.password) {
        fetch("https://api.realworld.io/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: this.form }),
        })
          .then((res) => {
            if (res.ok) {
              this.$router.push("/login");
            } else {
              this.$message("Something went wrong...");
            }
          })
          .catch((res) => console.log(res));
      } else {
        this.$message("Please fill all inputs...");
      }
    },
    pushLogin() {
      this.$router.push("/login");
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

.message {
  display: block;
  font-size: 14px;
  color: red;
  margin-bottom: -30px;
}
</style>
