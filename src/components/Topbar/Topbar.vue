<template>
  <header>
    <img class="logo" src="../../assets/application-logo.png" alt="logo" />
    <VButton :rounded="true"
      ><a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/vscav/pathfinding-visualizer-vue-ts"
        ><img
          class="github-logo"
          src="../../assets/github-icon.svg"
          alt="github"/></a
    ></VButton>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import VButton from "../UI/VButton.vue";

@Component({
  components: {
    VButton,
  },
})
export default class Topbar extends Vue {}
</script>

<style>
header {
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 10%;
  margin-bottom: 40px;
}

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
</style>
