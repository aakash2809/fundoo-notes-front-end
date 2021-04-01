<template>
  <v-flex>
    <v-layout class="noteCards" row wrap>
      <v-flex
        v-for="note in trashNotes"
        v-bind:key="note._id"
        md3
        class="mr-5 mb-10"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            class="mx-auto v-list"
            outlined
            :class="{ 'on-hover': hover }"
          >
            <v-card-title class="v-list pl-10">{{ note.title }} </v-card-title>
            <v-list-item class="v-list pl-11">{{
              note.description
            }}</v-list-item>

            <v-list-item>
              <v-row v-show="hover == true">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <article class="text-md-left text-lg-left pl-10">
                        <v-icon @click="restoreNote(note._id)"
                          >mdi-restore</v-icon
                        >
                      </article>
                    </v-btn>
                  </template>
                  <span>Restore</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <article class="text-md-left text-lg-left pl-8">
                        <v-icon @click="note.dialog = true"
                          >mdi-delete-outline</v-icon
                        >
                      </article>
                    </v-btn>
                  </template>
                  <span>Delete Forever</span>
                </v-tooltip>
              </v-row>
            </v-list-item>
            <v-list-item></v-list-item>
          </v-card>
        </v-hover>
      </v-flex>
      <snackbar ref="snackbar" />
    </v-layout>
  </v-flex>
</template>

<script>
import note from "../services/user";

export default {
  name: "Trash",
  components: {},
  data: () => ({
    trashNotes: [],
    allNotesForTrash: "",
    trash: true,
    dialog: false,
  }),

  mounted() {
    this.displayAllNotes();
  },

  methods: {
    displayAllNotes() {
      console.log("inside trash display");
      note
        .fetchAllNotes()
        .then((result) => {
          console.log("result", result);
          this.result = result.data.data;
          this.allNotes = [...this.result].reverse();
          this.trashNotes = this.allNotes.filter(
            (note) => note.isDeleted == true
          );
          console.log("trashresult", this.trashNotes);
        })
        .catch(() => {});
    },

    restoreNote(noteId) {
      const noteInput = {
        isDeleted: false,
      };
      note
        .restoreNote(noteId, noteInput)
        .then((data) => {
          if (data.data.status_code.status_code == 200) {
            console.log(data.data);
            const snackbarData = {
              text: "Note moved to trash",
              timeout: 2500,
            };
            this.displayAllNotes();
            console.log(this.snackbarData);
            this.$refs.snackbar.activateSnackbar(snackbarData);

            this.displayAllNotes();
          }
        })
        .catch();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>