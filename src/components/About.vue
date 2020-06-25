<template>
  <div class="introduction">
    <div class="title-wrapper">
      <div class="title-text">
        Pathfinding<br /><span class="title-span">Visualizer</span>
      </div>
      <div class="title-line"></div>
    </div>
    <div class="description-wrapper">
      <div class="description-text">
        This application offers you an intuitive interface and options<br />
        to quickly visualize some pathfinding algorithms.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class About extends Vue {}
</script>

<style lang="scss" scoped>
.introduction {
  display: flex;
  width: 60vw;
  margin: auto;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 35px;

  .title-wrapper {
    .title-text {
      color: #222534;
      font-size: 40px;
      line-height: 50px;
      font-weight: 700;
      text-align: left;

      .title-span {
        font-weight: 300;
      }
    }

    .title-line {
      width: 90px;
      height: 3px;
      margin-top: 20px;
      border-radius: 4px;
      background-color: rgba(41, 73, 255, 0.75);
    }
  }

  .description-wrapper {
    padding: 25px;

    .description-text {
      line-height: 30px;
    }
  }
}

@media (max-width: 768px) {
  .introduction {
    width: 75vw;
  }
}
</style>
