<template lang='pug'>
// see https://stackoverflow.com/a/60623598/1060921
table.vuoz-table(
  tabindex="0",
  cellspacing="0",
  :class="`has-background-${color}`",
  style="overflow-y: scroll",
  @keydown="onKeyDown",
  @blur="unselect"
)
  tbody
    slot(name="headers", :border="border", :selectable="selectable")
    slot(
      v-for="(item, index) in items",
      name="rows",
      :row="item",
      :id="index",
      :size="size",
      :border="border",
      :delimiter="delimiter",
      :selected="selection[index]",
      :highlight="highlight",
      :selectable="selectable"
    )
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
/**
 * Vuoz table.
 * @displayName VuozTable
 */
@Component({
  name: "VuozTable",
})
export default class VuozComponent extends Vue {
  @Prop({ type: [Array, Object], required: true }) readonly items!: any[];
  @Prop({ type: Number, default: 0 }) readonly initial!: number;
  @Prop({ type: String, default: "small" }) readonly size!:
    | "tiny"
    | "small"
    | "normal"
    | "large";
  @Prop({ type: String, default: "transparent" }) readonly color!: string;
  @Prop({ type: String, default: "none" }) readonly border!: string;
  @Prop({ type: String, default: "none" }) readonly delimiter!: string;
  @Prop({ type: String, default: "none" }) readonly highlight!: string;
  @Prop({ type: String, default: "none" }) readonly selectable!:
    | "none"
    | "one"
    | "multiple";
  @Prop({ type: Boolean, default: true }) readonly unselectable!: boolean;

  private selection: boolean[] = [];
  private firstSelected = -1;
  private selectionRange = 1;
  private modifier: "none" | "shift" | "ctrl" = "none";

  public mounted() {
    // VuozTableHeader and VuozTableRow component calls this.$parent.$emit
    this.$on("cell", this.onCellSelected);
    // Select the initial item if 'unselectable' is set to false
    if (this.unselectable === false && this.items.length > 0) {
      this.firstSelected = this.initial
      this.selectionRange = 1
      this.$nextTick(() => {
        this.handleSelection()
      })
    }
  }

  public beforeDestroy() {
    this.$off("cell", this.onCellSelected);
  }

  @Watch("items", { immediate: true })
  private onItemsChanged() {
    this.selection = new Array(this.items.length).fill(false);
    // Select the initial item if 'unselectable' is set to false
    if (this.unselectable === false && this.items.length > 0) {
      this.firstSelected = this.initial
      this.selectionRange = 1
      this.$nextTick(() => {
        this.handleSelection()
      })
    }
  }

  private onKeyDown(event: KeyboardEvent) {
    if (
      this.selectable !== "none" &&
      event.key.toLowerCase().includes("arrow") &&
      this.firstSelected >= 0
    ) {
      const hasShift = event.shiftKey;

      switch (event.key) {
        case "ArrowUp": {
          if (this.selectable === "multiple" && hasShift) {
            if (this.firstSelected >= 1) {
              this.firstSelected -= 1;
              this.selectionRange += 1;
              this.handleSelection();
              // Informs listeners
              this.emitMulti();
            }
          } else if (this.firstSelected >= 1) {
            this.firstSelected -= 1;
            this.selectionRange = 1;
            this.handleSelection();
            // Informs listeners
            this.emitRow();
          } else {
            this.selectionRange = 1;
            this.handleSelection();
            // Informs listeners
            this.emitRow();
          }
          break;
        }
        case "ArrowDown": {
          if (this.selectable === "multiple" && hasShift) {
            if (
              this.firstSelected + this.selectionRange <
              this.selection.length
            ) {
              this.selectionRange += 1;
              this.handleSelection();
              // Informs listeners
              this.emitMulti();
            }
          } else if (this.firstSelected < this.selection.length - 1) {
            if (
              this.firstSelected + this.selectionRange ===
              this.selection.length
            ) {
              this.firstSelected = this.selection.length - 1;
              this.selectionRange = 1;
              this.handleSelection();
              // Informs listeners
              this.emitRow();
            } else {
              this.firstSelected += 1;
              this.selectionRange = 1;
              this.handleSelection();
              // Informs listeners
              this.emitRow();
            }
          }
        }
      }
    }
  }

  private onCellSelected(payload: any) {
    if (this.selectable !== "none") {
      if (
        this.selectable === "multiple" &&
        payload.modifier === "shift" &&
        this.firstSelected >= 0
      ) {
        // Handles shift modifier
        const first = this.firstSelected;
        const second = payload.row;

        if (first === second) {
          // Selects one line
          this.selectionRange = 1;
          // TODO: emit one
        } else if (second > first) {
          // Selects at the bottom of the first selected row
          this.selectionRange = payload.row - this.firstSelected + 1;
          // Informs listeners
          this.emitMulti();
        } else {
          // Selects at the top of the first selected row
          this.firstSelected = payload.row;
          this.selectionRange = first - this.firstSelected + 1;
          // Informs listeners
          this.emitMulti();
        }

        this.handleSelection();
      } else if (
        this.selectable === "multiple" &&
        payload.modifier === "ctrl" &&
        this.firstSelected >= 0
      ) {
        // Specific handler for ctrl (ctrlKey on Windows / Linux, metaKey on macOS) modifier
        this.selection.splice(payload.row, 1, !this.selection[payload.row]);
        // TODO: emit multi or row or clear
      } else {
        if (this.selection[payload.row] === true) {
          this.unselect();
          // TODO: emit clear
        } else {
          this.firstSelected = payload.row;
          this.selectionRange = 1;
          this.handleSelection();
          // Informs listeners
          this.emitRow();
        }
      }
    }
  }

  private unselect() {
    if (this.unselectable) {
      this.firstSelected = -1;
      this.selectionRange = 1;
      this.selection = new Array(this.items.length).fill(false);
      // Emits 'clear' message
      this.$emit("unselect");
    }
  }

  private handleSelection() {
    // Unselects all
    this.selection.fill(false);
    for (
      let i = this.firstSelected;
      i < this.firstSelected + this.selectionRange;
      i++
    ) {
      this.selection.splice(i, 1, true);
    }
  }

  private emitRow() {
    const payload = {
      row: this.firstSelected,
      item: this.items[this.firstSelected],
    };
    this.$emit("row", payload);
  }

  private emitMulti() {
    const indexes = [];
    const items = [];
    for (let i = 0; i < this.selection.length; i++) {
      if (this.selection[i] === true) {
        indexes.push(i);
        items.push(this.items[i]);
      }
    }
    const payload = {
      rows: indexes,
      items: items,
    };
    this.$emit("multi", payload);
  }
}
</script>