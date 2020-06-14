<template>
  <header>
    <img class="logo" src="../../assets/logo.png" alt="logo" />
    <VButton :secondary="true">Lien</VButton>
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
  margin-bottom: 25px;
}

.logo {
  cursor: pointer;
  width: 30px;
  margin-right: auto;
}
</style>
