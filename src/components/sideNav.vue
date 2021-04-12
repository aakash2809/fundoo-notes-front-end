<template>
  <v-navigation-drawer
    v-model="drawer"
    v-on:click="cont = !cont"
    bottom
    permanent
    expand-on-hover
    height="100%"
    class="pb-2"
  >
    <v-list shaped>
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
          <router-link :to="`/dashboard/${item.title}`">
            <v-list-item-content>
              <v-list-item-title id="side-nav-option">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { EventBus } from "@/event-bus";

export default {
  name: "SideNav",

  data: () => ({
    selectedItem: 0,
    drawer: true,

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
    selectFucntion(action) {
      if (action == "Notes") {
        EventBus.$emit("sideNavActionForNotes", action);
      } else if (action == "Trash") {
        EventBus.$emit("sideNavActionForTrash", action);
      } else if (action == "Archive") {
        EventBus.$emit("sideNavActionForArchive", action);
      }
    },
  },
};
</script>
 
<style lang = "scss" scoped>
.drawer {
  height: "100vh";
}
</style>