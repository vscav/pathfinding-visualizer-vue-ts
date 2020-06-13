<template>
  <div id="app">
    <PathfindingVisualizer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PathfindingVisualizer from "./components/PathfindingVisualizer/PathfindingVisualizer.vue";
import VButton from "./components/UI/VButton.vue";

@Component({
  components: {
    PathfindingVisualizer,
    VButton,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
