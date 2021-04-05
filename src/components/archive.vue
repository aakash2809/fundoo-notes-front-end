<template>
  <v-flex>
    <v-layout class="noteCards" row wrap>
      <v-flex
        v-for="note in archievedNotes"
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
            <article class="text-md-right text-lg-right pt-5 pr-4">
              <v-icon v-bind="attrs" v-on="on" v-show="hover"
                >mdi-pin-outline</v-icon
              >
            </article>
            <v-card-title>{{ note.title }} </v-card-title>
            <v-list-item>{{ note.description }}</v-list-item>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-download-outline mdi-rotate-180"</v-icon>
                </v-btn>
              </template>
              <span>unArchive</span>
            </v-tooltip>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import userServices from "../services/user";

export default {
  name: "Archieved",

  data: () => ({
    allNotes: "",
    archievedNotes: [],
    result: "",
    dialog: false,
  }),

  mounted() {
    this.displayAllNotes();
  },

  methods: {
    displayAllNotes() {
      return userServices
        .fetchAllNotes()
        .then((result) => {
          this.result = result.data.data;
          console.log("data.data", this.result);
          this.allNotes = [...this.result].reverse();
          console.log(
            "extration",
            this.allNotes.find((note) => note.isArchived === true)
          );
          this.archievedNotes = this.allNotes.filter(
            (note) => note.isArchived == true
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>