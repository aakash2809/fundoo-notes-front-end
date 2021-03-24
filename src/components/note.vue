<template >
  <v-card
    class="mx-auto my-8 note-card window"
    elevation="9"
    v-click-outside="onClickOutside"
    v-on:click="active = true"
  >
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
</template>

<script>
import userServices from "../services/user";
export default {
  name: "Note",
  data: () => ({
    noteTitle: "",
    description: "",
    noteData: [],
    active: true,
  }),

  methods: {
    //onclickOUtside
    onClickOutside() {
      this.active = false;
    },

    clearNote() {
      this.noteTitle = "";
      this.description = "";
    },

    //add note
    takeNote() {
      this.onClickOutside();
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

    //get All Notes
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
};
</script>


<style lang="scss" scoped>
</style>