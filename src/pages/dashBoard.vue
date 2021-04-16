<template>
  <div>
    <div class="header">
      <Header />
    </div>
    <v-row fullscreen>
      <v-col cols="3">
        <div class="side-nav pt-1">
          <SideNav />
          <router-view></router-view>
        </div>
      </v-col>
      <v-col cols="9">
        <v-col offset-md="2" cols="7" v-if="showNoteCard">
          <Note />
        </v-col>
        <v-container
          fluid
          grid-list-md
          v-if="isActivate && sideNavAction == 'Notes'"
          class="notesContainer"
        >
          <v-layout row wrap>
            <v-flex
              xs12
              sm6
              md4
              v-for="item in allActiveNotes"
              v-bind:key="item._id"
            >
              <v-card
                class="mx-auto card-container pt-6 pb-8"
                style="padding-bottom: 1px"
              >
                <v-toolbar flat>
                  <v-text-field
                    class="mx-auto v-list pt-8"
                    flat
                    solo
                    readonly
                    @click.stop="item.active = true"
                    v-model="item.title"
                    v-on:click="openDialog(item.index)"
                  >
                  </v-text-field>
                </v-toolbar>
                <v-text-field
                  class="pl-4"
                  flat
                  solo
                  readonly
                  @click.stop="item.active = true"
                  v-model="item.description"
                  v-on:click="openDialog($event)"
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
                      <v-btn icon v-bind="attrs" v-on="on" class="mx-3">
                        <v-icon>mdi mdi-account-plus-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>collaborator</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" class="mx-3">
                        <v-icon>mdi mdi-cookie-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Colors</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="archiveNote(item._id)"
                        class="mx-3"
                      >
                        <v-icon>mdi mdi-exit-to-app mdi-rotate-90</v-icon>
                      </v-btn>
                    </template>
                    <span>Archive</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        v-on:click="options = !options"
                        class="mx-3"
                      >
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <span>More</span>
                  </v-tooltip>
                </v-footer>
                <v-card
                  ><v-list shaped v-if="options" dense class="pb-2">
                    <v-list-item-group v-model="selectedItem">
                      <v-list-item
                        v-for="option in items"
                        :key="option.title"
                        @click="selectFucntion(option.title, item._id)"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{
                            option.title
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list></v-card
                >
                <PopUp @click.stop="item.active = true" :data="item" />
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>

        <v-container grid-list-md v-if="isActivate && sideNavAction == 'Trash'">
          <Trash />
        </v-container>

        <v-container
          grid-list-md
          v-if="isActivate && sideNavAction == 'Archive'"
        >
          <Archive />
        </v-container>
      </v-col>
      <SnackBar ref="snackbar" />
    </v-row>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import SideNav from "../components/sideNav.vue";
import Note from "../components/note";
import { EventBus } from "@/event-bus";
import PopUp from "../components/dialogBox";
import Trash from "../components/trash.vue";
import Archive from "../components/archive.vue";
import userServices from "../services/user";
import SnackBar from "../components/snackBarNotify";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "dashBoard",

  data() {
    return {
      // noteData: [],
      isActivate: false,
      active: false,
      sideNavAction: "",
      showNoteCard: true,
      options: false,
      items: [{ title: "Delete Note" }],
    };
  },

  components: {
    Header,
    SideNav,
    Note,
    PopUp,
    Trash,
    Archive,
    SnackBar,
  },

  created() {
    this.getAllNotes();
  },
  computed: {
    ...mapGetters(["allActiveNotes"]),
  },

  methods: {
    ...mapActions(["getAllNotes"]),

    selectFucntion(action, id) {
      if (action == "Delete Note") {
        this.deleteNote(id);
      }
    },

    showSnackbarandRefresh() {
      this.$refs.snackbar._data.show = true;
      this.getAllNotes();
    },

    archiveNote(noteId) {
      console.log("ARCHIVE", noteId);
      userServices
        .archiveNoteData(noteId)
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

    deleteNote(noteId) {
      userServices
        .removeNote(noteId)
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

    /*  getAllNotes() {
      this.sending = true;
      console.log(" Users Notes: ");
      userServices
        .fetchAllNotes()
        .then((res) => {
          this.noteData = res.data.data.filter(
            (note) => note.isDeleted == false && note.isArchived == false
          );
          EventBus.$emit("allNotes", this.noteData.reverse());
        })
        .catch(() => {});
    },
 */
    allNotes() {
      (this.showNoteCard = true), (this.sideNavAction = "Notes");
      // this.noteData = notes;
      this.isActivate = true;
    },

    allTrashNotes() {
      this.showNoteCard = false;
      this.sideNavAction = "Trash";
      this.isActivate = true;
    },

    archiveNoteData() {
      this.showNoteCard = false;
      this.sideNavAction = "Archive";
      this.isActivate = true;
    },

    openDialog(index) {
      console.log("index", index);
      this.active = true;

      EventBus.$emit("displayDialogNote", this.active);
    },
  },

  mounted() {
    EventBus.$on("allNotes", this.allNotes);
    EventBus.$on("allTrashData", this.allTrashNotes);
    EventBus.$on("archiveData", this.archiveNoteData);
  },
};
</script>
<style scoped>
@import url("../scss/dashBoard.scss");
</style>