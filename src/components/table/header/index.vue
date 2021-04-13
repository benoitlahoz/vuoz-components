<template lang='pug'>
tr(:class="getClasses('row')")
  th(
    v-for="(item, index) in row",
    :style="`width: ${100 / row.length}%;`",
    :class="getClasses('cell', index)",
    @mousedown="onClick(index)"
  ) {{ item }}
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
/**
 * Vuoz table header.
 * @displayName VuozTableHeader
 */
@Component({
  name: "VuozTableHeader",
})
export default class VuozComponent extends Vue {
  @Prop({ type: Array, required: true }) readonly row!: any[];
  @Prop({ type: String, default: "small" }) readonly size!:
    | "small"
    | "normal"
    | "large";
  @Prop({ type: String, default: "transparent" }) readonly color!: string;
  @Prop({ type: String, default: "none" }) readonly border!: string;
  @Prop({ type: String, default: "none" }) readonly selectable!:
    | "none"
    | "one"
    | "multiple";

  private getClasses(type: string, index?: number) {
    let classes = "";
    switch (type) {
      case "row": {
        classes += `has-border-bottom-${this.border} has-background-${this.color} `;
        classes += `item-height-${this.size} `;
        break;
      }
      case "cell": {
        if (typeof index !== "undefined" && index < this.row.length - 1) {
          classes += `has-border-right-${this.border} `;
        }
        classes += `has-text-${this.size} `;
        break;
      }
    }
    return classes;
  }

  private onClick(index: number) {
    if (this.selectable !== "none") {
      const payload = {
        col: index,
        content: this.row[index],
      };
      // Emits for direct listeners
      this.$emit("click", payload);
      // Emits from parent (supposed to be a table component)
      this.$parent.$emit("header", payload);
    }
  }
}
</script>