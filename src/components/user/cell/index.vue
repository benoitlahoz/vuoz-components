<template lang="pug">
.flex-grow.is-flex-column.has-padding-sm
  // height: 3rem;
  .flex-grow.is-flex.align-center
    .is-flex.align-center.justify-center(:style="'border-radius: 50%; height: 25px; width: 25px; background:' + getRandomColor() + ';'") {{ firstname.charAt(0).toUpperCase() }}{{ lastname.charAt(0).toUpperCase() }}
    // vuoz-avatar(:editable="false", :src="avatar", :fullname="firstname + ' ' + lastname", size="25")
    .has-padding-left-sm {{ firstname }} 
      span.is-uppercase.has-text-bold {{ lastname }}
</template>
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
