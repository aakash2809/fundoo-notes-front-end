<template>
  <div>
    <div class="header">
      <Header />
    </div>
    <v-row>
      <v-col cols="3">
        <div class="side-nav pt-1"><SideNav /></div>
      </v-col>
    </v-row>
    <div></div>
  </div>
</template>
<script>
import Header from "../components/header1.vue";
import SideNav from "../components/sideNav.vue";
export default {
  name: "dashBoard",
  components: {
    Header,
    SideNav,
  },
  data() {},
};
</script>
<style scoped>
/* .header {
  width: 100vw;
  position: relative;
  margin-left: -50vw;
  height: 100px;
  left: 50%;
} */
</style>