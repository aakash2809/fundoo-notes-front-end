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
                      <article class="text-md-left text-lg-left">
                        <v-icon @click="restoreNote(note._id)"
                          >mdi mdi-delete-restore</v-icon
                        >
                      </article>
                    </v-btn>
                  </template>
                  <span>Restore</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <article class="text-md-left text-lg-left">
                        <v-icon @click="deleteForever(note._id)"
                          >mdi mdi-delete-forever</v-icon
                        >
                      </article>
                    </v-btn>
                  </template>
                  <span>Delete Forever</span>
                </v-tooltip>
              </v-row>
            </v-list-item>
          </v-card>
        </v-hover>
      </v-flex>
      <SnackBar ref="snackbar" />
    </v-layout>
  </v-flex>
</template>

<script>
import note from "../services/user";
import SnackBar from "../services/user";
export default {
  name: "Trash",
  components: {
    SnackBar,
  },
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
      note
        .restoreNote(noteId)
        .then((data) => {
          console.log("response", data);
          if (data.data.status_code == 200) {
            console.log("data sharing", this.$refs);
            //console.log(this.snackbarData);
            this.displayAllNotes();
          }
        })
        .catch(() => {});
    },

    deleteForever(noteId) {
      console.log("deleteNoteId: ", noteId);
      note
        .deleteNoteForever(noteId)
        .then((response) => {
          console.log("response", response);
          this.displayAllNotes();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>