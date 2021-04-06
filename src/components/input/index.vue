<template lang="pug">
.vuoz-input(:class="getClasses('container')")
  .vuoz-input__label(v-if="label.trim() !== ''") {{ label }}
  .vuoz-input__main(:class="getClasses('main')")
    .required-placeholder(v-if="required === true", style="background-color: red; width: 20px; height: 100%;")
    input(:type="getInputType()", :placeholder="placeholder", :class="getClasses('input')").has-text-regular
    span.material-icons(v-if="icon.trim() !== ''") {{ icon }}
</template>
<style lang="sass">
// TODO: pass in theme-api
@import "@vuoz/theme-core-default/dist/sass/theme.sass"

.vuoz-input,
.vuoz-input__main
  @extend .is-inline-flex
  @extend .align-center
  &.is-tiny 
    height: $tiny-height
    @extend .has-padding-left-s
    @extend .has-padding-right-xs
    input
      @extend .has-text-ultra-small
      @extend .has-margin-right-xs
      line-height: $tiny-height
  &.is-small 
    height: $small-height
    @extend .has-padding-left-sm
    @extend .has-padding-right-s
    input
      @extend .has-text-small
      @extend .has-margin-right-s
      line-height: $small-height
  &.is-normal 
    height: $normal-height
    @extend .has-padding-left-ms
    @extend .has-padding-right-sm
    input
      @extend .has-text-normal
      @extend .has-margin-right-sm
      line-height: $normal-height
  &.is-large 
    height: $large-height
    @extend .has-padding-left-md
    @extend .has-padding-right-sm
    input
      @extend .has-text-large
      @extend .has-margin-right-sm
      line-height: $large-height

.vuoz-input .vuoz-input__label
  @extend .is-inline-flex
  @extend .align-center

.vuoz-input 
  &.is-tiny .vuoz-input__label
    height: $tiny-height
    @extend .has-text-ultra-small
    @extend .has-margin-right-ms
  &.is-small .vuoz-input__label
    height: $small-height
    @extend .has-text-small
    @extend .has-margin-right-md
  &.is-normal .vuoz-input__label
    height: $normal-height
    @extend .has-text-normal
    @extend .has-margin-right-md
  &.is-large .vuoz-input__label
    height: $large-height
    @extend .has-text-large
    @extend .has-margin-right-md

.vuoz-input input
  color: white
  border: none
  outline: none
  background-color: transparent
</style>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
/**
 * Vuoz input.
 * @displayName VuozInput
 */
@Component({
  name: "VuozInput",
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, default: 'text' }) readonly type!: 'text' | 'email' | 'password' | 'integer' | 'float'
  @Prop({ type: String, default: '' }) readonly label!: string
  @Prop({ type: String, default: "top" }) readonly labelPosition!:
    "top"
    | "left"
    | "bottom"
    | "right";
  @Prop({ type: String, default: '' }) readonly placeholder!: string
  @Prop({ type: Boolean, default: false }) readonly required!: boolean
  @Prop({ type: String, default: 'small' }) readonly size!: 'tiny' | 'small' | 'normal' | 'large'
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean
  @Prop({ type: String, default: 'regular' }) readonly weight!: string
  @Prop({ type: Boolean, default: false }) readonly rounded!: boolean
  @Prop({ type: Boolean, default: true }) readonly border!: boolean
  @Prop({ type: Boolean, default: false }) readonly uppercase!: boolean
  @Prop({ type: Boolean, default: false }) readonly smallcaps!: boolean
  @Prop({ type: String, default: 'medium-grey' }) readonly color!: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'darker-grey' | 'dark-grey' | 'medium-grey' | 'transparent'
  @Prop({ type: Boolean, default: false }) readonly shadow!: boolean
  @Prop({ type: String, default: '' }) readonly icon!: string

  private getInputType() {
    switch(this.type) {
      case 'text':
      case 'integer':
      case 'float': {
        return 'text'
      }
      case 'email':
      case 'password': {
        return this.type
      }
    }
  }

  private getClasses(type: string) {
    let classes = ''
    switch(type) {
      case 'container': {
        classes += `is-${this.size} `
        break
      }
      case 'main': {
        classes += `is-${this.size} has-background-${this.color} has-border-${this.color}-shaded `
        classes += this.border ? `has-border-${this.color}-shaded ` : 'has-border-none '
        if (this.rounded) {
          classes += 'is-rounded '
        }
        if (this.uppercase) {
          classes += 'is-uppercase '
        }
        if (this.shadow) {
          classes += 'has-shadow '
        }
        break
      }
      case 'input': {
        if (this.uppercase) {
          classes += 'is-uppercase '
        }
        if (this.smallcaps) {
          classes += 'is-small-caps '
        }
        break
      }
    }
    return classes
  }

}
</script>