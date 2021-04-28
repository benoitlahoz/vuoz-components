<template lang="pug">
 .vuoz-tab-content.has-border-left-medium-grey
  component(v-if="component", :is="component.object", v-bind="component.props")
  div(v-if="!component") {{ content }}
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
/**
 * Vuoz tab system's main content of tab.
 * @displayName VuozTabContent
 */
@Component({
  name: "VuozTabContent",
})
export default class VuozComponent extends Vue {
  /**
   * Properties
   */
  @Prop({ type: Object }) readonly component!: string | null;
  @Prop({ type: String, default: 'No content' }) readonly content!: string | null ;
  /**
   * Internal component's data
   */

  /**
   * Initialization and tear-down
   */

  /**
   * Watchers
   */

}
</script>