<template lang='pug'>
.vuoz-color-menu
  h3.has-border-bottom-dark-grey.has-padding-bottom-sm Brush
  v-swatches(v-model="brushColor", inline, show-fallback, fallback-input-type="color", background-color="rgba(0, 0, 0, 0)", show-border, swatch-size="30", :spacing-size="7", shapes="circles", fallback-input-class="vuoz-color-menu-fallback")
  .has-border-top-dark-grey.has-margin-top-sm.has-padding-top-sm.is-flex.flex-grow.align-center(style="justify-content: space-between")
    div Size (px) 
    vuoz-input(type='uinteger', color="dark-grey", :initial="brushSize", rounded, @change="onSizeChange")
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'
import VuozInput from '@/components/input/index.vue'
/**
 * Vuoz standard button
 * @displayName VuozBrushMenu
 */
@Component({
  name: "VuozBrushMenu",
  components: {
    VSwatches,
    VuozInput
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

  private brushColor = '#000'
  private brushSize = "2"

  @Watch('brushColor', { immediate: true })
  private onBrushColorChange() {
    this.$emit('select', {
      type: 'brush:color',
      value: this.brushColor
    })
  }

  private onSizeChange(event: any) {
    this.$emit('select', {
      type: 'brush:size',
      value: parseInt(event.value)
    })
  }
}
</script>