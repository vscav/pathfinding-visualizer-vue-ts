<template>
  <div id="app">
    <Topbar />
    <PathfindingVisualizer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PathfindingVisualizer from "@/components/PathfindingVisualizer.vue";
import Topbar from "@/components/Topbar.vue";

@Component({
  components: {
    PathfindingVisualizer,
    Topbar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 60px;
}
</style>
