<template>
  <v-flex>
    <v-layout class="noteCards" row wrap>
      <v-flex
        v-for="note in allTrashNotes"
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
import SnackBar from "../components/snackBarNotify";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Trash",

  components: {
    SnackBar,
  },

  data: () => ({
    trash: true,
    dialog: false,
  }),

  created() {
    this.getAllNotes();
  },

  computed: {
    ...mapGetters(["allTrashNotes"]),
  },

  mounted() {
    this.displayAllNotes();
  },

  methods: {
    ...mapActions(["getAllNotes"]),

    showSnackbarandRefresh() {
      this.$refs.snackbar._data.show = true;
      this.getAllNotes();
    },

    restoreNote(noteId) {
      note
        .restoreNote(noteId)
        .then((response) => {
          if (response.data.status_code == 200) {
            this.$refs.snackbar._data.text = response.data.message;
            this.showSnackbarandRefresh();
          } else {
            this.$refs.snackbar._data.text = response.data.message;
            this.showSnackbarandRefresh();
          }
        })
        .catch(() => {
          this.$refs.snackbar._data.text = "internal server error";
          this.showSnackbarandRefresh();
        });
    },

    deleteForever(noteId) {
      console.log("deleteNoteId: ", noteId);
      note
        .deleteNoteForever(noteId)
        .then((response) => {
          if (response.data.status_code == 200) {
            this.$refs.snackbar._data.text = response.data.message;
            this.showSnackbarandRefresh();
          } else {
            this.$refs.snackbar._data.text = response.data.message;
            this.showSnackbarandRefresh();
          }
        })
        .catch(() => {
          this.$refs.snackbar._data.text = "internal server error";
          this.showSnackbarandRefresh();
        });
    },
  },
};
</script>
