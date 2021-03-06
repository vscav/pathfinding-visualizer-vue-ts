<template>
  <div class="vue-select" @click="toggleDropdown">
    <span
      @click="activeDrop"
      class="selected-option"
      :class="{ active: active }"
    >
      {{ currentPlaceholder }}
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M11.404,16.407l-6.826,-6.826c-0.329,-0.329 -0.329,-0.863 0,-1.192l0.796,-0.796c0.329,-0.329 0.861,-0.329 1.191,-0.002l5.435,5.41l5.435,-5.41c0.33,-0.327 0.862,-0.327 1.191,0.002l0.796,0.796c0.329,0.329 0.329,0.863 0,1.192l-6.826,6.826c-0.329,0.329 -0.863,0.329 -1.192,0Z"
        />
      </svg>
    </span>
    <transition name="slide">
      <div
        class="dropdown-options-container"
        v-show="showDropdown"
        :style="{ height: 38 * numberOfOptions + 'px' }"
      >
        <div
          class="dropdown-options"
          v-for="option in options"
          :class="{ selected: option === selected }"
          :key="option"
        >
          <div class="dropdown-options--cell" @click="selectOption(option)">
            <span class="option-text">{{ option }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Emit, Prop, Vue, Component } from "vue-property-decorator";

@Component
export default class VDropdown extends Vue {
  @Prop({ required: true, type: String, default: "Item type" })
  readonly type!: string;
  @Prop({ required: true, type: Array, default: [] })
  readonly options!: Array<string>;
  @Prop({ required: false, type: String, default: "Select from the dropdown" })
  readonly placeholder!: string;

  private currentPlaceholder: string = this.placeholder;
  private selected = "Select an option";
  private showDropdown = false;
  private active = false;

  mounted() {
    this.currentPlaceholder = this.options[0];
    this.selected = this.options[0];
  }

  get numberOfOptions(): number {
    return this.options.length;
  }

  public toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  public activeDrop(): void {
    this.active = !this.active;
  }

  @Emit("interface")
  public selectOption(option: string): void {
    this.selected = option;
    this.currentPlaceholder = option;
    this.$emit("interface", this.selected);
  }
}
</script>

<style lang="scss" scoped>
.vue-select {
  position: relative;
  width: 180px;
  background-color: #fff;
  display: inline-block;
  margin: 10px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  color: rgba(41, 73, 255, 0.75);
  font-size: 14px;
  transition: all 200ms linear;

  .selected-option {
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    transition: all 200ms linear;
    padding: 10px;

    &:hover {
      color: rgba(41, 73, 255, 0.4);
    }

    &:hover svg {
      fill: rgba(41, 73, 255, 0.4);
    }

    svg {
      fill: rgba(41, 73, 255, 0.75);
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      transition: fill 300ms linear, transform 300ms ease;
    }

    &.active svg {
      transform: translateY(-50%) rotateX(0.5turn);
    }
  }

  .dropdown-options-container {
    overflow-y: scroll;
    position: absolute;
    width: 100%;
    height: 150px;
    z-index: 1;
    background: inherit;
    box-shadow: 0 9px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    margin-top: 2px;

    .dropdown-options--cell {
      user-select: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 10px;

      &:hover {
        background-color: rgba(41, 73, 255, 0.04);
        border: none;
      }
    }

    .dropdown-options {
      &.selected .dropdown-options--cell {
        background-color: rgba(41, 73, 255, 0.04);
        border: none;
      }
    }
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: height 150ms ease;
  }

  .slide-enter,
  .slide-leave-to {
    height: 0px;
  }
}
</style>
