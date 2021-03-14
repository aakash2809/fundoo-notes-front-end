<template>
  <div>
    <form
      novalidate
      class="md-layout jc-center"
      @submit.prevent="validateUser"
      autocomplete="off"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-card-header>
              <div class="md-title">
                <Title />
              </div>
              <br />
              <div class="md-subheading">Create Fundoo Account</div>
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
                      autocomplete="off"
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
                      >Password should contain minimum 8 charecters
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
                      >Confirm Password should contain minimum 8 charecters
                    </span>
                  </md-field>
                </div>
              </div>
            </md-card-content>
            <md-card-content>
              <md-card-actions>
                <span>
                  <router-link to="/loginUser" class="route-link"
                    >sign in instead</router-link
                  >
                </span>
                <md-button type="submit" class="md-raised md-primary"
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

    sending: false,
    snackbar: false,
    snackbarText: "",
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3),
        isUnique(value) {
          if (typeof value === "undefined" || value === null || value === "") {
            return true;
          }
          return /^[A-Z]{1}[a-zA-Z ]{2,}$/.test(value);
        },
      },
      lastName: {
        required,
        minLength: minLength(3),
        isUnique(value) {
          if (typeof value === "undefined" || value === null || value === "") {
            return true;
          }
          return /^[A-Z]{1}[a-zA-Z ]{2,}$/.test(value);
        },
      },
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
      cpassword: {
        required,
        minLength: minLength(8),
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
      this.form.password = null;
      this.form.cpassword = null;
      router.push({
        name: "register",
      });
    },

    saveUser() {
      this.sending = true;
      let data = {
        name: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        password: this.form.password,
        confirmPassword: this.form.cpassword,
      };

      console.log("signup details: ", data);

      userServices
        .registerUser(data)
        .then((res) => {
          console.log("resiponse", res);
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
        this.saveUser();
      }
    },
  },

  components: {
    Title,
  },
};
</script>

<style scoped>
@import url("../scss/register.scss");
</style>
