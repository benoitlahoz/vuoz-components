<template lang='pug'>
button.vuoz-checkbox(
  :class="getClasses('main')",
  :key="size",
  @mouseenter="onMouseEnter",
  @mouseleave="onMouseLeave",
  @mousedown="onMouseDown",
  @mouseup="onMouseUp"
)
  .vuoz-checkbox__content.is-rounded(
    v-if="selected",
    :class="getClasses('inner')"
  )
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import VuozLoadingIcon from "../loading/icon/index.vue";
/**
 * Vuoz standard checkbox
 * @displayName VuozCheckbox
 */
@Component({
  name: "VuozCheckbox",
  components: {
    VuozLoadingIcon,
  },
})
export default class VuozComponent extends Vue {
  /**
   * Properties
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: String, default: "push" }) readonly type!: "push" | "toggle";
  @Prop({ type: String, default: "normal" }) readonly size!:
    | "tiny"
    | "small"
    | "normal"
    | "large";
  @Prop({ type: Boolean, default: false }) readonly rounded!: boolean;
  @Prop({ type: String, default: "medium-grey" }) readonly color!: string;
  @Prop({ type: String, default: "danger" }) readonly toggle!: string; 
  @Prop({ type: Boolean, default: false }) readonly toggled!: boolean;
  @Prop({ type: Boolean, default: false }) readonly shadow!: boolean;
  /**
   * Internal component's data
   */
  private hovered = false;
  private selected = false;
  private disable = false;
  /**
   * Initialization and tear-down
   */
  private mounted() {
    if (this.toggled) {
      this.selected = true;
    }
  }
  private updated() {
    //
  }
  private beforeDestroy() {
    //
  }

  @Watch("disabled", { immediate: true })
  onDisable() {
    this.disable = this.disabled;
  }

  @Watch("toggled", { immediate: true })
  onToggle() {
    this.selected = this.toggled;
  }

  /**
   * Gets button's classes according to props' values.
   */
  private getClasses(type: string) {
    let classes = "";
    switch (type) {
      case "main": {
        // Size
        classes += `is-${this.size}`;
        // Rounded
        this.rounded ? (classes += ` is-rounded`) : "";
        // Background color
        classes += ` has-border-${this.color}`;
        // Hovered but not selected
        if (!this.disable && this.hovered) {
          // Is hovered
          classes += ` has-border-${this.color}-shaded`;
        }
        // Shadow
        if (!this.disable) {
          this.shadow && !this.selected ? (classes += ` has-shadow`) : "";
        }
        // Disabled
        this.disable ? (classes += ` is-disabled`) : "";
        break
      }
      case 'inner': {
        classes += `has-background-${this.toggle} `
        break
      }
    }

    return classes;
  }
  /**
   * Mouse events
   */
  onMouseEnter() {
    this.hovered = true;
  }
  onMouseLeave() {
    this.hovered = false;
  }
  onMouseDown() {
    if (!this.disable) {
      if (this.type === "toggle") {
        // Toggles or untoggles the button
        this.selected = !this.selected;
      } else {
        this.selected = true;
      }
      this.$emit("click", this.selected);
    }
  }
  onMouseUp() {
    if (this.type !== "toggle" && !this.disable) {
      this.selected = false;
      this.$emit("click", this.selected);
    }
  }
  /**
   * To be called by wrappers components.
   */
  public push(toggle: boolean) {
    this.selected = toggle
  }
}
</script>