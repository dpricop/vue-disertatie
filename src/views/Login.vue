<template>
  <div
    class="d-flex justify-content-center align-items-center"
    id="loginFrmContainer"
  >
    <form class="col-10 col-md-5 col-lg-4 p-4 radius-2 bg-light">
      <h3 class="text-center mb-4">Member Login</h3>
      <div>
        <input
          type="text"
          class="form-control"
          placeholder="Login"
          autocomplete="username"
          v-model="login"
          :class="[
            v$.login.$dirty == true && v$.login.$errors.length > 0
              ? 'is-invalid'
              : '',
            v$.login.$dirty == true && v$.login.$errors.length == 0
              ? 'is-valid'
              : '',
          ]"
          @blur="v$.login.$touch()"
        />
        <div
          :class="[
            v$.login.$dirty == true && v$.login.$errors.length > 0
              ? 'invalid-feedback'
              : 'valid-feedback',
          ]"
          v-if="v$.login.$errors.length > 0"
        >
          {{ v$.login.$errors[0].$message }}
        </div>
      </div>

      <div class="my-3">
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          v-model="password"
          :class="[
            v$.password.$dirty == true && v$.password.$errors.length > 0
              ? 'is-invalid'
              : '',
            v$.password.$dirty == true && v$.password.$errors.length == 0
              ? 'is-valid'
              : '',
          ]"
          @blur="v$.password.$touch()"
        />
        <div
          :class="[
            v$.password.$dirty == true && v$.password.$errors.length > 0
              ? 'invalid-feedback'
              : 'valid-feedback',
          ]"
          v-if="v$.password.$errors.length > 0"
        >
          {{ v$.password.$errors[0].$message }}
        </div>
      </div>

      <div class="d-grid gap-2 d-block">
        <button
          type="submit"
          class="btn btn-default radius-2"
          @click.prevent="onClickSubmitBtn"
          :disabled="isLoading == true"
        >
          <span
            class="spinner-border spinner-border-sm mx-2"
            v-if="isLoading == true"
          ></span>
          <strong>Sign in</strong>
        </button>
      </div>
      <p class="text-end my-3">
        <button class="btn forgot-link" @click.prevent="onClickForgotPassword">
          Forgot Password?
        </button>
      </p>
      <!-- <p class="alert alert-danger text-center" v-if="user.count == 0">
        Login failed, username or password is incorrect.
      </p>
      <p class="alert alert-success text-center" v-if="user.count == 1">
        Login success, redirect to home page.
      </p> -->
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    isLoading: false,
    login: "",
    password: "",
    user: {},
  }),
  mounted() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));

      this.$router.push({
        name: "home",
      });
    }
  },
  methods: {
    async onClickSubmitBtn() {
      // this.user.count = undefined;

      this.v$.$touch();

      if (this.v$.$errors.length > 0) return true;

      this.isLoading = true;

      await this.$store.dispatch("users/loginUser", {
        login: this.login,
        password: this.password,
      });

      this.user = this.$store.getters["users/getUser"];
      localStorage.setItem("user", JSON.stringify(this.user));
      this.isLoading = false;

      console.log(this.user);

      if (this.user.count == 1) {
        this.$router.push({
          name: "home",
        });
      } else {
        console.log("validation faile");
      }
    },
    onClickForgotPassword() {
      console.log("onClickForgotPassword");
    },
  },
  validations() {
    return {
      login: {
        required,
        email: helpers.withMessage("Value is not a valid email address", email),
        minLength: minLength(3),
        maxLength: maxLength(55),
      },
      password: {
        minLength: minLength(3),
        required,
        maxLength: maxLength(55),
      },
    };
  },
};
</script>
<style scoped>
#loginFrmContainer {
  height: 100vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    133deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(47, 57, 73, 1) 0%,
    rgba(71, 186, 193, 1) 100%
  );
}
#loginFrmContainer > form {
  max-width: 450px !important;
}
.radius-2 {
  border-radius: 2px !important;
}
.btn-default {
  background-color: #2f3949;
  color: #fff;
}
.forgot-link {
  color: #2f3949;
}
.forgot-link:hover {
  text-decoration: underline;
}
input:focus,
input:active,
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
}
</style>
