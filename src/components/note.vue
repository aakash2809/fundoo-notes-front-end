<template>
  <div>
    <div>
      <v-card
        class="my-3 note-card"
        id="noteCard"
        elevation="9"
        v-click-outside="collapseCard"
        @click="active = true"
      >
        <div v-if="active">
          <v-toolbar flat>
            <v-text-field
              class="note-title pt-5"
              name="note-title"
              flat
              solo
              label="Title"
              v-model="noteTitle"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-pin-outline</v-icon>
                </v-btn>
              </template>
              <span>pin</span>
            </v-tooltip>
          </v-toolbar>
          <v-text-field
            class="note pl-4"
            name="note-description"
            v-model="description"
            flat
            solo
            label="Take a Note..."
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
                  <v-icon>mdi mdi-image-outline</v-icon>
                </v-btn>
              </template>
              <span>Add image</span>
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
            <v-btn id="close-card" text v-on:click="takeNote"> close </v-btn>
          </v-footer>
        </div>
        <div v-if="!active">
          <v-toolbar flat>
            <v-text-field
              class="note-title pt-8"
              flat
              solo
              label="Take a Note..."
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi mdi-checkbox-marked-outline</v-icon>
                </v-btn>
              </template>
              <span>New list</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi mdi-brush</v-icon>
                </v-btn>
              </template>
              <span>New Note with drwaing</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi mdi-image-outline</v-icon>
                </v-btn>
              </template>
              <span>Add note with image</span>
            </v-tooltip>
          </v-toolbar>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import userServices from "../services/user";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Note",
  data: () => ({
    noteTitle: "",
    description: "",

    active: false,
  }),

  created() {
    this.getAllNotes();
  },

  computed: {
    ...mapGetters(["allActiveNotes"]),
  },

  methods: {
    ...mapActions(["getAllNotes"]),

    collapseCard() {
      this.active = false;
    },

    //clear input data
    clearNote() {
      this.noteTitle = "";
      this.description = "";
    },

    //expand card
    expandCard() {
      this.active = true;
    },

    //add note
    takeNote() {
      this.active = false;
      this.sending = true;
      let data = {
        title: this.noteTitle,
        description: this.description,
      };

      console.log("add Note data: ", data);

      userServices
        .addNote(data)
        .then((res) => {
          if (res.data.success) {
            console.log("if-response", res);
            this.clearNote();
            this.collapseCard();
            this.getAllNotes();
          } else {
            console.log("else-response", res);
            this.collapseCard();
          }
        })
        .catch((error) => {
          console.log(error);
          this.collapseCard();
        });
    },
  },
};
</script>
