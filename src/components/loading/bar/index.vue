<template lang='pug'>
.vuoz-loading__bar.is-fullwidth.has-background-medium-grey(:class="`is-${size}`")
  .vuoz-loading__bar-progress(ref="progress", :class="`is-${size}`")
</template>
<style lang="sass" scoped>
\:root
  --vuoz-progress__bar: 0%

.vuoz-loading__bar
  display: flex
  justify-content: flex-start
  align-items: center
  position: relative

.vuoz-loading__bar-progress
  background: white
  width: var(--vuoz-progress__bar)

.vuoz-loading__bar,
.vuoz-loading__bar-progress
  &.is-tiny
    border-radius: 0.1rem
    height: 0.2rem
    min-height: 0.2rem
    max-height: 0.2rem
  &.is-small
    border-radius: 0.15rem
    height: 0.3rem
    min-height: 0.3rem
    max-height: 0.3rem
  &.is-normal
    border-radius: 0.25rem
    height: 0.5rem
    min-height: 0.5rem
    max-height: 0.5rem
  &.is-large
    border-radius: 0.325rem
    height: 0.65rem
    min-height: 0.65rem
    max-height: 0.65rem
</style>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
/**
 * Vuoz animated loading bar.
 * @displayName VuozLoadingBar
 */
@Component({
  name: "VuozLoadingBar",
})
export default class VuozComponent extends Vue {
  @Prop({ type: String, default: "normal" }) readonly size!: 'tiny' | 'small' | 'normal' | 'large';
  @Prop({ type: Number, required: true }) readonly progress!: number;

  @Watch('progress')
  private onProgressChange() {
    (this.$refs.progress as HTMLElement).style.setProperty('--vuoz-progress__bar', `${Math.ceil(this.progress * 100)}%`)
  }
}
</script>