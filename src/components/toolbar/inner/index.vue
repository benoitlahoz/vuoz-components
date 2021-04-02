<template lang='pug'>
.vuoz-toolbar(ref="main", :class="getClasses('main')")
  .vuoz-toolbar__content(ref="content")
    .is-flex.align-center.has-padding-s(
      v-for="button in buttons",
      :key="button.name"
    )
      vuoz-button(
        :ref="button.name",
        :size="size",
        :shape="button.shape || 'square'",
        :color="button.color",
        :icon="button.icon",
        :rounded="button.rounded",
        :border="button.border",
        :type="button.type",
        :toggle="button.toggle",
        :disabled="disabledFlag === true ? true : button.disabled || false",
        :loading="button.loading",
        @click="onClick($event, button.name)"
      )
</template>
<style lang="sass">
\:root
  --vuoz-toolbar__position: absolute
  --vuoz-toolbar__space: 0.5rem
  --vuoz-toolbar__computed: 1rem
  --vuoz-toolbar__opacity: 1
  --vuoz-toolbar__rows: 1
  --vuoz-toolbar__columns: 1

.vuoz-toolbar
  position: var(--vuoz-toolbar__position)
  display: inline-block
  opacity: var(--vuoz-toolbar__opacity)
  &.is-top-left
    top: var(--vuoz-toolbar__space)
    left: var(--vuoz-toolbar__space)
  &.is-left
    top: var(--vuoz-toolbar__computed)
    left: var(--vuoz-toolbar__space)
  &.is-bottom-left
    bottom: var(--vuoz-toolbar__space)
    left: var(--vuoz-toolbar__space)
  &.is-bottom
    bottom: var(--vuoz-toolbar__space)
    left: var(--vuoz-toolbar__computed)
  &.is-bottom-right
    bottom: var(--vuoz-toolbar__space)
    right: var(--vuoz-toolbar__space)
  &.is-right
    top: var(--vuoz-toolbar__computed)
    right: var(--vuoz-toolbar__space)
  &.is-top-right
    top: var(--vuoz-toolbar__space)
    right: var(--vuoz-toolbar__space)
  &.is-top
    top: var(--vuoz-toolbar__space)
    left: var(--vuoz-toolbar__computed)

.vuoz-toolbar__content
  display: grid
  grid-template: repeat(var(--vuoz-toolbar__rows), 1fr) / repeat(var(--vuoz-toolbar__columns), 1fr)
  grid-auto-flow: row dense
</style>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import VuozButton from "../../button/index.vue";
/**
 * Vuoz components' toolbar.
 * @displayName VuozToolbar
 */
