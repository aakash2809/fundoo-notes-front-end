<template>
  <div id="app">
    <router-view />
    <!-- <register />
    <login /> -->
  </div>
</template>

<script>
/* import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
} */

/* import register from "./pages/register";
import login from "./pages/register"; */
export default {
  name: "App",
  components: {},
};
</script>

<style lang ="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
