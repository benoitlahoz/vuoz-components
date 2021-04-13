<template lang="pug">
.flex-grow.is-flex-column.has-background-medium-grey(style="min-height: 100%; height: 5rem;")
  .flex-grow.is-flex.align-center 
    div 
      div Example with property: {{ example }}
      span(v-if="example === true").material-icons add
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
/**
 * Example component for VuozTableRow.
 * @displayName ExampleComponent
 */
@Component({
  name: "ExampleComponent",
})
export default class VuozComponent extends Vue {

  @Prop({ type: Boolean, default: false }) readonly example!: string;

}
</script>