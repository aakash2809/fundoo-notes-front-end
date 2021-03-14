<template>
  <div>
    <form novalidate class="md-layout jc-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-30 md-small-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-card-header>
              <div class="md-title">
                <Title />
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
                  :disabled="sending"
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
                      :disabled="sending"
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
                  ></span
                >
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
import Title from "../components/fundooTitle";
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

    clearForm() {
      this.$v.$reset();
      this.form.email = null;
      this.form.password = null;
      router.push({ path: "/loginUser" });
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
          console.log("response", res.data.message);
          this.snackbar = true;
          this.snackbarText = `${res.data.message}`;
          this.clearForm();
        })
        .catch((error) => {
          this.snackbar = true;
          this.snackbarText = `internal server error`;
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
    Title,
  },
};
</script>

<style scoped>
@import url("../scss/login.scss");
</style>
