<template>
<<<<<<< HEAD
  <v-container class="notesContainer">
=======
  <v-container fluid grid-list-md class="notesContainer">
>>>>>>> d8eeca13af86e8f9f748f79270c5f25d4522213d
    <v-layout row wrap>
      <v-flex>
        <v-card hover>
          <v-toolbar flat>
            <v-text-field class="title-field pt-8" flat solo
              >title
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
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <span>More</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn text v-on:click="update"> close </v-btn>
          </v-footer>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { EventBus } from "@/event-bus";
export default {
  data: () => ({
    active: false,
  }),

  methods: {
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