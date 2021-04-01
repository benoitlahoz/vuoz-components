<template lang='pug'>
div(:class="getClass()")
  // Spinner needs 2 div
  div 
  div
  template(v-if="name === 'ellipsis' || name === 'grid'")
    // Ellipsis needs 3 div
    div
  template(v-if="name === 'grid'")
    // Grid needs 9 div
    div
    div
    div
    div
    div
    div
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
/**
 * Vuoz animated loading icon.
 * @displayName VuozLoadingIcon
 */
@Component({
  name: 'VuozLoadingIcon',
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, default: 'ellipsis' }) readonly name!: 'spinner' | 'ellipsis' | 'grid' 
  @Prop({ type: String, default: 'normal' }) readonly size!: 'timy' | 'small' | 'normal' | 'large'

  private getClass() {
    const classes = `vuoz-loader__${this.name} ` +
                    `is-${this.size}`

    return classes
  }
}
</script>