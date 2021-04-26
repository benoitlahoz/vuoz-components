<template lang='pug'>
.is-flex-column.has-padding-sm.has-background-dark-grey 
  div(@mousedown="onMouseDown") Bla
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
/**
 * Vuoz standard button
 * @displayName VuozMenu
 */
@Component({
  name: "VuozMenu"
})
export default class VuozComponent extends Vue {
  /**
   * Properties
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
  @Prop({ type: String, default: "push" }) readonly type!:
    | "push"
    | "toggle"
    | "dropdown";
  @Prop({ type: String, default: "normal" }) readonly size!:
    | "tiny"
    | "small"
    | "normal"
    | "large";
  @Prop({ type: String, default: "free" }) readonly shape!:
    | "free"
    | "square"
    | "circle";
  @Prop({ type: String, default: "regular" }) readonly weight!: string;
  @Prop({ type: Boolean, default: false }) readonly rounded!: boolean;
  @Prop({ type: Boolean, default: true }) readonly border!: boolean;
  @Prop({ type: Boolean, default: false }) readonly uppercase!: boolean;
  @Prop({ type: Boolean, default: false }) readonly smallcaps!: boolean;
  @Prop({ type: String, default: "medium-grey" }) readonly color!: string;
  @Prop({ type: String, default: "danger" }) readonly toggle!: string;
  @Prop({ type: Boolean, default: false }) readonly toggled!: string;
  @Prop({ type: Boolean, default: false }) readonly shadow!: boolean;
  @Prop({ type: String, default: "close" }) readonly icon!: string;

  onMouseDown(event: any) {
    event.stopPropagation();
    // TODO
    this.$emit('select')
  }
}
</script>