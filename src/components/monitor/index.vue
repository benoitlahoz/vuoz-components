<template lang="pug">
.is-fullsize(ref="container")
  canvas#monitor
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { fabric } from "fabric";
/**
 * Vuoz monitor view.
 * @displayName VuozMonitorView
 */
@Component({
  name: "VuozMonitorView",
})
export default class VuozComponent extends Vue {
  @Prop({ type: Boolean, default: false }) readonly debug!: boolean;

  private canvas!: fabric.Canvas;
  private width!: number;
  private height!: number;
  private interval: ReturnType<typeof setInterval> | null = null;
  private previous: { x: number; y: number } = { x: 0, y: 0 };
  private current: { x: number; y: number } = { x: 0, y: 0 };

  private mounted() {
    window.addEventListener("resize", this.onResize);
    // For Storybook
    const inFrame =
      (this.$refs.container as HTMLElement).ownerDocument !== document;
    // Get full container's size
    const container: HTMLElement = this.$refs.container as HTMLElement;
    // For Storybook iframe
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    if (inFrame && container.parentNode && container.parentNode.parentNode) {
      this.width = (container.parentNode.parentNode as Element).clientWidth;
      this.height = (container.parentNode.parentNode as Element).clientHeight;
    }
    // Creates new full size canvas
    this.canvas = new fabric.Canvas("monitor", {
      width: this.width, // * window.devicePixelRatio,
      height: this.height, // * window.devicePixelRatio,
      backgroundColor: "#fff",
      // To avoid highlighted bounding box
      selection: false,
      preserveObjectStacking: true,
      targetFindTolerance: 5,
      // @see https://stackoverflow.com/a/55614126/1060921
      fireRightClick: true, // <-- enable firing of right click events
      fireMiddleClick: true, // <-- enable firing of middle click events
      stopContextMenu: true,
    });
    // Make sure we start at the bottom of the canvas
    this.previous.y = this.height;
    if (this.debug) {
      // For debug mode, listen to mouse event
      (this.$refs.container as HTMLElement).addEventListener(
        "mousemove",
        this.onEvent
      );
    }
    this.monitor = this.monitor.bind(this);
    this.interval = setInterval(() => {
      this.monitor();
    }, 100);
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    // Always remove this listener, just in case we changed the 'debug' property
    (this.$refs.container as HTMLElement).addEventListener(
      "mousemove",
      this.onEvent
    );
  }

  private monitor() {
    const current = this.previous.x + 1;
    this.canvas.add(
      new fabric.Line(
        [this.previous.x, this.previous.y, current, this.current.y],
        {
          stroke: "black",
        }
      )
    );
    this.previous = {
      x: current,
      y: this.height,
    };
    this.current.y = this.height;
    this.canvas.renderAll();
  }

  private onEvent(event: any) {
    this.current.y = event.pageY;
  }

  private onResize() {
    // Get full container's size
    const container: HTMLElement = this.$refs.container as HTMLElement;
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    this.canvas.setWidth(this.width);
    this.canvas.setHeight(this.height);
    this.canvas.calcOffset();
    // Make sure we start at the bottom of the canvas
    this.previous.y = this.height;
  }
}
</script>