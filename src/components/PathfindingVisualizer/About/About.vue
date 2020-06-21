<template>
  <div class="title-wrapper">
    <div class="title">
      Pathfinding<br /><span class="title-span">Visualizer</span>
    </div>
    <div class="title-line"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class About extends Vue {}
</script>

<style>
.title-wrapper {
  width: 70vw;
  margin: auto;
  margin-bottom: 35px;
}
.title {
  color: #222534;
  font-size: 40px;
  line-height: 50px;
  font-weight: 700;
  text-align: left;
}
.title-span {
  font-weight: 300;
}
.title-line {
  width: 90px;
  height: 2px;
  margin-top: 20px;
  background-color: rgba(41, 73, 255, 0.75);
}
</style>
