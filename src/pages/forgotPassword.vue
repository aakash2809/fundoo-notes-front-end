

<template>
  <div>
    <form novalidate class="md-layout jc-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-30 md-small-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-card-header>
              <div class="md-title" v-bind:style="styleObject">
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
            </md-card-content>

            <md-card-content>
              <md-card-actions>
                <md-button
                  type="submit"
                  class="md-raised md-primary"
                  :disabled="sending"
                  >Next</md-button
                >
              </md-card-actions>
            </md-card-content>
          </div>
        </div>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import router from "../router";
import { required, email } from "vuelidate/lib/validators";
import Title from "../components/fundooTitle";

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
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        required,
        email,
      },

      password: {
        required,
      },
      cpassword: {
        required,
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
      window.setTimeout(() => {
        router.push({
          name: "home",
        });
      }, 2000);
    },
    LoginUser() {
      this.sending = true;
      let data = {
        email: this.form.email,
      };
      console.log("signup details: ", data);
    },

    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
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
