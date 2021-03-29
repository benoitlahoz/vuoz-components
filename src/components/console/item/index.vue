<template lang="pug">
div(:class="getClasses()") {{ line.content }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

/**
 * Vuoz console item
 * @displayName VuozConsoleItem
 */
@Component({
  name: 'VuozConsoleItem'
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, default: 'darker-grey' }) readonly color!: string
  @Prop({ type: Object, required: true }) readonly line!: string

  private created() {
    //
  }

  private getClasses() {
    //
  }

}
</script>