<template>
  <div>
    <div class="header">
      <Header />
    </div>
    <v-row fullscreen>
      <v-col cols="3">
        <div class="side-nav pt-1">
          <SideNav />
        </div>
      </v-col>
      <v-col cols="9">
        <v-col offset-md="2" cols="7"> <Note /> </v-col>
        <v-container
          fluid
          grid-list-md
          v-if="isActivate"
          class="notesContainer"
        >
          <v-layout row wrap>
            <v-flex
              d-flex
              xs12
              sm6
              md4
              v-for="item in noteData"
              :key="item"
              link
            >
              <v-card>
                <v-toolbar flat>
                  <v-text-field
                    class="title-field pt-8"
                    flat
                    solo
                    readonly
                    v-model="item.title"
                  >
                  </v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-pin-outline</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-text-field
                  class="note-field pl-4"
                  flat
                  solo
                  readonly
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
            </v-flex>
          </v-layout>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import SideNav from "../components/sideNav.vue";
import Note from "../components/note";
import { EventBus } from "@/event-bus";

export default {
  name: "dashBoard",
  data: () => ({
    noteData: [],
    isActivate: false,
  }),
  components: {
    Header,
    SideNav,
    Note,
  },

  methods: {
    onClickOutSide() {
      console.log("df");
    },

    allNotes(notes) {
      this.noteData = notes;
      this.isActivate = true;
      console.log("dasboard data", this.noteData);
    },
  },

  mounted() {
    EventBus.$on("all", this.allNotes);
  },
};
</script>
<style scoped>
.side-nav {
  height: 600px;
}
.notesContainer {
  overflow-y: auto;
  max-height: 400px;
}
</style>