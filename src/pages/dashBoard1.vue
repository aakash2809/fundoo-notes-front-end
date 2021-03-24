<template>
  <div>
    <div class="header">
      <Header />
    </div>
    <v-row fullscreen>
      <v-col cols="3">
        <div class="side-nav pt-1">
          <SideNav />
        </div>
      </v-col>
      <v-col cols="9">
        <v-col offset-md="2" cols="6"> <Note /> </v-col>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Header from "../components/header1.vue";
import SideNav from "../components/sideNav.vue";
import Note from "../components/note";
//import { EventBus } from "/";
import Vue from "vue";
const EventBus = new Vue();

export default {
  name: "dashBoard",
  components: {
    Header,
    SideNav,
    Note,
  },
  data() {},
  methods: {
    onClickOutSide() {
      console.log("");
      EventBus.$emit("onClickOutSide", true);
    },
  },
};
</script>
<style scoped>
.side-nav {
  height: 650px;
}
</style>