@Component({
  name: "VuozToolbar",
  components: {
    VuozButton,
  },
})
export default class VuozComponent extends Vue {
  @Prop({ type: [Array, Object], required: true }) readonly items!: any[] | any;
  @Prop({ type: String, default: "always" }) readonly show!: "always" | "over" | "call";
  @Prop({ type: Boolean, default: false }) readonly vertical!: boolean;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Boolean, default: true }) readonly rounded!: boolean;
  @Prop({ type: String, default: "dark-grey" }) readonly color!: string;
  @Prop({ type: Boolean, default: true }) readonly border!: boolean;
  @Prop({ type: String, default: "normal" }) readonly size!: "timy" | "small";
  @Prop({ type: String, default: "0.5rem" }) readonly space!: string;
  @Prop({ type: Boolean, default: true }) readonly shadow!: boolean;
  @Prop({ type: String, default: "top-right" }) readonly position!:
    | "top-left"
    | "left"
    | "bottom-left"
    | "bottom"
    | "bottom-right"
    | "right"
    | "top-right"
    | "top";

  private buttons: any[] = [];
  private objectType: "object:uni" | "object:multi" | "array:uni" | "array:multi" =
    "array:uni";
  private disabledFlag = false;

  @Watch("items", { immediate: true })
  onItemsChanged() {
    if (Array.isArray(this.items)) {
      if (this.items.length > 0 && Array.isArray(this.items[0])) {
        // Multidimensional array
        this.objectType = "array:multi";
        this.buttons = [];
        this.items.forEach((row) => {
          row.forEach((button: any) => {
            this.buttons.push(button);
          });
        });
        this.computeGrid(this.items);
      } else {
        // Unidimensional array
        this.objectType = "array:uni";
        this.buttons = this.items;
        this.computeGrid(this.items);
      }
    } else {
      if (
        this.items.buttons.length > 0 &&
        Array.isArray(this.items.buttons[0])
      ) {
        // Multidimensional array
        this.objectType = "object:multi";
        this.buttons = [];
        this.items.buttons.forEach((row: any) => {
          row.forEach((button: any) => {
            this.buttons.push(button);
          });
        });
        this.computeGrid(this.items.buttons);
      } else {
        // Unidimensional array
        this.objectType = "object:uni";
        this.buttons = this.items.buttons;
        this.computeGrid(this.items.buttons);
      }
      // Checks if we have default entries in the object passed.
      const color = this.items.color || undefined;
      const rounded = this.items.rounded || undefined;
      const border = this.items.border || undefined;
      if (color || rounded) {
        this.buttons.forEach((button) => {
          // Assigns default properties to buttons that don't have this entry.
          if (color && !button.color) {
            button.color = color;
          }
          if (rounded && typeof button.rounded === "undefined") {
            button.rounded = rounded;
          }
          if (border && typeof button.border === "undefined") {
            button.border = border;
          }
        });
      }
    }
  }

  @Watch("vertical", { immediate: true })
  onVerticalChanged() {
    const items = this.objectType.includes("array") ? this.items : this.items.buttons;
    // Computes the new grid values.
    this.computeGrid(items);
    // Computes vposition values for non-corner positions
    this.computeEdges()
  }

  private computeGrid(items: any[]) {
    // Rows and columns for the grid system
    let rows = 1;
    let columns = 1;
    if (this.objectType.includes("multi")) {
      rows = items.length;
      items.forEach((row: any) => {
        columns = Math.max(columns, row.length);
      });
    } else {
      columns = items.length;
    }
    // Change grid values
    this.$nextTick(() => {
      const el = this.$refs.content as HTMLElement;
      if (this.vertical) {
        rows = [columns, (columns = rows)][0];
      }
      el.style.setProperty("--vuoz-toolbar__rows", `${rows}`);
      el.style.setProperty("--vuoz-toolbar__columns", `${columns}`);
    });
  }

  private computeEdges() {
    if (this.position === "top" || this.position === "bottom") {
      // We call this on the next tick, when we're sure the element is created
      this.$nextTick(() => {
        const el = this.$refs.main as HTMLElement;
        const parent = el.parentElement;
        if (parent) {
          const elRect = el.getBoundingClientRect();
          const parentRect = parent.getBoundingClientRect();

          const pos = (parentRect.width - elRect.width) / 2;
          el.style.setProperty("--vuoz-toolbar__computed", `${pos}px`);
        }
      });
    }
    if (this.position === "left" || this.position === "right") {
      // We call this on the next tick, when we're sure the element is created
      this.$nextTick(() => {
        const el = this.$refs.main as HTMLElement;
        const parent = el.parentElement;
        if (parent) {
          const elRect = el.getBoundingClientRect();
          const parentRect = parent.getBoundingClientRect();

          const pos = (parentRect.height - elRect.height) / 2;
          el.style.setProperty("--vuoz-toolbar__computed", `${pos}px`);
        }
      });
    }
  }

  @Watch("space", { immediate: true })
  onSpaceChanged() {
    this.$nextTick(() => {
      const el = this.$refs.main as HTMLElement;
      el.style.setProperty("--vuoz-toolbar__space", this.space);
    });
  }

  @Watch("disabled", { immediate: true })
  onDisabledChange() {
    this.$nextTick(() => {
      if (this.disabled !== false) {
        this.disable();
      } else {
        this.enable();
      }
    });
  }

  private getClasses(type: string) {
    let classes = "";
    switch (type) {
      case "main": {
        classes += `has-background-${this.color}${
          this.rounded ? " is-rounded " : " "
        }`;
        classes += this.border ? `has-border-${this.color}-shaded ` : " ";
        classes += this.shadow ? (classes += `has-shadow `) : "";
        // Computes actual position according to element's size for 'top', 'left', 'bottom', 'right' positions.
        this.computeEdges();
        // Position
        classes += `is-${this.position} `;
        break;
      }
      case "container": {
        break;
      }
    }
    return classes;
  }

  private onClick(isDown: boolean, name: string) {
    if (!this.disabled) {
      const button = this.buttons.find((b) => b.name === name);
      const component = (this.$refs[button.name] as any[])[0];
      if (button.onUp && isDown === false) {
        button.onUp.call(this, button.target || null, component);
      }
      if (button.onDown && isDown === true) {
        button.onDown.call(this, button.target || null, component);
      }
      this.$emit("click", name, isDown);
    }
  }

  public disable(name?: string) {
    if (name) {
      const button = this.buttons.find((b) => b.name === name);
      if (button) {
        const newButton = { ...button };
        newButton.disabled = true;
        const index = this.buttons.indexOf(button);
        this.buttons.splice(index, 1, newButton);
      }
    } else {
      this.disabledFlag = true;
      const el = this.$refs.main as HTMLElement;
      el.style.setProperty("--vuoz-toolbar__opacity", "0.75");
      this.$emit("disable");
    }
  }

  public enable() {
    this.disabledFlag = false;
    const el = this.$refs.main as HTMLElement;
    el.style.setProperty("--vuoz-toolbar__opacity", "1");
    this.$emit("enable");
  }

  public disableAllBut(name: string) {
    const others = this.buttons.filter((b) => b.name !== name);
    others.forEach((button) => {
      // Replace button by a new instance to force refresh
      const index = this.buttons.indexOf(button);
      const newButton = { ...button };
      newButton.disabled = true;
      this.buttons.splice(index, 1, newButton);
    });
  }

  public resetState() {
    this.buttons.forEach((button) => {
      // Replace button by a new instance to force refresh
      const index = this.buttons.indexOf(button);
      const newButton = { ...button };
      newButton.disabled = false;
      this.buttons.splice(index, 1, newButton);
    });
  }
}
</script>