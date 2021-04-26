<template lang='pug'>
.is-flex-column.has-padding-sm.has-padding-left-ms.has-background-medium-grey(style="width: 296px;")
  v-swatches(v-model="backgroundColor", inline, show-fallback, fallback-input-type="color", background-color="rgba(0, 0, 0, 0)", show-border, swatch-size="30", :spacing-size="7", shapes="circles", fallback-input-class="vuoz-color-menu-fallback")
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'
/**
 * Vuoz standard button
 * @displayName VuozBrushMenu
 */
@Component({
  name: "VuozBackgroundMenu",
  components: {
    VSwatches
  }
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

  private backgroundColor = '#fff'

  @Watch('backgroundColor', { immediate: true })
  private onBackgroundColorChange() {
    this.$emit('select', {
      type: 'background:color',
      value: this.backgroundColor
    })
  }
}
</script>