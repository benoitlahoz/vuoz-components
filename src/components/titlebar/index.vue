<template lang="pug">
.vuoz-title-bar(:class="getClasses()") {{ title }}
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

/**
 * Vuoz title bar for Electron
 * @displayName VuozTitleBar
 */
@Component({
  name: 'VuozTitleBar'
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, default: "normal" }) readonly size!: "tiny" | "small" | "normal";
  @Prop({ type: String, default: "dark-grey" }) readonly color!: string;
  @Prop({ type: String, default: "none" }) readonly border!: string;
  @Prop({ type: String, default: "Untitled" }) readonly title!: string;

  private getClasses() {
    const classes = `is-${this.size} has-background-${this.color} has-border-bottom-${this.border} `
    return classes
  }

}
</script>