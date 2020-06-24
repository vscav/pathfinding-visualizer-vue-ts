<template>
  <div class="vue-select" @click="toggleDropdown">
    <span class="selected-option">
      {{ currentPlaceholder }}
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"
        ></path>
      </svg>
    </span>
    <transition name="slide">
      <div class="dropdown-options-container" v-show="showDropdown">
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

  mounted() {
    this.currentPlaceholder = this.options[0];
    this.selected = this.options[0];
  }

  public toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  @Emit("interface")
  public selectOption(option: string): void {
    this.selected = option;
    this.currentPlaceholder = option;
    this.$emit("interface", this.selected);
  }
}
</script>

<style>
.vue-select {
  position: relative;
  width: 180px;
  background-color: #fff;
  display: inline-block;
  margin: 10px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
  border: none;
  color: rgba(41, 73, 255, 0.75);
  font-size: 14px;
  transition: all 200ms linear;
}
.vue-select .selected-option {
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  transition: all 200ms linear;
  padding: 10px;
}
.vue-select .selected-option:hover {
  color: rgba(41, 73, 255, 0.4);
}
.vue-select .selected-option:hover svg {
  fill: rgba(41, 73, 255, 0.4);
}
.vue-select .selected-option svg {
  fill: rgba(41, 73, 255, 0.75);
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  transition: fill 300ms linear;
}
.vue-select .selected-option svg:hover {
  fill: rgba(41, 73, 255, 0.4);
}
.dropdown-options-container {
  overflow-y: scroll;
  height: auto;
  position: absolute;
  width: 100%;
  z-index: 1;
  background: inherit;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
}
.dropdown-options--cell {
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px;
}
.dropdown-options--cell:hover {
  background-color: rgba(41, 73, 255, 0.04);
  border: none;
}
.dropdown-options.selected .dropdown-options--cell {
  background-color: rgba(41, 73, 255, 0.04);
  border: none;
}
.slide-enter-active,
.slide-leave-active {
  transition: height 150ms ease;
}
.slide-enter,
.slide-leave-to {
  height: 0px;
}
</style>
