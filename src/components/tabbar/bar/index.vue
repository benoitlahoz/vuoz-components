<template lang="pug">
.vuoz-tab-bar(:class="getClasses()")
  .vuoz-tabs-container
    draggable(
      :value="tabs",
      delayOnTouchOnly="true",
      draggable=".vuoz-tab",
      :options="options",
      @start="onStartDrag",
      @end="onEndDrag"
    ).draggable
      template(v-for="(tab, index) in tabs")
        vuoz-tab(
          :key="tab.id",
          :title="tab.title",
          :id="tab.id",
          :selected="selected === tab.id",
          :divider="(selected !== tab.id && tabs[index + 1] !== undefined && tabs[index + 1].id !== selected) || (selected !== tab.id && index === tabs.length - 1)",
          @select="onSelect",
          @close="onClose"
        )
    .plus-button.not-draggable
      vuoz-button(
        type="push",
        :size="getButtonSize()",
        :border="false",
        shape="circle",
        color="transparent",
        @click="onAddTab"
      )
        template(v-slot:shaped)
          span.material-icons add
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Draggable from "vuedraggable";
import VuozTab from "./../tab/index.vue";
import VuozButton from "./../../button/index.vue";
/**
 * Vuoz standard button
 * @displayName VuozButton
 */
@Component({
  name: "VuozTabBar",
  components: {
    Draggable,
    VuozTab,
    VuozButton,
  },
})
export default class VuozComponent extends Vue {
  /**
   * Properties
   */
  @Prop({ type: String, default: "normal" }) readonly size!: string;
  @Prop({ type: Array, default: [] }) readonly tabs!: object;
  @Prop({ type: Number, default: 0 }) readonly selected!: number;
  /**
   * Internal component's data
   */
  options = {
    draggable: '.vuoz-tab',
    filter: '.not-draggable'
  }
  /**
   * Initialization and tear-down
   */

  /**
   * Gets tab bar's classes according to props' values.
   */
  private getClasses() {
    // Size
    let classes = `is-${this.size}`;
    classes += ``;
    return classes;
  }
  private getButtonSize() {
    let size = "tiny";
    switch (this.size) {
      case "small":
        {
          size = "tiny";
        }
        break;
      case "normal":
        {
          size = "small";
        }
        break;
      case "large":
        {
          size = "normal";
        }
        break;
    }
    return size;
  }
  /**
   * Events
   */
  onSelect(id: string | number) {
    this.$emit("select", id);
  }
  onClose(id: string | number) {
    this.$emit("close", id);
  }
  onAddTab() {
    this.$emit("addtab");
  }
  onStartDrag(e: { originalEvent: DragEvent }) {
    console.log(e)
  }
  onEndDrag(e: { oldIndex: number; newIndex: number }) {
    const oldIndex = e.oldIndex;
    const newIndex = e.newIndex;
    this.$emit("dragged", {
      oldIndex,
      newIndex,
    });
  }
}
</script>