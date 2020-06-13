<template>
  <div class="toolbar">
    <VDropdown
      :type="'algorithm'"
      :placeholder="'Pathfinding algorithm'"
      :options="algorithms"
      @interface="updateAlgorithm"
    />
    <VDropdown
      :type="'speed'"
      :placeholder="'Visualization speed'"
      :options="speeds"
      @interface="updateSpeed"
    />
    <VButton @clicked="clearPath" :flat="true">
      Clear Path
    </VButton>
    <VButton @clicked="clearBoard" :flat="true">
      Clear Board
    </VButton>
    <VButton @clicked="visualize" :primary="true">
      Visualize
    </VButton>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";

import VButton from "../../UI/VButton.vue";
import VDropdown from "../../UI/VDropdown.vue";

@Component({
  components: {
    VButton,
    VDropdown,
  },
})
export default class Toolbar extends Vue {
  private speeds: Array<string> = ["Fast", "Average", "Slow"];
  private algorithms: Array<string> = ["Dijkstra", "A*"];

  @Emit("clear-path")
  clearPath() {
    console.log("clearPath called (Toolbar component)");
    //this.$emit("clear-path");
  }

  @Emit("clear-board")
  clearBoard() {
    console.log("clearBoard called (Toolbar component)");
    //this.$emit("clear-board");
  }

  @Emit("visualize")
  visualize() {
    console.log("Visualize called (Toolbar component)");
    //this.$emit("visualize");
  }

  @Emit("update-algorithm")
  updateAlgorithm(name: string) {
    console.log("updateAlgorithm called (Toolbar component)");
    //this.$emit("update-algorithm", name);
  }

  @Emit("update-speed")
  updateSpeed(type: string) {
    console.log("updateSpeed called (Toolbar component)");
    //this.$emit("update-speed", type);
  }
}
</script>

<style>
.toolbar {
  margin-bottom: 25px;
}
</style>
