<template>
  <div class="legend">
    <div class="legend-item">
      <div class="node node-start"></div>
      <div>Start node</div>
    </div>
    <div class="legend-item">
      <div class="node node-finish"></div>
      <div>Target node</div>
    </div>
    <div class="legend-item">
      <div class="node node-visited"></div>
      <div>Visited node</div>
    </div>
    <div class="legend-item">
      <div class="node node"></div>
      <div>Unvisited node</div>
    </div>
    <div class="legend-item">
      <div class="node node-shortest-path"></div>
      <div>Shortest-path node</div>
    </div>
    <div class="legend-item">
      <div class="node node-wall"></div>
      <div>Wall node</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Legend extends Vue {}
</script>

<style lang="scss" scoped>
.legend {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  max-width: 1000px;
  margin: auto;
  margin-bottom: 25px;
  padding: 10px 0 10px 0;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);

  .legend-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    padding-inline-start: 0;

    div:last-child {
      margin-left: 8px;
      font-size: 14px;
    }
  }

  .node {
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

    &.node-finish {
      background-image: url(../assets/target.svg);
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

    &.node-start {
      background-image: url(../assets/chevron.svg);
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

    &.node-visited {
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

    &.node-wall {
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

    &.node-shortest-path {
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

    @keyframes visitedAnimation {
      0% {
        transform: scale(0.3);
        background-color: rgba(8, 14, 51, 0.75);
      }

      50% {
        transform: scale(1.2);
        background-color: rgba(17, 30, 108, 0.75);
      }

      100% {
        transform: scale(1);
        background-color: rgba(41, 73, 255, 0.75);
      }
    }

    @keyframes shortestPath {
      0% {
        transform: scale(0.3);
        background-color: rgb(255, 242, 28);
      }

      50% {
        transform: scale(1.2);
      }

      100% {
        transform: scale(1);
        background-color: rgb(255, 221, 37);
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
  }
}

@media (max-width: 1080px) {
  .legend {
    margin: 0 20px 25px 20px;
    padding: 15px;
    .legend-item {
      div:first-child {
        margin-left: 8px;
      }
    }
  }
}
</style>
