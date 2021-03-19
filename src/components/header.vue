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
          style="width: 40px; height: 40px" /></a
      ><span>FundooNotes</span>
      <v-spacer></v-spacer>
      <v-text-field
        class="search-field"
        solo
        rounded
        label="Search"
        prepend-inner-icon="mdi-magnify"
        clearable
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-avatar color="indigo" size="36">
        <span class="white--text headline">A</span>
      </v-avatar>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list class="mx-auto" v-model="selectedItem" shaped danse>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
    // group: null,
    selectedItem: 1,

    items: [
      { title: "Notes", icon: "mdi mdi-lightbulb-outline" },
      { title: "Reminder", icon: "mdi mdi-bell-outline" },
      { title: "Label", icon: "mdi mdi-label-outline" },
      { title: "Edit label", icon: "mdi mdi-pencil-outline" },
      { title: "Trash", icon: "mdi mdi-delete-outline" },
      { title: "Archive", icon: "mdi mdi-exit-to-app mdi-rotate-90" },
    ],
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




