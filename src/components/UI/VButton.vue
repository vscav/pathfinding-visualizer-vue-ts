<template>
  <button
    @click="clicked"
    :class="{
      'btn-primary': primary,
      'btn-secondary': secondary,
      'btn-flat': flat,
      'btn-rounded': rounded,
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
  @Prop({ required: false, type: Boolean, default: false })
  readonly rounded!: boolean;

  @Emit("clicked")
  public clicked(): void {
    console.log("click in button component");
  }
}
</script>

<style lang="scss" scoped>
.btn {
  height: 36px;
  border-radius: 4px;
  display: inline-block;
  font-size: 14px;
  padding: 0 16px;
  width: 120px;
  text-align: center;
  position: relative;
  cursor: pointer;

  &.btn-primary {
    transition: 0.4s;
    background: rgba(41, 73, 255, 0.75);
    color: #fff;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(41, 73, 255, 0.75);
    margin: 10px;

    &:hover {
      transition: 0.4s;
      background: rgba(57, 86, 252, 0.75);
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.26);
      border: 1px solid rgba(57, 86, 252, 0.75);
    }
  }

  &.btn-secondary {
    transition: 0.4s;
    background: #fff;
    color: rgba(41, 73, 255, 0.75);
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid #fff;
    margin: 10px;

    &:hover {
      transition: 0.4s;
      background: #fff;
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.26);
      border: 1px solid #fff;
    }
  }

  &.btn-flat {
    transition: 0.4s;
    background: #fff;
    color: rgba(41, 73, 255, 0.75);
    margin: 10px;
    border: 1px solid #fff;

    &:hover {
      transition: 0.4s;
      background: rgba(41, 73, 255, 0.04);
      border: 1px solid #fff;
    }
  }

  &.btn-rounded {
    width: 40px;
    height: 40px;
    position: relative;
    transition: 0.4s;
    background: #fff;
    color: rgba(41, 73, 255, 0.75);
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid #fff;
    border-radius: 50%;
    margin: 10px;
    padding: 0;

    &:hover {
      transition: 0.4s;
      background: #fff;
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.26);
      border: 1px solid #fff;
    }
  }
}
</style>
