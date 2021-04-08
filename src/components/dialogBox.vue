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
                v-show="false"
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
              <v-btn text v-on:click="updateNote()"> close </v-btn>
            </v-footer>
          </v-card>
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
      editOptions: [],
    };
  },

  methods: {
    close() {
      this.active = false;
    },

    displayDialogNote(action) {
      this.active = action;
    },

    getAllNotes() {
      this.sending = true;
      userServices
        .fetchAllNotes()
        .then((res) => {
          this.noteData = res.data.data.filter(
            (note) => note.isDeleted == false && note.isArchived == false
          );
          EventBus.$emit("allNotes", this.noteData.reverse());
        })
        .catch(() => {});
    },

    updateNote() {
      let noteId = this.editOptions._id;
      let data = {
        title: this.editOptions.title,
        description: this.editOptions.description,
      };
      userServices
        .editNoteData(noteId, data)
        .then(() => {
          this.getAllNotes();
          this.close();
        })
        .catch(() => {
          this.close();
        });
    },
  },

  mounted() {
    EventBus.$on("displayDialogNote", this.displayDialogNote);
    this.editOptions = this.data;
  },
};
</script>