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
                      type="password"
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
                      >Password should contain minimum 8 charecters
                    </span>
                  </md-field>
                </div>
              </div>
            </md-card-content>
            <md-card-content>
              <md-card-actions>
                <span>
                  <router-link to="/register" class="route-link"
                    >register instead</router-link
                  >
                </span>
                <md-button type="submit" class="md-raised md-primary"
                  >Reset</md-button
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
	name: "resetPassword",
	mixins: [validationMixin],
	data: () => ({
		form: {
			email: null,
			newPassword: null,
		},
		snackbar: false,
		snackbarText: "",
		sending: false,
		isInfinity: true,
	}),
	validations: {
		form: {
			email: {
				required,
				email,
			},
			newPassword: {
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
			this.form.newPassword = null;
			router.push({ path: "/loginUser" });
		},
		resetPassword() {
			this.sending = true;
			let data = {
				email: this.form.email,
				password: this.form.newPassword,
			};

			console.log("reset details: ", data);

			userServices
				.resetPassword(data)
				.then((res) => {
					console.log(res.data.message);
					this.snackbar = true;
					this.snackbarText = `${res.data.message}`;
					this.clearForm();
				})
				.catch((error) => {
					console.log(error);
					this.snackbar = true;
					this.snackbarText = `internal server error`;
					this.clearForm();
				});
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
</style>
