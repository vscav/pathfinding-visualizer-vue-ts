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
    this.$emit("clear-path");
  }

  @Emit("clear-board")
  clearBoard() {
    this.$emit("clear-board");
  }

  @Emit("visualize")
  visualize() {
    this.$emit("visualize");
  }

  @Emit("update-algorithm")
  updateAlgorithm(name: string) {
    this.$emit("update-algorithm", name);
  }

  @Emit("update-speed")
  updateSpeed(type: string) {
    this.$emit("update-speed", type);
  }
}
</script>

<style>
.toolbar {
  margin-bottom: 25px;
}
</style>
