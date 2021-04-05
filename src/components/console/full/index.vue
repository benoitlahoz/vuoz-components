<template lang="pug">
.flex-grow(style="overflow: hidden")
  div(v-if="toolbar === true")
    vuoz-toolbar(type="fixed", position="top", size="tiny", :items="toolbarItems")
  .is-flex-column.flex-grow(
    ref="console",
    style="max-height: 100%; overflow-y: scroll; overflow-x: hidden;"
  )
    template(v-if="type === 'table'")
      table.is-flex(style="width: 100%; table-layout: auto;")
        colgroup
          col(v-if="date === true", span="1")
          col(span="1")
          col(v-if="caller === true", span="1")
        tbody.flex-grow
          template(v-for="(line, index) in lines")
            vuoz-console-item(
              :line="line",
              :size="size",
              :caller="caller",
              :date="date",
              :format="format",
              :bordered="bordered"
            )
    template(v-if="type === 'stack'")
      .flex-grow(v-for="(line, index) in lines", :class="getStackLineClasses()") {{ line.content }}
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import VuozConsoleItem from "../item/index.vue";
import VuozToolbar from '../../toolbar/index.vue'

/**
 * Vuoz console
 * @displayName VuozConsole
 */
@Component({
  name: "VuozConsole",
  components: {
    VuozConsoleItem,
    VuozToolbar
  },
})
export default class VuozComponent extends Vue {
  @Prop({ type: String, default: "table" }) readonly type!: "table" | "stack";
  // TODO: Pass component
  // @see: https://stackoverflow.com/a/56732461/1060921
  @Prop({ type: Boolean, default: true }) readonly toolbar!: string;
  @Prop({ type: String, default: "normal" }) readonly size!:
    | "small"
    | "normal"
    | "large";
  @Prop({ type: String, default: "asc" }) readonly sort!: "asc" | "desc";
  @Prop({ type: Boolean, default: true }) readonly caller!: string;
  @Prop({ type: Boolean, default: true }) readonly bordered!: string;
  @Prop({ type: Boolean, default: true }) readonly date!: string;
  @Prop({ type: String, default: "iso" }) readonly format!: "none" | "iso";

  private lines: any[] = [];
  private toolbarItems = [
  {
    icon: 'crop',
    label: 'Crop',
    type: 'toggle',
    toggle: 'primary',
    rounded: true,
    name: 'vuoz:toolbar:crop',
    target: 'MyAwesomeComponent',
    onDown(target: any, button: any) {
      // Here 'this' represents the caller (VuozInnerToolbar)
      console.log('Caller', this)
      console.log('Select \'crop\' to target', target)
      console.log('Button called', button);
      // Disables the toolbar's button except this one.
      (this as any).disableAllBut('vuoz:toolbar:crop')
    },
    onUp(target: any, button: any) {
      console.log('Caller', this)
      console.log('Deselect \'crop\' to target', target)
      console.log('Button called', button);
      // Resets toolbar's state.
      (this as any).resetState()
    }
  },
  {
    icon: 'aspect_ratio',
    label: 'Resize',
    rounded: true,
    name: 'vuoz:toolbar:resize',
    target: 'MyAwesomeComponent',
    onDown(target: any, button: any) {
      console.log('Caller', this)
      console.log('Select \'resize\' to target', target)
      console.log('Button called', button);
      (this as any).disable('vuoz:toolbar:resize')
    },
    onUp(target: any, button: any) {
      console.log('Caller', this)
      console.log('Deselect \'resize\' to target', target)
      console.log('Button called', button)
    }
  },
  {
    icon: 'rotate_right',
    label: 'Rotate right',
    rounded: true,
    name: 'vuoz:toolbar:rotate:right',
    target: 'MyAwesomeComponent',
    onUp(target: any, button: any) {
      console.log('Caller', this)
      console.log('Rotate right on mouse up to target', target)
      console.log('Button called', button)
    }
  },
  {
    icon: 'rotate_left',
    label: 'Rotate left',
    rounded: true,
    name: 'vuoz:toolbar:rotate:left',
    target: 'MyAwesomeComponent',
    onDown(target: any, button: any) {
      console.log('Caller', this)
      console.log('Rotate left on mouse down to target', target)
      console.log('Button called', button)
    }
  },
  {
    icon: 'save',
    label: 'Save',
    rounded: true,
    name: 'vuoz:toolbar:save',
    target: 'MyAwesomeComponent',
    onDown(target: any, button: any) {
      console.log('Caller', this)
      console.log('Save on mouse down to target', target)
      console.log('Button called', button)
    }
  },
]

  @Watch("sort", { immediate: true })
  private onSortChanged() {
    this.sortLines();
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
    return classes
  }

  private sortLines() {
    if (this.sort === "desc") {
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
    if (this.sort === "desc") {
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
    if (this.sort === "desc") {
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
}
</script>