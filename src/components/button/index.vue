<template lang='pug'>
button.vuoz-button(
  :class="getClasses()",
  :key='size',
  @mouseenter='onMouseEnter',
  @mouseleave='onMouseLeave',
  @mousedown='onMouseDown',
  @mouseup='onMouseUp'
)
  .content(v-if="shape === 'free'", :class="{ 'is-hidden': load === true }")
    // @slot Icon left: TODO
    slot(name="left")
    // @slot Default button's text content
    slot(name="main") Click here
    // @slot Icon right: TODO
    slot(name="right") 
  // @slot Content for square and circle shapes
  slot(name="shaped", v-if="shape !== 'free' && !load") 
    span.material-icons {{ icon }}
  .loading-icon(v-if="load")
    slot(name="loader") 
      template(v-if="shape === 'free'")
        vuoz-loading-icon(name="ellipsis", :size="size")
      template(v-if="shape === 'square'")
        vuoz-loading-icon(name="grid", :size="size")
      template(v-if="shape === 'circle'")
        vuoz-loading-icon(name="spinner", :size="size")
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import VuozLoadingIcon from '../loading/icon/index.vue'
/**
 * Vuoz standard button
 * @displayName VuozButton
 */
@Component({
  name: 'VuozButton',
  components: {
    VuozLoadingIcon
  }
})
export default class VuozComponent extends Vue {
  /**
   * Properties
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean
  @Prop({ type: String, default: 'push' }) readonly type!: 'push' | 'toggle'
  @Prop({ type: String, default: 'normal' }) readonly size!: 'tiny' | 'small' | 'normal' | 'large'
  @Prop({ type: String, default: 'free' }) readonly shape!: 'free' | 'square' | 'circle'
  @Prop({ type: String, default: 'regular' }) readonly weight!: string
  @Prop({ type: Boolean, default: false }) readonly rounded!: boolean
  @Prop({ type: Boolean, default: true }) readonly border!: boolean
  @Prop({ type: Boolean, default: false }) readonly uppercase!: boolean
  @Prop({ type: Boolean, default: false }) readonly smallcaps!: boolean
  @Prop({ type: String, default: 'medium-grey' }) readonly color!: string
  @Prop({ type: String, default: 'danger' }) readonly toggle!: string // TODO
  @Prop({ type: Boolean, default: false }) readonly toggled!: string
  @Prop({ type: Boolean, default: false }) readonly shadow!: boolean
  @Prop({ type: String, default: 'close' }) readonly icon!: string
  /**
   * Internal component's data
   */
  private hovered = false
  private selected = false
  private disable = false
  private load = false
  /**
   * Initialization and tear-down
   */
  private mounted() {
    if (this.toggled) {
      this.selected = true
    }
    if (this.shape === 'free') {
      //
    }
  }
  private updated() {
    //
  }
  private beforeDestroy() {
    // 
  }

  public toggleLoad() {
    this.load = !this.load
  }

  @Watch('disabled', { immediate: true })
  onDisable() {
    this.disable = this.disabled
  } 

  @Watch('loading', { immediate: true })
  onload() {
    this.load = this.loading
  } 
  /**
   * Gets button's classes according to props' values.
   */
  private getClasses() {
    // Size
    let classes = `is-${this.size}`
    // Shape
    this.shape !== 'free' ? (classes += ` is-${this.shape}`) : ''
    // load
    this.load ? (classes += ` is-load`) : ''
    // Font weight
    classes += ` has-text-${this.weight}`
    // Rounded
    this.rounded && this.shape !== 'circle' ? (classes += ` is-rounded`) : ''
    // Uppercase
    this.uppercase ? (classes += ` is-uppercase`) : ''
    // Small caps
    this.smallcaps ? (classes += ` is-small-caps`) : ''
    // Background color
    if (this.type === 'toggle') {
      if (this.selected) {
        classes += ` has-background-${this.toggle}`
      } else {
        classes += ` has-background-${this.color}`
      }
      if (!this.disable && this.hovered) {
        this.selected
          ? (classes += ` has-background-${this.toggle}-shaded`)
          : (classes += ` has-background-${this.color}-shaded`)
        this.border
          ? this.selected
            ? (classes += ` has-border-${this.toggle}`)
            : (classes += ` has-border-${this.color}`)
          : (classes += ` has-border-none`)
      } else {
        this.border
          ? this.selected
            ? (classes += ` has-border-${this.toggle}-shaded`)
            : (classes += ` has-border-${this.color}-shaded`)
          : (classes += ` has-border-none`)
      }
    } else {
      classes += ` has-background-${this.color}`
      // Hovered but not selected
      if (!this.disable && this.hovered && !this.selected) {
        // Is hovered
        classes += ` has-background-${this.color}-shaded`
        this.border
          ? (classes += ` has-border-${this.color}`)
          : (classes += ` has-border-none`)
      } else {
        // Is not hovered
        this.border
          ? (classes += ` has-border-${this.color}-shaded`)
          : (classes += ` has-border-none`)
      }
    }
    // Shadow
    if (!this.disable) {
      this.shadow && !this.selected ? (classes += ` has-shadow`) : ''
    }
    // Disabled
    this.disable ? (classes += ` is-disabled`) : ''
    return classes
  }
  /**
   * Mouse events
   */
  onMouseEnter() {
    if (!this.load) {
      this.hovered = true
    }
  }
  onMouseLeave() {
    if (!this.load) {
      this.hovered = false
    }
  }
  onMouseDown() {

    if (!this.disable && !this.load) {
      if (this.type === 'toggle') {
        // Toggles or untoggles the button
        this.selected = !this.selected
      } else {
        this.selected = true
      }
      this.$emit('click', this.selected)
    }
  }
  onMouseUp() {
    if (this.type !== 'toggle' && !this.disable && !this.load) {
      this.selected = false
      this.$emit('click', this.selected)
    }
  }
}
</script>