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
              <div class="md-subheading">Find your Fundoo Account</div>
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
            </md-card-content>

            <md-card-content>
              <md-card-actions>
                <md-button type="submit" class="md-raised md-primary"
                  >Next</md-button
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
import { required, email } from "vuelidate/lib/validators";
import Title from "../components/fundooTitle";
import userServices from "../services/user";

export default {
  name: "forgetPassword",
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null,
    },
    userSaved: false,
    sending: false,
  }),
  validations: {
    form: {
      email: {
        required,
        email,
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

      router.push({ path: "/forgotPassword" });
    },

    forgotPassword() {
      this.sending = true;
      let data = {
        email: this.form.email,
      };
      userServices
        .forgotPassword(data)
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
        this.forgotPassword();
      }
    },
  },

  components: {
    Title,
  },
};
</script>

<style lang = "scss" scoped>
@import url("../scss/forgotPasword.scss");
</style>
