<template lang="pug">
.vuoz-user-cell
  // height: 3rem;
  .flex-grow.is-flex.align-center 
    vuoz-avatar(:src="avatar", :fullname="firstname + ' ' + lastname", :size="25")
    .vuoz-user-cell-name {{ firstname }} 
      span.is-uppercase.has-text-bold {{ lastname }}
</template>
<style lang="sass">
// TODO: pass all this in theme-api defaults
@import "@vuoz/theme-core-default/dist/sass/theme.sass"

.vuoz-user-cell
  @extend .flex-grow
  @extend .is-flex-column
  @extend .has-padding-sm
  min-height: 100%

.vuoz-user-cell-name
  @extend .has-padding-left-sm
</style>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VuozAvatar from '@/components/avatar/index.vue'
/**
 * VuozUserCell for VuozTableRow.
 * @displayName VuozUserCell
 */
@Component({
  name: "VuozUserCell",
  components: {
    VuozAvatar,
  },
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, required: true }) readonly avatar!: string;
  @Prop({ type: String, required: true }) readonly firstname!: string;
  @Prop({ type: String, required: true }) readonly lastname!: string;

}
</script>