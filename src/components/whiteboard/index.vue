<template lang="pug">
.flex-grow.is-flex-column(ref="container", style="width: 100%; height: 100%")
  vuoz-toolbar(
    :items="toolbarItems",
    type="fixed",
    position="top",
    size="small",
    color="dark-grey",
    border="medium-grey",
    :shadow="false",
    @click="onToolbar",
    @menu="onMenuSelect"
  )
  .is-flex.flex-grow
    canvas#whiteboard
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { fabric } from "fabric";
import { PSBrush, PSBrushIface, PSPoint } from "@arch-inc/fabricjs-psbrush";
// Toobar
import VuozToolbar from "@/components/toolbar/index.vue";
import { whiteBoardToolbarItems } from "./toolbar";

/**
 * Vuoz white board
 * @displayName VuozTitleBar
 */
@Component({
  name: "VuozWhiteBoard",
  components: {
    VuozToolbar,
  },
})
export default class VuozComponent extends Vue {
  @Prop({ type: String, default: "normal" }) readonly size!:
    | "tiny"
    | "small"
    | "normal";
  @Prop({ type: String, default: "dark-grey" }) readonly color!: string;
  @Prop({ type: String, default: "none" }) readonly border!: string;

  private canvas!: fabric.Canvas;
  private width!: number;
  private height!: number;
  private backgroundColor = "#fff";
  private brush!: PSBrushIface;
  private brushColor = "#000";
  // Flags
  private isDrawing = false;
  private mode: "select" | "draw" | "erase" = "draw";
  private previousMode: "select" | "draw" | "erase" = "draw";
  // Toolbar
  private toolbarItems = whiteBoardToolbarItems;
  // State
  private pressure = 0;
  // Objects
  private objects: any[] = [];

  private mounted() {
    // For Storybook
    // TODO: For Electron: ping/pong with resize event
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
    this.canvas = new fabric.Canvas("whiteboard", {
      width: this.width, // * window.devicePixelRatio,
      height: this.height, // * window.devicePixelRatio,
      backgroundColor: this.backgroundColor,
      // To avoid highlighted bounding box
      // selection: false,
      preserveObjectStacking: true,
      targetFindTolerance: 5,
      // @see https://stackoverflow.com/a/55614126/1060921
      fireRightClick: true, // <-- enable firing of right click events
      fireMiddleClick: true, // <-- enable firing of middle click events
      stopContextMenu: true,
      isDrawingMode: true,
      // @ts-expect-error
      enablePointerEvents: true,
    });
    // Brush handles pen, but not trackpad
    this.brush = new PSBrush(this.canvas);
    this.brush.width = 10;
    this.brush.color = this.brushColor;
    this.brush.simplifyHighestQuality = true;
    this.canvas.freeDrawingBrush = this.brush;

    this.canvas.on("mouse:down", this.onMouseDown);
    this.canvas.on("mouse:down:before", this.onMouseDownBefore);
    this.canvas.on("mouse:move", this.onMouseMove);
    this.canvas.on("mouse:up", this.onMouseUp);
  }

  private beforeDestroy() {
    this.canvas.off("mouse:down", this.onMouseDown);
    this.canvas.off("mouse:down:before", this.onMouseDownBefore);
    this.canvas.off("mouse:move", this.onMouseMove);
    this.canvas.off("mouse:up", this.onMouseUp);
  }

  @Watch("backgroundColor", { immediate: false })
  private onBackgroundColorChange() {
    this.canvas.backgroundColor = this.backgroundColor;
    this.canvas.renderAll();
  }

  @Watch("brushColor", { immediate: false })
  private onBrushColorChange() {
    this.brush.color = this.brushColor;
  }

  private getClasses() {
    const classes = `is-${this.size} has-background-${this.color} has-border-bottom-${this.border} `;
    return classes;
  }

  public toggleBrushPanel(toggle: boolean) {
    //
  }

  public toggleBackgroundPanel(toggle: boolean) {
    //
  }

  public clear() {
    this.canvas.clear();
    this.canvas.backgroundColor = this.backgroundColor;
    this.canvas.renderAll();
  }

  private onMouseDownBefore(event: any) {
    if (this.mode !== "select") {
      switch (event.e.buttons) {
        case 1: {
          // TODO: Main button on XP-Pen tablet, for others create a listener to configure at launch
          this.brush.color =
            this.mode === "draw" ? this.brushColor : this.backgroundColor;
          break;
        }
        case 32: {
          // TODO: mark objects as erased (so we can change their color when changing bg value)
          // Eraser button on XP Pen
          this.previousMode = this.mode;
          this.mode = "erase";
          this.brush.color = this.backgroundColor;
        }
      }
    }
  }

  private onMouseDown(event: any) {
    this.isDrawing = this.mode !== "select" ? true : false;
  }

  private onMouseUp(event: any) {
    this.mode = this.previousMode;
    this.isDrawing = false;
    this.brush.color =
      this.mode === "draw" ? this.brushColor : this.backgroundColor;
    // Get vectorized objects
    this.canvas.isDrawingMode = false;
    this.objects = this.canvas.getObjects();
    this.canvas.isDrawingMode = this.mode !== "select" ? true : false;
  }

  private onMouseMove(event: any) {
    if (this.isDrawing && this.mode !== "select") {
      this.pressure = event.e.pressure;
    }
  }

  private onResize() {
    this.$nextTick(() => {
      // Get full container's size
      const container: HTMLElement = this.$refs.container as HTMLElement;
      this.width = container.clientWidth;
      this.height = container.clientHeight;
      this.canvas.setWidth(this.width);
      this.canvas.setHeight(this.height);
      this.canvas.calcOffset();
    });
  }

  private onToolbar(name: string, toggle: boolean) {
    switch (name) {
      case "vuoz:whiteboard:select": {
        if (toggle) {
          this.mode = "select";
          this.previousMode = "select";
          this.canvas.isDrawingMode = false;
        }
        break;
      }
      case "vuoz:whiteboard:draw": {
        if (toggle) {
          this.mode = "draw";
          this.previousMode = "draw";
          this.canvas.isDrawingMode = toggle;
          this.brush.color = this.brushColor;
        }
        break;
      }
      case "vuoz:whiteboard:erase": {
        if (toggle) {
          this.mode = "erase";
          this.previousMode = "erase";
          this.canvas.isDrawingMode = toggle;
          this.brush.color = this.backgroundColor;
        }
        break;
      }
    }
  }

  private onMenuSelect(event: any) {
    switch (event.type) {
      case "brush:color": {
        this.brushColor = event.value;
        break;
      }
      case "brush:size": {
        this.brush.width = event.value;
        break;
      }
      case "background:color": {
        this.backgroundColor = event.value;
        break;
      }
    }
  }
}
</script>