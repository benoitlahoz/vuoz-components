<template lang="pug">
.vuoz-tabs.has-background-darker-grey
  vuoz-tab-bar(
    :size="size",
    :tabs="tabs",
    :selected="selected",
    @select="onSelect",
    @close="onClose",
    @addtab="onAddTab",
    @dragged="onTabDragged"
  )
  vuoz-tab-content(
    :selected="selected",
    :component="getComponent()",
    :content="getContent()"
  )
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VuozTabBar from "./../bar/index.vue";
import VuozTabContent from "./../content/index.vue";
/**
 * Types
 */
interface TabDescription {
    id: number | string;
    title: string;
    content: string | undefined;
    component: string | undefined;
  }
/**
 * Vuoz tabs VuozTabs
 * @displayName VuozButton
 */
@Component({
  name: "VuozTabs",
  components: {
    VuozTabBar,
    VuozTabContent,
  },
})
export default class VuozComponent extends Vue {
  /**
   * Properties
   */
  @Prop({ type: String, default: "normal" }) readonly size!: string;
  @Prop({ type: Array, default: [] }) readonly tabs!: TabDescription[];
  @Prop({ type: String, default: "No tab" }) readonly placeholder!: string;
  /**
   * Internal component's data
   */
  private selected: string | number = -1;
  /**
   * Initialization and tear-down
   */
  created() {
    if (this.tabs.length > 0) {
      this.selected = this.tabs[0].id;
    }
  }
  /**
   * Get data from tabs array
   */
  getComponent() {
    if (this.tabs.length > 0) {
      const tab = this.tabs.find((t) => t.id === this.selected);
      // Tab may be undefined before Vue re-render the component after tab close
      return tab !== undefined ? tab.component : null;
    }
    return null;
  }
  getContent() {
    if (this.tabs.length > 0) {
      const tab = this.tabs.find((t) => t.id === this.selected);
      // Tab may be undefined before Vue re-render the component after tab close
      return tab !== undefined ? tab.content : null;
    }
    return this.placeholder;
  }
  /**
   * Events
   */
  onSelect(id: string | number) {
    this.selected = id;
    this.$emit("select", id);
  }
  onClose(id: string | number) {
    if (this.selected === id) {
      // Change selection
      const tab = this.tabs.find((t) => t.id === id);
      if (tab === undefined) {
        throw new TypeError("No corresponding tab to close.");
      }
      const index = this.tabs.indexOf(tab);
      if (index > 0) {
        // Select previous tab
        this.selected = this.tabs[index - 1].id;
      } else if (this.tabs.length > 1) {
        // Select next tab
        this.selected = this.tabs[index + 1].id;
      }
    }
    this.$emit("close", id);
  }
  onAddTab() {
    this.$emit("addtab");
    this.$nextTick(() => {
      // Select last tab at next tick
      this.selected = this.tabs[this.tabs.length - 1].id
    })
  }
  onTabDragged(e: {
    oldIndex: number;
    newIndex: number;
  }) {
    this.$emit("dragged", e)
  }
}
</script>