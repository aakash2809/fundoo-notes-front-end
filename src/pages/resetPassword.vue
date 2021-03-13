

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
              <div class="md-subheading">Reset Account Password</div>
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

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100 md-small-size-100">
                  <md-field :class="getValidationClass('password')">
                    <label for="newPassword">New Password</label>
                    <md-input
                      name="newPassword"
                      type="newPassword"
                      id="newPassword"
                      v-model="form.newPassword"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.newPassword.required"
                      >The password is required</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.newPassword.minlength"
                      >Password should contain minimum 4 charecters
                    </span>
                  </md-field>
                </div>
              </div>
            </md-card-content>
            <md-card-content>
              <md-card-actions>
                <span>
                  <router-link to="/register" class="route-link"
                    >register in instead</router-link
                  >
                </span>
                <md-button
                  type="submit"
                  class="md-raised md-primary"
                  :disabled="sending"
                  >Reset</md-button
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
import { required, email } from "vuelidate/lib/validators";
import Title from "../components/fundooTitle";

export default {
  name: "resetPassword",
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      newPassword: null,
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

      newPassword: {
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
      this.form.newPassword = null;
    },
    resetPassword() {
      this.sending = true;
      let data = {
        email: this.form.email,
        password: this.form.newPassword,
      };
      console.log("signup details: ", data);
    },

    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.resetPassword();
      }
    },
  },

  components: {
    Title,
  },
};
</script>

<style lang = "scss" scoped>
@import url("../scss/resetPasword.scss");
</style>
