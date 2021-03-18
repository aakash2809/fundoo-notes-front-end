<template>
  <div class="header">
    <v-app-bar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <a
        class="gb_me gb_qc gb_ke"
        aria-label="FundooNotes"
        href="#"
        tabindex="0"
        title="FundooNotes"
        ><img
          class="gb_uc gb_7d"
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          srcset="
            https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x,
            https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x
          "
          alt=""
          aria-hidden="true"
          style="width: 40px; height: 40px"
        /><span class="gb_6d gb_Wc">FundooNotes</span></a
      >
      <v-text-field
        class="search-field"
        solo
        label="Search"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-icon>mdi-refresh</v-icon>
      <!-- <v-icon>mdi-list-view</v-icon>
      <v-icon>mdi-setting</v-icon>
      <v-icon>fas fa-list</v-icon> -->
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Notes</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>reminder</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Edit label</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Trash</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Archive</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- <div class="header">
    <span> Hello {{ name }}</span>
  </div> -->
  </div>
</template>
<script>
export default {
  name: "Home",
  /*props: ["name"],
}; */

  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
 
<style lang = "scss" scoped>
@import "src/scss/home.scss";
</style>




