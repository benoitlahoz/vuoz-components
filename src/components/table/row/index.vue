<template lang='pug'>
tr.is-flex-column(
  :class="`has-background-${this.background} ` + getClasses('row')",
  style="height: auto"
)
  td.is-flex.flex-grow(
    :id="index",
    v-if="Array.isArray(row)",
    v-for="(item, index) in row",
    :style="`width: ${100 / row.length}%;`",
    :class="getClasses('cell', isObject(item), index, row.length)",
    @mousedown="onClick(index, item, $event)"
  ) 
    template(v-if="!isObject(item)") 
      .flex-grow.is-flex.align-center.is-fullheight {{ item }}
    template(v-if="isObject(item)") 
      component(:is="item.component", v-bind="item.props")
  td.is-fullwidth.is-flex-column(
    v-if="!Array.isArray(row)",
    :class="getClasses('cell', isObject(row))",
    @mousedown="onClick(0, row, $event)"
  )
    template(v-if="!isObject(row)") {{ row }}
    template(v-if="isObject(row)") 
      component(:is="row.component", v-bind="row.props")
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
/**
 * Vuoz table row.
 * @displayName VuozTableRow
 */
@Component({
  name: "VuozTableRow",
})
export default class VuozComponent extends Vue {
  @Prop({ type: [Array, String, Number, Object], required: true })
  readonly row!: any[] | any;
  @Prop({ type: Number, required: true }) readonly id!: string;
  @Prop({ type: String, default: "small" }) readonly size!:
    | "small-thin"
    | "small"
    | "normal"
    | "large";
  @Prop({ type: String, default: "transparent" }) readonly color!: string;
  @Prop({ type: String, default: "none" }) readonly border!: string;
  @Prop({ type: String, default: "none" }) readonly cellBorder!: string;
  @Prop({ type: String, default: "primary" }) readonly highlight!: string;
  @Prop({ type: Boolean, default: false }) readonly selected!: string;
  @Prop({ type: String, default: "none" }) readonly selectable!:
    | "none"
    | "one"
    | "multiple";

  private background = "transparent";
  private ctrl: "ctrl" | "meta" = "ctrl";

  @Watch("selected", { immediate: true })
  onSelectedChange() {
    this.background = this.selected ? this.highlight : this.color;
  }

  mounted() {
    // Checks if we must use ctrl key or meta key according to platform
    this.ctrl = navigator.platform.toLowerCase().includes("mac")
      ? "meta"
      : "ctrl";
  }

  private getClasses(
    type: "row" | "cell",
    isObject?: boolean,
    index?: number,
    length?: number
  ) {
    let classes = "";
    switch (type) {
      case "row": {
        // Tohandle special 'small-thin' size value
        const size = this.size.split("-")[0];
        classes += `has-border-bottom-${this.border} `;
        classes += `item-height-${this.size} has-text-${size} `;
        break;
      }
      case "cell": {
        if (
          typeof index !== "undefined" &&
          typeof length !== "undefined" &&
          index < length - 1
        ) {
          classes += `has-border-right-${this.cellBorder} `;
        }

        if (isObject === false) {
          switch (this.size) {
            case "small-thin":
            case "small": {
              classes += `has-padding-left-sm has-padding-right-sm`;
              break;
            }
            case "normal":
            case "large": {
              classes += `has-padding-left-md has-padding-right-md`;
              break;
            }
          }
        }
      }
    }
    return classes;
  }

  private onClick(index: number, item: any, event: MouseEvent) {
    if (this.selectable !== "none") {
      // Gets eventual modifier key.
      let modifier: "shift" | "ctrl" | undefined = undefined;
      if (event.shiftKey) {
        modifier = "shift";
      } else if (
        (this.ctrl === "ctrl" && event.ctrlKey) ||
        (this.ctrl === "meta" && event.metaKey)
      ) {
        modifier = "ctrl";
      }

      const payload = {
        row: this.id,
        col: index,
        modifier,
        item,
      };
      // Informs direct listeners
      this.$emit("cell", payload);
      // Informs parent listeners
      this.$parent.$emit("cell", payload);

      return false;
    }
  }

  private isObject(item: any) {
    return typeof item === "object";
  }
}
</script>