<template>
  <v-app-bar color="white" height="80px">
    <v-app-bar-nav-icon v-on:click="cont = !cont"></v-app-bar-nav-icon>
    <img
      class="gb_uc gb_7d"
      src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
      srcset="
        https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x,
        https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x
      "
      alt=""
      aria-hidden="true"
      style="width: 40px; height: 40px"
    />
    <span>FundooNotes</span>
    <v-spacer></v-spacer>
    <v-text-field
      class="search-field"
      rounded
      solo
      filled
      label="Search"
      prepend-inner-icon="mdi-magnify"
      clearable
      hide-details
      danse
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-avatar color="indigo" size="36">
      <span class="white--text headline">A</span>
    </v-avatar>
  </v-app-bar>
</template>
<script>
export default {
  name: "Header",
  data: () => ({}),
};
</script>
<style lang="scss" scoped>
@import "src/scss/home.scss";
</style>