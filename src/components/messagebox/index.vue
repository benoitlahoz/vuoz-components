<template lang='pug'>
table(style="width: 100%;")
  tr(style="width: 100%; background: red;")
    td My message
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
/**
 * Vuoz animated loading icon.
 * @displayName VuozLoadingIcon
 */
@Component({
  name: 'VuozMessageBox',
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, default: 'normal' }) readonly size!: 'timy' | 'small' | 'normal' | 'large'

}
</script>