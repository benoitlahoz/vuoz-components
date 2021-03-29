<template lang="pug">
.is-flex-column
  .is-flex Toolbar
  .is-flex-column
    template(v-for="(line, index) in lines")
      vuoz-console-item(:line="line")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VuozConsoleItem from '../item/index.vue'

/**
 * Vuoz console
 * @displayName VuozConsole
 */
@Component({
  name: 'VuozConsole',
  components: {
    VuozConsoleItem
  }
})
export default class VuozComponent extends Vue {

  @Prop({ type: Array, default: () => [] }) readonly lines!: any[]

  private created() {
    //
  }

  private mounted() {
    console.log('CONSEOLE MOUNTED')
  }

  private updated() {
    //
  }

  private beforeDestroy() {
    console.log('CONSEOLE WIL BE DESTROYED')
  }

}
</script>