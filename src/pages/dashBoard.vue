<template>
  <div>
    <div>
      <Home v-bind:name="firstName" />
    </div>
    <div>
      <SideNav />
    </div>
  </div>
</template>
<script>
import Home from "../components/header.vue";
import SideNav from "../components/sideNav.vue";
export default {
  name: "dashBoard",
  components: {
    Home,
    SideNav,
  },
  data() {
    return { firstName: `${localStorage.getItem("firstName")}` };
  },
};
</script>