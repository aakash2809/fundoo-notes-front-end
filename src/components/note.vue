<template>
  <div>
    <div>
      <v-card class="mx-auto my-8 note-card window" elevation="9">
        <div v-if="active">
          <v-toolbar flat>
            <v-text-field
              class="note-title pt-5"
              flat
              solo
              label="Title"
              v-model="noteTitle"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-pin-outline</v-icon>
            </v-btn>
          </v-toolbar>
          <v-text-field
            class="note pl-4"
            v-model="description"
            flat
            solo
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
            <v-spacer></v-spacer>
            <v-btn text v-on:click="takeNote"> close </v-btn>
          </v-footer>
        </div>
        <div v-if="!active">
          <v-toolbar flat>
            <v-text-field
              class="note-title pt-8"
              flat
              solo
              label="Take a Note..."
              v-model="noteTitle"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi mdi-checkbox-marked-outline</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi mdi-brush</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-image-outline</v-icon>
            </v-btn>
          </v-toolbar>
        </div>
      </v-card>
    </div>
    <v-row>
      <v-layout row wrap>
        <v-flex class="mr-5, mb-3">
          <div v-if="isActivate">
            <div v-for="item in noteData" :key="item" link>
              <v-card class="mx-auto my-8 note-card window" elevation="8">
                <v-toolbar flat>
                  <v-text-field
                    justify="center"
                    class="title-field pt-5"
                    flat
                    solo
                    v-model="item.title"
                  >
                  </v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-pin-outline</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-text-field
                  flat
                  solo
                  rounded
                  v-model="item.description"
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
                  <v-spacer></v-spacer>
                </v-footer>
              </v-card>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-row>
  </div>
</template>

<script>
import userServices from "../services/user";
import { EventBus } from "@/event-bus";
export default {
  name: "Note",
  data: () => ({
    noteTitle: "",
    description: "",
    noteData: [],
    active: true,
    isActivate: false,
  }),

  methods: {
    //collapseCard
    collapseCard() {
      this.active = false;
    },

    clearNote() {
      this.noteTitle = "";
      this.description = "";
    },

    expandCard() {
      this.active = true;
    },
    //add note
    takeNote() {
      this.active = false;
      this.clearNote();
      this.sending = true;
      let data = {
        title: this.noteTitle,
        description: this.description,
      };
      console.log("add Note data: ", data);
      userServices
        .addNote(data)
        .then((res) => {
          //this.getAllNotes();
          if (res.data.success) {
            console.log("if-response", res);
            this.clearNote();
          } else {
            console.log("else-response", res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAllNotes() {
      this.sending = true;
      console.log(" Users Notes: ");
      userServices
        .fetchAllNotes()
        .then((res) => {
          this.isActivate = true;
          this.noteData = res.data.data;
          console.log("response : ", res.data.data);
          console.log("nodeData : ", this.noteData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    EventBus.$on("clicked", this.getAllNotes);
  },
};
</script>

<style lang="scss" scoped>
</style>