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
        <v-col offset-md="2" cols="7">
          <Note />
        </v-col>
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
              <v-card hover @click.stop="active = true">
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
                  readonly
                  v-model="item.description"
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
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <span>More</span>
                  </v-tooltip>
                </v-footer>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-dialog v-model="active" scrollable max-width="40%">
          <PopUp
        /></v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import SideNav from "../components/sideNav.vue";
import Note from "../components/note";
import { EventBus } from "@/event-bus";
import PopUp from "../components/responseCardDialogBox";

export default {
  name: "dashBoard",
  data() {
    return {
      noteData: [],
      isActivate: false,
      active: false,
      // name: "raju",
    };
  },
  components: {
    Header,
    SideNav,
    Note,
    PopUp,
  },

  methods: {
    allNotes(notes) {
      this.noteData = notes;
      this.isActivate = true;
      console.log("dasboard data", this.noteData);
    },
  },

  openDialog() {
    console.log("dialog dasboard");
    EventBus.$emit("displayDialogNote", this.active);
  },

  mounted() {
    EventBus.$on("allNotes", this.allNotes);
  },
};
</script>
<style scoped>
@import url("../scss/dashBoard.scss");
</style>