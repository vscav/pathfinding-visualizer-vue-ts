<template>
  <div id="app">
    <VButton @clicked="receiveClick" :primary="true">Click me</VButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VButton from "./components/UI/VButton.vue";

@Component({
  components: {
    VButton,
  },
})
export default class App extends Vue {
  public receiveClick(): void {
    console.log("click received in Parent");
  }
}
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
