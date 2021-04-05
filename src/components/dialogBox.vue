<template>
  <v-container class="notesContainer">
    <v-layout row wrap>
      <v-dialog
        v-model="active"
        persistent
        scrollable
        max-width="400"
        min-height="200"
      >
        <v-flex>
          <v-card hover>
            <v-toolbar flat>
              <v-text-field
                solo
                label="id"
                v-model="editOptions._id"
                v-show="true"
              ></v-text-field>
              <v-text-field
                class="title-field pt-8"
                flat
                solo
                v-model="editOptions.title"
              >
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
            <v-text-field
              class="note-field pl-4"
              flat
              solo
              v-model="editOptions.description"
            ></v-text-field>
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
              <v-btn text v-on:click="close()"> close </v-btn>
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
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import { EventBus } from "@/event-bus";
import userServices from "../services/user";

export default {
  props: {
    data: Object,
  },

  data() {
    return {
      active: false,
      selectedItem: 0,
      options: false,
      items: [{ title: "UpDate Note" }, { title: "Delete Note" }],
      editOptions: [],
    };
  },

  methods: {
    selectFucntion(action) {
      //  let input = { action: action, id: id };
      console.log();
      if (action == "Delete Note") {
        this.deleteNote();
        // EventBus.$emit("deleteNote", action);
      }
      if (action == "UpDate Note") {
        //EventBus.$emit("updateNote", action);
        console.log("action:", action);
        this.updateNote();
      }
    },

    close() {
      this.active = false;
    },

    displayDialogNote(action) {
      this.active = action;
    },

    deleteNote() {
      let noteId = this.editOptions._id;
      console.log("delete Note:");
      userServices
        .removeNote(noteId)
        .then((res) => {
          console.log("response1 : ", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateNote() {
      console.log("inside update Note:");
      let noteId = this.editOptions._id;
      let data = {
        title: this.noteTitle,
        description: this.description,
      };
      console.log("update called");
      userServices
        .editNoteData(noteId, data)
        .then((res) => {
          console.log("data to update : ", noteId);
          console.log("response1 : ", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    EventBus.$on("displayDialogNote", this.displayDialogNote);
    this.editOptions = this.data;
    console.log("data from dashboard", this.editOptions);
  },
};
</script>