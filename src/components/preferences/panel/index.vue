<template lang='pug'>
.flex-grow.is-flex
  slot
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
/**
 * Vuoz panel for preferences window.
 * @displayName VuozPreferencesPanel
 */
@Component({
  name: "VuozPreferencesPanel"
})
export default class VuozComponent extends Vue {



}
</script>