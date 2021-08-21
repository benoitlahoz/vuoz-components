<template lang="pug">
.vuoz-user-cell
  // height: 3rem;
  .flex-grow.is-flex.align-center
    .vuoz-todo-avatar(:style="'background:' + getRandomColor() + ';'") {{ firstname.charAt(0).toUpperCase() }}{{ lastname.charAt(0).toUpperCase() }}
    // vuoz-avatar(:editable="false", :src="avatar", :fullname="firstname + ' ' + lastname", size="25")
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
  height: 100%

.vuoz-todo-avatar
  @extend .is-flex
  @extend .align-center
  @extend .justify-center
  border-radius: 50%
  height: 25px
  width: 25px

.vuoz-user-cell-name
  @extend .has-padding-left-sm
</style>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VuozAvatar from "@/components/avatar/index.vue";
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

  private getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
</script>
