<template>
  <!--  <div class="side-nav">
    <v-navigation-drawer>
      <v-list max-width="400" height="550" shaped>
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
  </div> -->
  <v-navigation-drawer
    v-model="drawer"
    v-on:click="cont = !cont"
    bottom
    expand-on-hover
  >
    <v-list shaped app>
      <v-list-item-group
        v-model="selectedItem"
        color="#e6b800"
        @click.native.stop="expand"
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="selectFucntion(item.title)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content v-show="cont">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "SideNav",
  data: () => ({
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
};
</script>
 
<style lang = "scss" scoped>
/* .side-nav {
  padding-top: -40px;
} */
</style>