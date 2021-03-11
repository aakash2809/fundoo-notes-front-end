<template>
  <div>
    <form novalidate class="md-layout jc-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100 overflow-x">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-card-header>
              <div class="md-title" v-bind:style="styleObject">
                <Title />
                <br />
                <br />
                Create Fundoo Account
              </div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50 md-small-size-100">
                  <md-field :class="getValidationClass('firstName')">
                    <label for="last-name">First Name</label>
                    <md-input
                      id="first-name"
                      v-model="form.firstName"
                      label="First name"
                      :disabled="sending"
                    />

                    <span class="md-error" v-if="!$v.form.firstName.required"
                      >The first name is required</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.firstName.minlength"
                      >Invalid first name</span
                    >
                  </md-field>
                </div>

                <div class="md-layout-item md-size-50 md-small-size-100">
                  <md-field :class="getValidationClass('lastName')">
                    <label for="last-name">Last Name</label>
                    <md-input
                      name="last-name"
                      id="last-name"
                      autocomplete="family-name"
                      v-model="form.lastName"
                      outline
                      dense
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.lastName.required"
                      >The last name is required</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.lastName.minlength"
                      >Invalid last name</span
                    >
                  </md-field>
                </div>
              </div>

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
                <div class="md-layout-item md-size-50 md-small-size-100">
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
                      >Password should contain minimum 4 charecters
                    </span>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-50 md-small-size-100">
                  <md-field :class="getValidationClass('password')">
                    <label for="cpassword">Confirm Password</label>
                    <md-input
                      name="cpassword"
                      type="password"
                      id="cpassword"
                      v-model="form.cpassword"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.cpassword.required"
                      >The confirm password is required</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.cpassword.minlength"
                      >Confirm Password should contain minimum 4 charecters
                    </span>
                  </md-field>
                </div>
              </div>
            </md-card-content>
            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-content>
              <md-card-actions>
                <span>
                  <router-link to="/login" class="route-link"
                    >sign in instead</router-link
                  >
                </span>

                <v-spacer> </v-spacer>
                <md-button
                  type="submit"
                  class="md-raised md-primary"
                  :disabled="sending"
                  >Next</md-button
                >
              </md-card-actions>
            </md-card-content>
          </div>

          <div class="md-layout-item md-size-40 md-small-size-100 fundoo-image">
            <figure class="account-img">
              <img
                src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
                alt=""
                width="244"
                height="244"
                class="j9NuTc TrZEUc"
              />
              <figcaption class="oEvHdd">
                One account. All of Fundoo working for you.
              </figcaption>
            </figure>
          </div>
        </div>
      </md-card>

      <md-snackbar :md-active.sync="userSaved"
        >The user {{ lastUser }} was saved with success!</md-snackbar
      >
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import router from "../router";
import { required, email } from "vuelidate/lib/validators";
import Title from "../components/fundooTitle";
import axios from "axios";

export default {
  name: "SignUp",
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      cpassword: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
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
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.email = null;
      this.form.phone = null;
      this.form.password = null;
      this.form.cpassword = null;
      window.setTimeout(() => {
        router.push({
          name: "home",
        });
      }, 2000);
    },
    saveUser() {
      this.sending = true;
      let data = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        password: this.form.password,
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

  register() {
    axios.post("register");
  },

  components: {
    Title,
  },
};
</script>

<style scoped>
@import url("../scss/register.scss");
</style>
