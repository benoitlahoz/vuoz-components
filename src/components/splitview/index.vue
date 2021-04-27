<template lang='pug'>
.vuoz-split-view__container(
  ref="container",
  :class="{ 'is-vertical': direction === 'vertical', 'is-horizontal': direction === 'horizontal', dragging: dragging === true }",
  @mousemove="onMouseMove",
  @mouseup="onMouseUp"
)
  .vuoz-split-view__view.is-flex.flex-grow(
    ref="first",
    style="position: relative"
  )
    div(style="width: 100%; height: 100%;")
      slot(name="first") First
  .vuoz-split-view__view.is-flex.flex-grow(
    ref="second",
    style="position: relative"
  )
    div(style="width: 100%; height: 100%;")
      slot(name="second") Second
  .vuoz-split-view__separator(
    ref="separator",
    :class="{ 'is-vertical': direction === 'vertical', 'is-horizontal': direction === 'horizontal', hovered: hovered === true || dragging === true }",
    @mousedown="onSeparatorMouseDown",
    @mouseover="onToggleOver(true)",
    @mouseout="onToggleOver(false)",
    @mouseup="onMouseUp"
  )
    .vuoz-split-view__separator-displayed(
      ref="displayed",
      @mousedown="onSeparatorMouseDown",
      @mouseup="onMouseUp"
    )
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
/**
 * Vuoz split view.
 * @displayName VuozSplitView
 */
@Component({
  name: "VuozSplitView",
})
export default class VuozComponent extends Vue {
  @Prop({ type: String, default: "vertical" }) readonly direction!:
    | "vertical"
    | "horizontal";
  @Prop({ type: Number, default: 21 }) readonly activeSize!: number;
  @Prop({
    type: Object,
    default: () => {
      return { min: 0, max: 100 };
    },
  })
  readonly settings!: {
    min: number;
    max: number;
  };

  private hovered = false;
  private dragging = false;
  private limits = {
    min: 0,
    max: 100,
  };

  @Watch("direction", { immediate: true })
  onDirectionChanged() {
    this.$nextTick(() => {
      this.setup();
    });
  }

  @Watch("activeSize", { immediate: true })
  onActiveSizeChanged() {
    this.$nextTick(() => {
      this.setup();
    });
  }

  @Watch("settings", { immediate: true })
  onSettingsChanged() {
    this.$nextTick(() => {
      this.setup();
    });
  }

  private created() {
    window.addEventListener("resize", this.setup);
  }

  private beforeDestroy() {
    window.removeEventListener("resize", this.setup);
  }

  private onToggleOver(value: boolean) {
    this.hovered = value;
  }

  private onSeparatorMouseDown(event: MouseEvent) {
    if (event.button === 0) {
      this.dragging = true;
      // Make items unselectable
      const first = this.$refs.first as HTMLElement;
      const second = this.$refs.second as HTMLElement;

      first.classList.add("vuoz-split-view__unselectable");
      second.classList.add("vuoz-split-view__unselectable");
    }
  }

  private onMouseUp() {
    if (this.dragging) {
      this.dragging = false;
      // Make items selectable again
      const container = this.$refs.container as HTMLElement;
      const first = this.$refs.first as HTMLElement;
      const second = this.$refs.second as HTMLElement;

      first.classList.remove("vuoz-split-view__unselectable");
      second.classList.remove("vuoz-split-view__unselectable");

      // Emit event
      let pixels;
      let percents;
      switch (this.direction) {
        case "vertical": {
          pixels = first.clientWidth;
          percents = (pixels / container.clientWidth) * 100;
          break;
        }
        case "horizontal": {
          pixels = first.clientHeight;
          percents = (pixels / container.clientHeight) * 100;
          break;
        }
      }
      this.$emit("change", {
        pixels,
        percents,
      });
    }
  }

