<template lang='pug'>
.vuoz-toolbar__inner.has-background-medium-grey.is-rounded
  .vuoz-toolbar__inner-content
    .is-flex.align-center(v-for="item in items").has-padding-s
      vuoz-button(size="tiny", shape="square", color="warning", :icon="item.icon", rounded, border)
</template>
<style lang="sass">
.vuoz-toolbar__inner
  display: inline-block
  width: 4rem

.vuoz-toolbar__inner-content
  display: grid
  grid-template: repeat(4, 1fr) / repeat(2, 1fr)
  grid-auto-flow: row dense
</style>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import VuozButton from '../../button/index.vue'
/**
 * Vuoz components' inner toolbar.
 * @displayName VuozInnerToolbar
 */
@Component({
  name: 'VuozInnerToolbar',
  components: {
    VuozButton
  }
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, default: 'normal' }) readonly size!: 'timy' | 'small' | 'normal' | 'large'
  @Prop({ type: Array, default: () => [] }) readonly items!: any[]



}
</script>