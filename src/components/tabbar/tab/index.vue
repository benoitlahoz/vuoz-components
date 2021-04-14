<template lang="pug">
.vuoz-tab(
  :class="getClasses()"
  @mousedown="onSelect"
)
  .title {{ title }}
  .close(v-if="selected === true && closable === true", @click.stop="onClose")
    vuoz-button(
      type="push",
      size="tiny",
      shape="square",
      color="transparent",
    )
      template(v-slot:shaped)
        span.material-icons close
  .divider(v-if="!selected && divider")
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VuozButton from './../../button/index.vue'
/**
 * Vuoz standard tab
 * @displayName VuozTab
 */
@Component({
  name: "VuozTab",
  components: {
    VuozButton
  }
})
export default class VuozComponent extends Vue {
  /**
   * Properties
   */
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: String, default: 'small' }) readonly size!: string;
  @Prop({ type: [ String, Number ], required: true }) readonly id!: string | number;
  @Prop({ type: Boolean, default: false }) readonly selected!: boolean;
  @Prop({ type: Boolean, default: true }) readonly closable!: boolean;
  @Prop({ type: Boolean, default: true }) readonly divider!: boolean;
  /**
   * Internal component's data
   */

  /**
   * Initialization and tear-down
   */

  /**
   * Watchers
   */

  /**
   * Gets tab's classes according to props' values.
   */
  private getClasses() {
    // Size
    let classes = ``;
    this.selected ? classes += `is-selected` : ""
    return classes
  }

  /**
   * Events
   */
  onSelect() {
    this.$emit("select", this.id);
  }
  onClose() {
    this.$emit("close", this.id);
  }
}
</script>