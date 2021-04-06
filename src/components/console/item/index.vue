<template lang="pug">
tr(:class="getClasses('main')")
  td(v-if="date === true")
    .accessory-cell(:class="getClasses('time:content')") {{ getFormattedDate() }}
  td.flex-grow
    .has-text-regular(:class="getClasses('line:content')") {{ getContent() }}
  td(v-if="caller === true")
    .accessory-cell(v-if="line.caller", :class="getClasses('caller')") {{ line.caller }}
</template>
<script lang="ts">
/*eslint no-unreachable: "off"*/
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import { VuozFormatterMixin } from "../../../mixins/VuozFormatterMixin";

/**
 * Vuoz console item
 * @displayName VuozConsoleItem
 */
@Component({
  name: "VuozConsoleItem",
})
export default class VuozComponent extends Mixins(Vue, VuozFormatterMixin) {
  @Prop({ type: String, default: 'normal' }) readonly size!:
    "small"
    | "normal"
    | "large";
  @Prop({ type: String, default: "darker-grey" }) readonly color!: string;
  @Prop({ type: Object, required: true }) readonly line!: {
    date: Date;
    content: string | number | {} | [];
  };
  @Prop({ type: Boolean, default: true }) readonly caller!: string;
  @Prop({ type: Boolean, default: true }) readonly date!: string;
  @Prop({ type: Boolean, default: true }) readonly bordered!: string;
  @Prop({ type: String, default: "iso" }) readonly format!:
    | "raw"
    | "iso"
    | "readable"
    | "time"
    | "interval";

  private created() {
    //
  }

  private getClasses(type: string) {
    switch (type) {
      case "main": {
        return `item-height-${this.size} ${this.bordered ? 'has-border-bottom-medium-grey' : ''}`
        break
      }
      case "line:content": {
        switch (this.size) {
          case "small": {
            return "has-text-small has-padding-left-sm has-padding-right-sm";
          }
          case "normal": {
            return "has-text-normal has-padding-left-ms has-padding-right-ms";
          }
          case "large": {
            return "has-text-large has-padding-left-md has-padding-right-md";
          }
        }
        break;
      }
      case "time:content": {
        let classes = ``;
        switch (this.size) {
          case "small": {
            classes +=
              "has-text-mono-ultra-small has-padding-left-s has-padding-right-s has-padding-top-xxs has-padding-bottom-xxs has-margin-left-s" + ` time-line-height-${this.size}`;
            break;
          }
          case "normal": {
            classes +=
              "has-text-mono-small has-padding-left-sm has-padding-right-sm has-padding-top-xxs has-padding-bottom-xxs has-margin-left-sm" + ` time-line-height-${this.size}`;
            break;
          }
          case "large": {
            classes +=
              "has-text-mono-normal has-padding-left-ms has-padding-right-ms has-padding-top-xs has-padding-bottom-xs has-margin-left-ms" + ` time-line-height-${this.size}`;
            break;
          }
        }

        return classes;
      }
      case "caller": {
        let classes = ``;
        switch (this.size) {
          case "small": {
            classes +=
              "has-text-mono-ultra-small has-padding-left-s has-padding-right-s has-padding-top-xxs has-padding-bottom-xxs has-margin-right-s";
            break;
          }
          case "normal": {
            classes +=
              "has-text-mono-small has-padding-left-sm has-padding-right-sm has-padding-top-xxs has-padding-bottom-xxs has-margin-right-sm";
            break;
          }
          case "large": {
            classes +=
              "has-text-mono-normal has-padding-left-ms has-padding-right-ms has-padding-top-xs has-padding-bottom-xs has-margin-right-ms";
            break;
          }
        }

        return classes;
      }
    }
  }

  private getContent() {
    return this.line.content;
    // return JSON.stringify(this.line.content, null, '<br>')
  }

  private getFormattedDate() {
    switch (this.format) {
      case "readable": {
        return this.parseFullReadable(this.line.date);
        break;
      }
      case "time": {
        return this.parseTime(this.line.date);
        break;
      }
      case "interval": {
        const parent = this.$parent;
        const lines = (parent as any).lines;
        const index = lines.indexOf(this.line);
        const sort = (parent as any).sort;

        switch (sort) {
          case "asc": {
            let millis = 0;
            if (index - 1 >= 0) {
              const previous = lines[index - 1].date;
              millis = this.line.date.getTime() - previous.getTime();
            }
            return this.parseMilliseconds(millis);
            break;
          }
          case "desc": {
            let millis = 0;
            if (index + 1 < lines.length) {
              const previous = lines[index + 1].date;
              millis = this.line.date.getTime() - previous.getTime();
            }
            return this.parseMilliseconds(millis);
            break;
          }
        }
        break;
      }
      case "iso": {
        return this.line.date.toISOString();
        break;
      }
      default:
      case "raw": {
        return this.line.date.toString();
        break;
      }
    }
  }
}
</script>