<template lang="pug">
.is-fullsize.is-flex-column
  .flex-grow.is-flex.center
    vuoz-image(v-if="logo", :path="logo")
  .flex-grow.is-flex Blo
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VuozImage from '../image/index.vue'

/**
 * Vuoz splash screen
 * @displayName VuozSplash
 */
@Component({
  name: 'VuozSplash',
  components: {
    VuozImage
  }
})
export default class VuozComponent extends Vue {

  @Prop({ type: String }) readonly logo?: string

  created() {
    //
  }

}
</script>