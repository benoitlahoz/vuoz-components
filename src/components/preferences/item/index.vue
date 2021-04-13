<template lang='pug'>
.is-flex.align-center.is-small(style="justify-contet: flex-start;")
  div.material-icons.has-padding-left-sm.has-padding-left-sm {{ icon }}
  div.has-padding-left-sm.has-padding-right-sm {{ title }}
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
/**
 * Vuoz table item for preferences window.
 * @displayName VuozPreferencesItem
 */
@Component({
  name: "VuozPreferencesItem"
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, default: 'error' }) icon!: string
  @Prop({ type: String, required: true }) title!: string

}
</script>