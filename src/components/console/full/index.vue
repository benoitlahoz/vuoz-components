<template lang="pug">
.vuoz-console__container(
  :class="`has-toolbar-${toolbarPosition}`"
)
  div(
    v-if="toolbar === true && (toolbarPosition === 'left' || toolbarPosition === 'top')"
  )
    vuoz-toolbar(
      type="fixed",
      :position="toolbarPosition",
      :border="toolbarBorder",
      :size="size === 'small' ? 'tiny' : 'small'",
      :items="toolbarItems",
      @click="onToolbar"
    )
  .vuoz-console__content(ref="console").flex-grow
    template(v-if="type === 'table'")
      table.vuoz-table
        colgroup
          col(v-if="date === true", span="1")
          col(span="1")
          col(v-if="showCaller === true", span="1")
        tbody
          template(v-for="(line, index) in lines")
            vuoz-console-item(
              :line="line",
              :size="size",
              :caller="showCaller",
              :date="date",
              :format="format",
              :bordered="bordered"
            )
    template(v-if="type === 'stack'")
      .flex-grow(
        v-for="(line, index) in lines",
        :class="getStackLineClasses()"
      ) {{ line.content }}
  div(
    v-if="toolbar === true && (toolbarPosition === 'right' || toolbarPosition === 'bottom')")
    vuoz-toolbar(
      type="fixed",
      :position="toolbarPosition",
      :border="toolbarBorder",
      :size="size === 'small' ? 'tiny' : 'small'",
      :items="toolbarItems",
      @click="onToolbar"
    )
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import VuozConsoleItem from "../item/index.vue";
import VuozToolbar from "../../toolbar/index.vue";
import { toolbarItems } from './console.toolbar'

/**
 * Vuoz console
 * @displayName VuozConsole
 */
@Component({
  name: "VuozConsole",
  components: {
    VuozConsoleItem,
    VuozToolbar,
  },
})
export default class VuozComponent extends Vue {
  @Prop({ type: String, default: "table" }) readonly type!: "table" | "stack";
  // TODO: Pass component?
  // @see: https://stackoverflow.com/a/56732461/1060921
  @Prop({ type: Boolean, default: true }) readonly toolbar!: string;
  @Prop({ type: String, default: "top" }) readonly toolbarPosition!:
    "top"
    | "left"
    | "bottom"
    | "right";
  @Prop({ type: Boolean, default: true }) readonly toolbarBorder!: string;
  @Prop({ type: String, default: "small" }) readonly size!:
    "small"
    | "normal"
    | "large";
  @Prop({ type: String, default: "asc" }) readonly sort!: "asc" | "desc";
  @Prop({ type: Boolean, default: true }) readonly caller!: boolean;
  @Prop({ type: Boolean, default: true }) readonly bordered!: string;
  @Prop({ type: Boolean, default: true }) readonly date!: string;
  @Prop({ type: String, default: "iso" }) readonly format!: "none" | "iso";

  private lines: any[] = [];
  private order: "asc" | "desc" = "asc";
  private showCaller = true

  private toolbarItems = toolbarItems

  @Watch("sort", { immediate: true })
  private onSortChanged() {
    this.order = this.sort;
    this.sortLines();
  }

  @Watch("caller", { immediate: true })
  private onCallerChanged() {
    this.showCaller = this.caller
  }

  private getStackLineClasses() {
    let classes = ``;
    switch (this.size) {
      case "small": {
        classes +=
          "has-text-small has-padding-left-s has-padding-right-s has-padding-top-xxs has-padding-bottom-xxs has-margin-left-s has-margin-right-s" +
          ` time-line-height-${this.size}`;
        break;
      }
      case "normal": {
        classes +=
          "has-text-normal has-padding-left-sm has-padding-right-sm has-padding-top-xxs has-padding-bottom-xxs has-margin-left-sm has-margin-right-sm" +
          ` time-line-height-${this.size}`;
        break;
      }
      case "large": {
        classes +=
          "has-text-large has-padding-left-ms has-padding-right-ms has-padding-top-xs has-padding-bottom-xs has-margin-left-ms has-margin-right-ms" +
          ` time-line-height-${this.size}`;
        break;
      }
    }
    return classes;
  }

  private sortLines() {
    if (this.order === "desc") {
      this.lines.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (new Date(b.date) as any) - (new Date(a.date) as any);
      });
    } else {
      this.lines.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (new Date(a.date) as any) - (new Date(b.date) as any);
      });
    }
  }

  /**
   * To be called by the page or the component where the VuozConsole is included.
   * Pushes a line at the end of the lines array (displayed last if sort order is 'asc', first if sort order is 'desc')
   * @param { object } line The line to be pushed.
   */
  public push(line: any) {
    const el = this.$refs.console as HTMLElement;
    if (this.order === "desc") {
      this.lines.push(line);
      this.$nextTick(() => {
        // Scroll
        el.scrollTop = 0;
      });
    } else {
      this.lines.splice(0, 0, line);
      this.$nextTick(() => {
        // Scroll
        el.scrollTop = el.scrollHeight;
      });
    }
    this.sortLines();
  }

  /**
   * To be called by the page or the component where the VuozConsole is included.
   * Replaces the last line of the lines array (displayed last if sort order is 'asc', first if sort order is 'desc')
   * @param { object } line The line in replacement.
   */
  public replaceLast(line: any) {
    const el = this.$refs.console as HTMLElement;
    if (this.order === "desc") {
      this.lines.splice(0, 1, line);
      this.$nextTick(() => {
        // Scroll
        el.scrollTop = 0;
      });
    } else {
      this.lines.splice(this.lines.length - 1, 1, line);
      this.$nextTick(() => {
        // Scroll
        el.scrollTop = el.scrollHeight;
      });
    }
    this.sortLines();
  }

  onToolbar(name: string, down: boolean) {
    switch (name) {
      case "vuoz:console:sort": {
        if (down) {
          this.order = this.order === "asc" ? "desc" : "asc";
          const el = this.$refs.console as HTMLElement;
          if (this.order === "desc") {
            this.$nextTick(() => {
              // Scroll
              el.scrollTop = 0;
            });
          } else {
            this.$nextTick(() => {
              // Scroll
              el.scrollTop = el.scrollHeight;
            });
          }
          this.sortLines();
        }
        break;
      }
      case "vuoz:console:caller": {
        this.showCaller = down;
        break;
      }
    }
  }
}
</script>