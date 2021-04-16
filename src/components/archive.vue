<template>
  <v-flex>
    <v-layout class="noteCards" row wrap>
      <v-flex
        v-for="note in allArchivedNotes"
        v-bind:key="note._id"
        md3
        class="mr-5 mb-5"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            class="mx-auto singleCard card-container"
            outlined
            :class="{ 'on-hover': hover }"
          >
            <v-card-title>{{ note.title }} </v-card-title>
            <v-list-item>{{ note.description }}</v-list-item>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="unArchieve(note._id)"
                >
                  <v-icon>mdi mdi-exit-to-app mdi-rotate-270</v-icon>
                </v-btn>
              </template>
              <span>unArchive</span>
            </v-tooltip>
          </v-card>
        </v-hover>
      </v-flex>
      <SnackBar ref="snackbar" />
    </v-layout>
  </v-flex>
</template>

<script>
import userServices from "../services/user";
import SnackBar from "../components/snackBarNotify";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Archieved",

  data: () => ({
    allNotes: "",
    archievedNotes: [],
    result: "",
    dialog: false,
  }),
  components: {
    SnackBar,
  },

  created() {
    this.getAllNotes();
  },
  computed: {
    ...mapGetters(["allArchivedNotes"]),
  },
  methods: {
    ...mapActions(["getAllNotes"]),

    showSnackbarandRefresh() {
      this.$refs.snackbar._data.show = true;
      //mapActions(["allArchivedNotes"]);
      this.getAllNotes();
    },

    unArchieve(noteId) {
      console.log("unarcheved id", noteId);
      userServices
        .unArchieveNote(noteId)
        .then((response) => {
          if (response.data.status_code == 200) {
            this.$refs.snackbar._data.text = response.data.message;
            this.showSnackbarandRefresh();
          } else {
            this.$refs.snackbar._data.text = response.data.message;
            this.showSnackbarandRefresh();
          }
        })
        .catch((error) => {
          console.log("error:", error);
          this.$refs.snackbar._data.text = "internal server error";
          this.showSnackbarandRefresh();
        });
    },
  },

  /*   mounted() {
    this.displayAllNotes();
  },

  methods: {
    showSnackbarandRefresh() {
      this.$refs.snackbar._data.show = true;
      this.displayAllNotes();
    },

    displayAllNotes() {
      return userServices
        .fetchAllNotes()
        .then((result) => {
          this.result = result.data.data;
          console.log("data.data", this.result);
          this.allNotes = [...this.result].reverse();
          console.log(
            "extraction",
            this.allNotes.find((note) => note.isArchived === true)
          );
          this.archievedNotes = this.allNotes.filter(
            (note) => note.isArchived == true
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },*/
  /* 
    unArchieve(noteId) {
      console.log("unarcheved id", noteId);
      userServices
        .unArchieveNote(noteId)
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
  }, */
};
</script>