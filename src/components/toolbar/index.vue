<template lang='pug'>
.vuoz-toolbar(ref="main", :class="getClasses('main')")
  // Contextual type
  .vuoz-toolbar__content-contextual(
    v-if="type === 'contextual'",
    ref="content"
  )
    .is-flex.align-center.has-padding-s(
      v-for="button in buttons",
      v-if="button.role !== 'separator' && button.role !== 'spacer'"
    )
      // In 'contextual' mode, a spacer participates to the grid system, but doesn't extend.
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
        :toggled="button.toggled",
        :disabled="disabledFlag === true ? true : button.disabled || false",
        :loading="button.loading",
        @click="onClick($event, button.name)",
        :menuComponent="button.menu",
        @menu="onMenuSelect($event, button.name)"
      )
  // Fixed type, TODO @see: https://stackoverflow.com/a/56249209/1060921
  .vuoz-toolbar__content-fixed(v-else, ref="content")
    // Arrays
    template(v-if="Array.isArray(items)", v-for="(item, index) in items")
      // Multidimensional
      .line(
        v-if="Array.isArray(item)",
        :class="getClasses('line', index, items.length)"
      )
        // Here, item is an array for button description
        .align-center.has-padding-s(
          v-for="button in item",
          :class="{ spacer: button.role === 'spacer', separator: item.role === 'separator' }"
        )
          div(v-if="button.role === 'separator'", :class="`has-border-left-${border}`", style="width: 2px; height: 100%;")
          vuoz-button(
            v-if="button.role !== 'separator' && button.role !== 'spacer'",
            :ref="button.name",
            :size="size",
            :shape="button.shape || 'square'",
            :color="button.color",
            :icon="button.icon",
            :rounded="button.rounded",
            :border="button.border",
            :type="button.type",
            :toggle="button.toggle",
            :toggled="button.toggled",
            :disabled="disabledFlag === true ? true : button.disabled || false",
            :loading="button.loading",
            @click="onClick($event, button.name)",
            :menuComponent="button.menu",
            @menu="onMenuSelect($event, button.name)"
          )
      // Unidimensional: one line or row
      .align-center.has-padding-s(
        v-else,
        :class="{ spacer: item.role === 'spacer', separator: item.role === 'separator' }"
      )
        div(v-if="item.role === 'separator'", :class="`has-border-left-${border}`", style="width: 2px; height: 100%;")
        // Here, item is a button description
        vuoz-button(
          v-if="item.role !== 'separator' && item.role !== 'spacer'",
          :ref="item.name",
          :size="size",
          :shape="item.shape || 'square'",
          :color="item.color",
          :icon="item.icon",
          :rounded="item.rounded",
          :border="item.border",
          :type="item.type",
          :toggle="item.toggle",
          :toggled="item.toggled",
          :disabled="disabledFlag === true ? true : item.disabled || false",
          :loading="item.loading",
          @click="onClick($event, item.name)",
          :menuComponent="item.menu",
          @menu="onMenuSelect($event, item.name)"
        )
    // Objects
    template(
      v-if="!Array.isArray(items)",
      v-for="(item, index) in items.buttons"
    )
      // Multidimensional
      .line(
        v-if="Array.isArray(item)",
        :class="getClasses('line', index, items.buttons.length)"
      )
        // Here, item is an array for button description
        .align-center.has-padding-s(
          v-for="button in item",
          :class="{ spacer: button.role === 'spacer', separator: item.role === 'separator' }"
        )
          div(v-if="button.role === 'separator'", :class="`has-border-left-${border}`", style="width: 2px; height: 100%;")
          vuoz-button(
            v-if="button.role !== 'separator' && button.role !== 'spacer'",
            :ref="button.name",
            :size="size",
            :shape="button.shape || 'square'",
            :color="button.color",
            :icon="button.icon",
            :rounded="button.rounded",
            :border="button.border",
            :type="button.type",
            :toggle="button.toggle",
            :toggled="button.toggled",
            :disabled="disabledFlag === true ? true : button.disabled || false",
            :loading="button.loading",
            @click="onClick($event, button.name)",
            :menuComponent="button.menu",
            @menu="onMenuSelect($event, button.name)"
          )
      // Unidimensional: one line or row
      .align-center.has-padding-s(
        v-else,
        :class="{ spacer: item.role === 'spacer', separator: item.role === 'separator' }"
      )
        div(v-if="item.role === 'separator'", :class="`has-border-left-${border}`", style="width: 2px; height: 100%;")
        // Here, item is a button description
        vuoz-button(
          v-if="item.role !== 'separator' && item.role !== 'spacer'",
          :ref="item.name",
          :size="size",
          :shape="item.shape || 'square'",
          :color="item.color",
          :icon="item.icon",
          :rounded="item.rounded",
          :border="item.border",
          :type="item.type",
          :toggle="item.toggle",
          :toggled="item.toggled",
          :disabled="disabledFlag === true ? true : item.disabled || false",
          :loading="item.loading",
          @click="onClick($event, item.name)",
          :menuComponent="item.menu",
          @menu="onMenuSelect($event, item.name)"
        )
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import VuozButton from "../button/index.vue";
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
  @Prop({ type: String, default: "contextual" }) readonly type!:
    "fixed"
    | "contextual";
  @Prop({ type: String, default: "always" }) readonly show!:
    "always"
    | "over"
    | "call";
  @Prop({ type: Boolean, default: false }) readonly vertical!: boolean;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Boolean, default: true }) readonly rounded!: boolean;
  @Prop({ type: String, default: "dark-grey" }) readonly color!: string;
  @Prop({ type: String, default: "none" }) readonly border!: string;
  @Prop({ type: String, default: "normal" }) readonly size!: "tiny" | "small" | "normal";
  @Prop({ type: String, default: "0.5rem" }) readonly space!: string;
  @Prop({ type: Boolean, default: true }) readonly shadow!: boolean;
  @Prop({ type: String, default: "top-right" }) readonly position!:
    "top-left"
    | "left"
    | "bottom-left"
    | "bottom"
    | "bottom-right"
    | "right"
    | "top-right"
    | "top";

  private buttons: any[] = [];
  private objectType:
    "object:uni"
    | "object:multi"
    | "array:uni"
    | "array:multi" = "array:uni";
  private disabledFlag = false;

  @Watch("type", { immediate: true })
  onTypeChanged() {
    // Parses items prop.
    this.onItemsChanged()
    // Computes styles according to type/
    this.computeType();
    const items = this.objectType.includes("array")
      ? this.items
      : this.items.buttons;
    // Computes the new grid values.
    this.computeGrid(items);
    // Computes pixels values for non-corner positions
    this.computeEdges();
  }

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
        if (this.type === "contextual") {
          this.computeGrid(this.items);
        }
      } else {
        // Unidimensional array
        this.objectType = "array:uni";
        this.buttons = this.items;

        if (this.type === "contextual") {
          this.computeGrid(this.items);
        }
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
        if (this.type === "contextual") {
          this.computeGrid(this.items.buttons);
        }
      } else {
        // Unidimensional array
        this.objectType = "object:uni";
        this.buttons = this.items.buttons;
        if (this.type === "contextual") {
          this.computeGrid(this.items.buttons);
        }
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

  @Watch("position", { immediate: true })
  onPositionChanged() {
    this.computeType();
    const items = this.objectType.includes("array")
      ? this.items
      : this.items.buttons;

    if (this.type === "contextual") {
      // Computes the new grid values.
      this.computeGrid(items);
      // Computes pixels values for non-corner positions
      this.computeEdges();
    }
  }

  @Watch("vertical", { immediate: true })
  onVerticalChanged() {
    if (this.type === "contextual") {
      const items = this.objectType.includes("array")
        ? this.items
        : this.items.buttons;
      // Computes the new grid values.
      this.computeGrid(items);
      // Computes pixels values for non-corner positions
      this.computeEdges();
    }
  }

  @Watch("space", { immediate: true })
  onSpaceChanged() {
    if (this.type === "contextual") {
      this.$nextTick(() => {
        const el = this.$refs.main as HTMLElement;
        el.style.setProperty("--vuoz-toolbar__space", this.space);
      });
    }
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

  private computeType() {
    switch (this.type) {
      case "contextual": {
        this.$nextTick(() => {
          const el = this.$refs.main as HTMLElement;
          el.style.setProperty("--vuoz-toolbar__position", "absolute");
          el.style.setProperty("--vuoz-toolbar__width", "auto");
          el.style.setProperty("--vuoz-toolbar__height", "auto");
          el.style.setProperty("--vuoz-toolbar__space", `${this.space}`);
        });
        break;
      }
      case "fixed": {
        this.$nextTick(() => {
          const el = this.$refs.main as HTMLElement;
          el.style.setProperty("--vuoz-toolbar__position", "relative");
          el.style.setProperty("--vuoz-toolbar__space", "0");
          if (
            this.position.includes("top") ||
            this.position.includes("bottom")
          ) {
            el.style.setProperty("--vuoz-toolbar__width", "100%");
            el.style.setProperty("--vuoz-toolbar__height", "auto");
            if (this.objectType.includes("uni")) {
              el.style.setProperty("--vuoz-toolbar__fixed-flex", "row");
              el.style.setProperty("--vuoz-toolbar__fixed-line-flex", "column");
            } else {
              el.style.setProperty("--vuoz-toolbar__fixed-flex", "column");
              el.style.setProperty("--vuoz-toolbar__fixed-line-flex", "row");
            }
          } else {
            el.style.setProperty("--vuoz-toolbar__width", "auto");
            el.style.setProperty("--vuoz-toolbar__height", "100%");
            if (this.objectType.includes("uni")) {
              el.style.setProperty("--vuoz-toolbar__fixed-flex", "column");
              el.style.setProperty("--vuoz-toolbar__fixed-line-flex", "row");
            } else {
              el.style.setProperty("--vuoz-toolbar__fixed-flex", "row");
              el.style.setProperty("--vuoz-toolbar__fixed-line-flex", "column");
            }
          }
        });
        break;
      }
    }
  }

  private computeGrid(items: any[]) {
    // Rows and columns for the grid system
    let rows = 1;
    let columns = 1;
    if (this.objectType.includes("multi")) {
      if (
        this.type === "contextual" ||
        this.position.includes("top") ||
        this.position.includes("bottom")
      ) {
        rows = items.length;
        items.forEach((row: any) => {
          // Separators and spacers are not allowed in contextual mode.
          const clean = row.filter(
            (i: any) => i.role !== "spacer" && i.role !== "separator"
          );
          columns = Math.max(columns, clean.length);
        });
      } else {
        rows = 1;
        // Separators and spacers are not allowed in contextual mode.
        const clean = items.filter(
          (i: any) => i.role !== "spacer" && i.role !== "separator"
        );
        columns = clean.length;
      }
    } else {
      // Separators and spacers are not allowed in contextual mode.
      const clean = items.filter(
        (i: any) => i.role !== "spacer" && i.role !== "separator"
      );
      columns = clean.length;
    }
    // Change grid values
    this.$nextTick(() => {
      const el = this.$refs.content as HTMLElement;
      if (this.vertical && this.type === "contextual") {
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

  private getClasses(type: string, index?: number, length?: number) {
    let classes = "";
    switch (type) {
      // Root div

      case "main": {
        classes += `has-background-${this.color} `;
        if (this.border !== 'none') {
          if (this.type === "contextual") {
            classes += this.border ? `has-border-${this.border} ` : " ";
          } else {
            switch (this.position) {
              case "top":
              case "top-left":
              case "top-right": {
                classes += `has-border-bottom-${this.border} `;
                classes += this.shadow ? (classes += `has-shadow-bottom `) : "";
                break;
              }
              case "left": {
                classes += `has-border-right-${this.border} `;
                classes += this.shadow ? (classes += `has-shadow-right `) : "";
                break;
              }
              case "right": {
                classes += `has-border-left-${this.border} `;
                classes += this.shadow ? (classes += `has-shadow-left `) : "";
                break;
              }
              case "bottom":
              case "bottom-left":
              case "bottom-right": {
                classes += `has-border-top-${this.border} `;
                classes += this.shadow ? (classes += `has-shadow-top `) : "";
                break;
              }
            }
          }
        }
        // Computes actual position according to element's size for 'top', 'left', 'bottom', 'right' positions.
        this.computeEdges();
        // TODO: Optimize!!!
        if (this.type === "contextual") {
          classes += this.shadow ? (classes += `has-shadow `) : "";
        }
        // Position
        classes += `is-${this.position} `;
        if (this.type === "contextual" && this.rounded) {
          switch (this.position) {
            case "top":
            case "left":
            case "bottom":
            case "right": {
              classes += "is-rounded ";
              break;
            }
            case "top-left": {
              classes +=
                "is-rounded-bottom-left is-rounded-bottom-right is-rounded-top-right ";
              break;
            }
            case "bottom-left": {
              classes +=
                "is-rounded-top-left is-rounded-bottom-right is-rounded-top-right ";
              break;
            }
            case "bottom-right": {
              classes +=
                "is-rounded-bottom-left is-rounded-top-left is-rounded-top-right ";
              break;
            }
            case "top-right": {
              classes +=
                "is-rounded-bottom-left is-rounded-bottom-right is-rounded-top-left ";
              break;
            }
          }
        }
        break;
      }
      case "line": {
        if (this.border !== 'none') {
          switch (this.position) {
            case "top":
            case "top-left":
            case "top-right": {
              if (
                index !== undefined &&
                length !== undefined &&
                index < length - 1
              ) {
                classes += `has-border-bottom-${this.border} `;
              }
              break;
            }
            case "left":
            case "right": {
              if (
                index !== undefined &&
                length !== undefined &&
                index < length - 1
              ) {
                classes += `has-border-right-${this.border} `;
              }
              break;
            }
            case "bottom":
            case "bottom-left":
            case "bottom-right": {
              if (
                index !== undefined &&
                length !== undefined &&
                index < length - 1
              ) {
                classes += `has-border-bottom-${this.border} `;
              }
              break;
            }
          }
        }
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

  private onMenuSelect(event: any) {
    this.$emit('menu', event)
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

  public select(name?: string) {
    if (name) {
      const button = (this.$refs[name] as any);
      if (button) {
        button[0].click(true);
      }
    }
  }

  public unselect(name?: string) {
    if (name) {
      const button = (this.$refs[name] as any);
      if (button) {
        button[0].unselect();
      }
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