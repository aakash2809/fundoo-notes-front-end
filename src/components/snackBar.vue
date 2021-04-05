<template>
  <div name="snackbar">
    <v-snackbar v-model="show" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="show = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      text: "",
      timeout: 0,
    };
  },
  methods: {
    reset() {
      return {
        show: false,
        text: "",
        timeout: 0,
      };
    },
  },
  /* mounted() {
    this.$store.subscribe((mutation, state) => {
      this.text = state.snackBar.text;
        this.timeout = state.snackBar.timeout;
        this.show = true;
        this.reset();
    });
  }, */
};
</script>
