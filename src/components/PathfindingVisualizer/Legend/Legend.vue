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
.legend ul {
  margin-bottom: 15px;
  padding-inline-start: 0;
}
.legend ul > li {
  display: inline-block;
  list-style: none;
  padding: 0 28px 0 0;
}
.legend ul > li > div {
  width: 25px;
  height: 25px;
  display: inline-block;
  position: relative;
  top: 7.5px;
  margin: 0 5px;
}

.legend .node {
  width: 25px;
  height: 25px;
  outline: 1px solid rgba(41, 73, 255, 0.1);
  animation-name: classicAnimation;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

.legend .node-finish {
  background-image: url(../../../assets/target.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  animation-name: classicAnimation;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  outline: none;
}

.legend .node-start {
  background-image: url(../../../assets/chevron.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  animation-name: classicAnimation;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  outline: none;
}

.legend .node-visited {
  animation-name: visitedAnimation;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  outline: none;
}

.legend .node-wall {
  animation-name: wallAnimation;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  outline: none;
}

.node-shortest-path {
  animation-name: shortestPath;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  outline: none;
}

@keyframes classicAnimation {
  0% {
    transform: scale(0.3);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes wallAnimation {
  0% {
    transform: scale(0.3);
    background-color: rgb(12, 53, 71);
  }

  50% {
    transform: scale(1.2);
    background-color: rgb(12, 53, 71);
  }

  100% {
    transform: scale(1);
    background-color: rgb(12, 53, 71);
  }
}
</style>
