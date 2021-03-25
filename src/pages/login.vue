<template>
  <div>
    <form novalidate class="md-layout jc-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-30 md-small-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-card-header>
              <div class="md-title">
                <Title></Title>
              </div>
              <br />
              <div class="md-subheading">Login Fundoo Account</div>
            </md-card-header>

            <md-card-content>
              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input
                  outline
                  dense
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  v-model="form.email"
                />
                <span class="md-error" v-if="!$v.form.email.required"
                  >The email is required</span
                >
                <span class="md-error" v-else-if="!$v.form.email.email"
                  >Invalid email</span
                >
              </md-field>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100 md-small-size-100">
                  <md-field :class="getValidationClass('password')">
                    <label for="password"> Password</label>
                    <md-input
                      name="password"
                      type="password"
                      id="password"
                      v-model="form.password"
                    />
                    <span class="md-error" v-if="!$v.form.password.required"
                      >The password is required</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.password.minlength"
                      >Password should contain minimum 8 charecters
                    </span>
                  </md-field>
                </div>
              </div>
            </md-card-content>
            <md-card-content>
              <md-card-actions>
                <span>
                  <router-link to="/forgotPassword" class="route-link1"
                    >forgot password ?</router-link
                  >
                </span>
                <div>
                  <span>
                    <router-link to="/register" class="route-link"
                      >register instead</router-link
                    >
                  </span>
                </div>
                <md-button type="submit" class="md-primary md-raised"
                  >Login</md-button
                >
              </md-card-actions>
            </md-card-content>
          </div>
        </div>
      </md-card>
      <md-snackbar :md-active.sync="snackbar">
        {{ snackbarText }}
        <md-button class="md-primary" @click="snackbar = false"
          >Close</md-button
        >
      </md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import router from "../router";
import { required, email, minLength } from "vuelidate/lib/validators";
import fundooTitle from "../components/fundooTitle";
import userServices from "../services/user";

export default {
  name: "Login",
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null,
    },
    snackbar: false,
    snackbarText: "",
    sending: false,
  }),
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
        isUnique(value) {
          if (typeof value === "undefined" || value === null || value === "") {
            return true;
          }
          return /^(?=.*[0-9])(?=.*[A-Z])(?=.*[\\~\\?\\.\\+\\-\\~\\!\\@\\#\\$\\%\\^\\&\\*\\_])[a-zA-Z0-9\\~\\?\\.\\+\\-\\~\\!\\@\\#\\$\\%\\^\\&\\*\\_]{8,}$/.test(
            value
          );
        },
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },

    clearForm(redirectKey) {
      this.$v.$reset();
      this.form.email = null;
      this.form.password = null;
      if (redirectKey) {
        router.push({
          path: "/dashBoard",
        });
      }
    },

    login() {
      this.sending = true;
      let data = {
        email: this.form.email,
        password: this.form.password,
      };
      console.log("Login details: ", data);
      userServices
        .loginUser(data)
        .then((res) => {
          if (res.data.success) {
            console.log("if response: ");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("firstName", res.data.user[0].name);
            localStorage.setItem("lastName", res.data.user[0].lastName);
            localStorage.setItem("email", res.data.user[0].email);

            this.snackbar = true;
            this.snackbarText = `${res.data.message}`;
            this.clearForm(res.data.success);
          } else {
            this.snackbar = true;
            this.snackbarText = `${res.data.message}`;
            this.clearForm(res.data.success);
          }
        })
        .catch((error) => {
          this.snackbar = true;
          this.snackbarText = `internal server error`;
          this.clearForm(false);
          console.log(error);
        });
    },

    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.login();
      }
    },
  },

  components: {
    Title: fundooTitle,
  },
};
</script>

<style scoped>
@import url("../scss/login.scss");
</style>
