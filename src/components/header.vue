<template>
  <div>
    <v-row>
      <v-app-bar height="extended" color="white">
        <v-app-bar-nav-icon
          class="pt-3"
          v-on:click="cont = !cont"
        ></v-app-bar-nav-icon>
        <img
          class="gb_uc gb_7d pt-3"
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          srcset="
            https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x,
            https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x
          "
          alt=""
          aria-hidden="true"
          style="width: 40px; height: 40px"
        />
        <span class="pt-3">FundooNotes</span>
        <v-spacer></v-spacer>
        <v-text-field
          class="search-field pt-3"
          rounded
          solo
          filled
          label="Search"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-avatar class="mt-4" color="indigo" size="36">
          <span class="white--text headline">A</span>
        </v-avatar>
      </v-app-bar>
    </v-row>
    <v-row>
      <v-col>
        <div class="side-nav">
          <v-navigation-drawer
            v-model="drawer"
            v-on:click="cont = !cont"
            bottom
          >
            <v-list shaped>
              <v-list-item-group v-model="selectedItem" color="#e6b800">
                <v-list-item v-for="item in items" :key="item.title" link>
                  <v-list-item-icon
                    @mouseover="mouseEnter"
                    @mouseleave="mouseLeave"
                  >
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content v-show="cont">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
        </div>
      </v-col>
      <v-col>
        <div class="mr-15 pr-15">
          <v-card class="mt-15">
            <v-toolbar flat>
              <v-text-field flat solo rounded label="Title"></v-text-field>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-pin-outline</v-icon>
              </v-btn>
            </v-toolbar>

            <v-text-field
              flat
              solo
              rounded
              label="Take a Note..."
            ></v-text-field>
            <v-footer flat color="white">
              <v-btn icon>
                <v-icon>mdi-bell-plus-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi mdi-exit-to-app mdi-rotate-90</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi mdi-cookie-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi mdi-image-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi mdi-exit-to-app mdi-rotate-90</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
              <v-btn disabled icon>
                <v-icon>mdi mdi mdi-redo-variant mdi-rotate-180</v-icon>
              </v-btn>
              <v-btn disabled icon>
                <v-icon>mdi mdi-redo-variant</v-icon> </v-btn
              ><v-spacer></v-spacer>
              <v-btn flat shaped> close </v-btn>
            </v-footer>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",

  data: () => ({
    toShowOnHover: false,
    cont: false,
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
  methods: {
    mouseEnter: function () {
      this.cont = !this.cont;
    },
    mouseLeave: function () {
      this.cont = false;
    },
  },
};
</script>
 
<style lang = "scss" scoped>
@import "src/scss/home.scss";
</style>




