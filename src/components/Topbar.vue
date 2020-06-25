<template>
  <header>
    <img class="logo" src="../assets/application-logo.png" alt="logo" />
    <VButton :rounded="true"
      ><a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/vscav/pathfinding-visualizer-vue-ts"
        ><img
          class="github-logo"
          src="../assets/github-icon.svg"
          alt="github"/></a
    ></VButton>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import VButton from "@/components/UI/VButton.vue";

@Component({
  components: {
    VButton,
  },
})
export default class Topbar extends Vue {}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 10%;
  margin-bottom: 40px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);

  .logo {
    width: 40px;
    margin-right: auto;
  }

  .github-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
  }
}
</style>
