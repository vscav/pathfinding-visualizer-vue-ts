<template>
  <div class="legend">
    <ul>
      <li>
        <div class="node-start"></div>
        Start node
      </li>
      <li>
        <div class="node-finish"></div>
        Target node
      </li>
      <li>
        <div class="node-visited"></div>
        Visited node
      </li>
      <li>
        <div class="node"></div>
        Unvisited node
      </li>
      <li>
        <div class="node-shortest-path"></div>
        Shortest-path node
      </li>
      <li>
        <div class="node-wall"></div>
        Wall node
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class Legend extends Vue {}
</script>

<style>
.legend {
  margin-bottom: 25px;
}
ul {
  margin-bottom: 15px;
  padding-inline-start: 0;
}
ul > li {
  display: inline-block;
  list-style: none;
  padding: 0 28px 0 0;
}
ul > li > div {
  width: 25px;
  height: 25px;
  display: inline-block;
  position: relative;
  top: 7.5px;
  margin: 0 5px;
}
</style>
