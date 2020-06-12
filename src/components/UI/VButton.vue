<template>
  <button
    @click="clicked"
    :class="{
      'btn-primary': primary,
      'btn-secondary': secondary,
      'btn-flat': flat,
    }"
    class="btn"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
@Component
export default class VButton extends Vue {
  @Prop({ required: false, type: Boolean, default: false })
  readonly primary!: boolean;
  @Prop({ required: false, type: Boolean, default: false })
  readonly secondary!: boolean;
  @Prop({ required: false, type: Boolean, default: false })
  readonly flat!: boolean;

  @Emit("clicked")
  public clicked(): void {
    console.log("clicked in VButton component");
  }
}
</script>

<style>
.btn {
  height: 36px;
  display: inline-block;
  font: 14px/36px "Roboto", sans-serif !important;
  padding: 0 16px;
  min-width: 120px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.btn.btn-primary {
  transition: 0.4s;
  background: rgba(41, 73, 255, 0.75);
  color: #fff;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(41, 73, 255, 0.75);
  margin: 10px;
}
.btn.btn-primary:hover {
  transition: 0.4s;
  background: rgba(41, 73, 255, 0.75);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.26);
  border: 1px solid rgba(41, 73, 255, 0.75);
}

.btn.btn-secondary {
  transition: 0.4s;
  background: #fff;
  color: rgba(41, 73, 255, 0.75);
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #fff;
  margin: 10px;
}
.btn.btn-secondary:hover {
  transition: 0.4s;
  background: #fff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.26);
  border: 1px solid #fff;
}

.btn.btn-flat {
  transition: 0.4s;
  background: #fff;
  color: rgba(41, 73, 255, 0.75);
  margin: 10px;
  border: 1px solid #fff;
}
.btn.btn-flat:hover {
  transition: 0.4s;
  background: rgba(41, 73, 255, 0.04);
  border: 1px solid #fff;
}
</style>
