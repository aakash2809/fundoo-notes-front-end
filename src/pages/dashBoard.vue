<template>
  <div>
    <Home v-bind:name="firstName" />
  </div>
</template>
<script>
import Home from "../components/home.vue";
export default {
	name: "dashBoard",
	components: {
		Home,
	},
	data() {
		return { firstName: `${localStorage.getItem("firstName")}` };
	},
};
</script>