  private onMouseMove(event: MouseEvent) {
    if (this.dragging) {
      const container = this.$refs.container as HTMLElement;
      switch (this.direction) {
        case "vertical": {
          const left = (event.clientX / container.clientWidth) * 100;
          if (left > this.limits.min && left < this.limits.max) {
            const right = 100 - left;
            this.setSeparatorPosition(event.clientX - this.activeSize / 2);
            this.setItemsPosition("width", left, right);
          }
          break;
        }
        case "horizontal": {
          const top = (event.clientY / container.clientHeight) * 100;
          if (top > this.limits.min && top < this.limits.max) {
            const bottom = 100 - top;
            this.setSeparatorPosition(event.clientY - this.activeSize / 2);
            this.setItemsPosition("height", top, bottom);
          }
          break;
        }
      }
    }
  }

  private setup() {
    this.parseSettings();

    const separator = this.$refs.separator as HTMLElement;
    const first = this.$refs.first as HTMLElement;
    const second = this.$refs.second as HTMLElement;

    // Remove all properties (in case we pass from a ddirection to another)
    first.style.removeProperty("min-width");
    first.style.removeProperty("max-width");
    first.style.removeProperty("width");
    first.style.removeProperty("min-height");
    first.style.removeProperty("max-height");
    first.style.removeProperty("height");

    second.style.removeProperty("min-width");
    second.style.removeProperty("max-width");
    second.style.removeProperty("width");
    second.style.removeProperty("min-height");
    second.style.removeProperty("max-height");
    second.style.removeProperty("height");

    // 'first' item has priority
    const firstMedium =
      this.limits.min + (this.limits.max - this.limits.min) / 2;

    let separatorPosition;
    switch (this.direction) {
      case "vertical": {
        this.setItemsPosition("width", firstMedium, 100 - firstMedium);

        this.$nextTick(() => {
          const element = this.$refs.first as HTMLElement;

          separatorPosition = element.clientWidth - this.activeSize / 2;
          separator.style.setProperty("width", `${this.activeSize}px`);
          separator.style.setProperty("height", "100%");
          separator.style.setProperty("cursor", "col-resize");

          first.style.setProperty(`min-width`, `${this.limits.min}%`);
          first.style.setProperty(`max-width`, `${this.limits.max}%`);
          first.style.setProperty("height", "100%");

          second.style.setProperty("height", "100%");

          this.setSeparatorPosition(separatorPosition);
        });

        break;
      }
      case "horizontal": {
        this.setItemsPosition("height", firstMedium, 100 - firstMedium);

        this.$nextTick(() => {
          const element = this.$refs.first as HTMLElement;

          separatorPosition = element.clientHeight - this.activeSize / 2;
          separator.style.setProperty("height", `${this.activeSize}px`);
          separator.style.setProperty("width", "100%");
          separator.style.setProperty("cursor", "row-resize");

          first.style.setProperty(`min-height`, `${this.limits.min}%`);
          first.style.setProperty(`max-height`, `${this.limits.max}%`);
          first.style.setProperty("width", "100%");

          second.style.setProperty("width", "100%");

          this.setSeparatorPosition(separatorPosition);
        });

        break;
      }
    }
  }

  private setItemsPosition(
    property: "width" | "height",
    firstPos: number,
    secondPos: number
  ) {
    const first = this.$refs.first as HTMLElement;
    const second = this.$refs.second as HTMLElement;
    first.style.setProperty(property, `${firstPos}%`);
    second.style.setProperty(property, `${secondPos}%`);
  }

  private setSeparatorPosition(value: number) {
    const separator = this.$refs.separator as HTMLElement;
    const displayed = this.$refs.displayed as HTMLElement;

    switch (this.direction) {
      case "vertical": {
        separator.style.setProperty("left", `${value}px`);
        separator.style.setProperty("top", "0");
        separator.style.setProperty("height", "100%");

        displayed.style.setProperty("left", `${this.activeSize / 2 - 1}px`);
        displayed.style.setProperty("top", "0");

        break;
      }
      case "horizontal": {
        separator.style.setProperty("top", `${value}px`);
        separator.style.setProperty("left", "0");
        separator.style.setProperty("width", "100%");

        displayed.style.setProperty("top", `${this.activeSize / 2 - 1}px`);
        displayed.style.setProperty("left", "0");

        break;
      }
    }
  }

  private parseSettings() {
    this.limits.min = this.settings.min || 0;
    this.limits.max = this.settings.max || 100;
  }
}
</script>