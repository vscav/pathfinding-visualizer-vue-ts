<template>
  <div id="app">
    <Topbar />
    <PathfindingVisualizer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PathfindingVisualizer from "./components/PathfindingVisualizer/PathfindingVisualizer.vue";
import Topbar from "./components/Topbar/Topbar.vue";

@Component({
  components: {
    PathfindingVisualizer,
    Topbar,
  },
})
export default class App extends Vue {}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 60px;
}
</style>
