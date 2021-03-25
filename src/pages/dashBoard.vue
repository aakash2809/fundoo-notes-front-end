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
        <v-col offset-md="2" cols="6"> <Note /> </v-col>
        <v-row cols="9">
          <v-layout row wrap>
            <v-flex class="mr-5, mb-3">
              <div v-if="isActivate">
                <div v-for="item in noteData" :key="item" link>
                  <v-card
                    class="mx-auto my-8 note-card window"
                    elevation="8"
                    cols="4"
                  >
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
  height: 650px;
}
</style>