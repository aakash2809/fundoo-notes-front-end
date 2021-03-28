<template>
  <v-container class="notesContainer">
    <v-layout row wrap>
      <v-flex>
        <v-card hover>
          <v-toolbar flat>
            <v-text-field class="title-field pt-8" flat solo
              >{{ dialogResponse }}
            </v-text-field>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-pin-outline</v-icon>
                </v-btn>
              </template>
              <span>pin note</span>
            </v-tooltip>
          </v-toolbar>
          <v-text-field class="note-field pl-4" flat solo
            >took note</v-text-field
          >
          <v-footer flat color="white">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-bell-plus-outline</v-icon>
                </v-btn>
              </template>
              <span>Remind me</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi mdi-account-plus-outline</v-icon>
                </v-btn>
              </template>
              <span>collaborator</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi mdi-cookie-outline</v-icon>
                </v-btn>
              </template>
              <span>Colors</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi mdi-exit-to-app mdi-rotate-90</v-icon>
                </v-btn>
              </template>
              <span>Archive</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  v-on:click="options = !options"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <span>More</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn text v-on:click="showCard = false"> close </v-btn>
          </v-footer>
        </v-card>
        <v-card
          ><v-list shaped v-if="options" dense>
            <v-list-item-group v-model="selectedItem">
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                @click="selectFucntion(item.title)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list></v-card
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { EventBus } from "@/event-bus";
export default {
  data: () => ({
    active: false,
    selectedItem: 0,
    showCard: true,
    options: false,
    //title: "aakash",
    items: [{ title: "UpDate Note" }, { title: "Delete Note" }],
  }),
  props: ["dialogResponse"],
  methods: {
    selectFucntion(action) {
      console.log("action", action);
      if (action == "Delete Note") {
        EventBus.$emit("deleteNote", action);
      }
      if (action == "UpDate Note") {
        console.log("if update action", action);
        EventBus.$emit("updateNote", action);
      }
    },

    displayDialogNote(action) {
      console.log("display method called in dialog component");
      this.active = action;
    },
  },

  mounted() {
    EventBus.$on("displayDialogNote", this.displayDialogNote);
  },
};
</script>