<template lang='pug'>
.vuoz-cropper
  cropper(
    ref="cropper",
    :src="img",
    :class="cropperClass",
    background-class="vuoz-cropper__background",
    area-class="vuoz-cropper__area",
    :auto-zoom="options && options.cropper && options.cropper.autoZoom ? options.cropper.autoZoom : false",
    :canvas="options && options.cropper && options.cropper.canvas ? options.cropper.canvas : true",
    :check-orientation="options && options.cropper && options.cropper.checkOrientation ? options.cropper.checkOrientation : false",
    :image-restriction="options && options.cropper && options.cropper.imageRestriction ? options.cropper.imageRestriction : 'fit-area'",
    :min-width="options && options.cropper && options.cropper.minWidth ? options.cropper.minWidth : undefined",
    :max-width="options && options.cropper && options.cropper.maxWidth ? options.cropper.maxWidth : undefined",
    :min-height="options && options.cropper && options.cropper.minHeight ? options.cropper.minHeight : undefined",
    :max-height="options && options.cropper && options.cropper.maxHeight ? options.cropper.maxHeight : undefined",
    :priority="options && options.cropper && options.cropper.priority ? options.cropper.priority : 'coordinates'",
    :stencil-size="options && options.cropper && options.cropper.stencilSize ? options.cropper.stencilSize : undefined",
    :default-position="options && options.cropper && options.cropper.defaultPosition ? options.cropper.defaultPosition : undefined",
    :default-size="options && options.cropper && options.cropper.defaultSize ? options.cropper.defaultSize : undefined",
    :default-boundaries="options && options.cropper && options.cropper.defaultBoundaries ? options.cropper.defaultBoundaries : undefined",
    :default-visible-area="options && options.cropper && options.cropper.defaultVisibleArea ? options.cropper.defaultVisibleArea : undefined",
    :stencil-component="stencilComponent",
    :stencil-props="options && options.stencil ? { ...options.stencil, handlers, handlersClasses, lines } : {}",
    @change="onChange"
  )
  vuoz-toolbar(
    v-if="showToolbar",
    :items="toolbarItems",
    type="fixed",
    position="bottom",
    size="small",
    color="dark-grey",
    border="medium-grey",
    :shadow="true",
    style="position: absolute; bottom: 0px; left: 0px; width: 100%"
  )
</template>
<style lang="sass">
@import "@vuoz/theme-core-default/dist/sass/theme"

$length: 16px

.vuoz-cropper__background,
.vuoz-cropper__area
  background: rgba(0, 0, 0, 0)

.vuoz-cropper 
  @extend .is-flex-column
  position: relative 
  background: transparent

.vuoz-cropper-line
  border-color: rgba(white, 0.8)

.vuoz-cropper-handler
  display: block
  opacity: 0.7
  position: relative
  flex-shrink: 0
  transition: opacity 0.5s
  border: none
  background: white
  top: auto
  left: auto
  height: 4px
  width: 4px

  &--west-north,
  &--east-south,
  &--west-south,
  &--east-north
    display: block
    height: $length
    width: $length
    background: none

  &--west-north
    border-left: solid 2px white
    border-top: solid 2px white
    top: $length / 2 - 1px
    left: $length / 2 - 1px

  &--east-south
    border-right: solid 2px white
    border-bottom: solid 2px white
    top: -$length / 2 + 1px
    left: -$length / 2 + 1px

  &--west-south
    border-left: solid 2px white
    border-bottom: solid 2px white
    top: -$length / 2 + 1px
    left: $length / 2 - 1px

  &--east-north
    border-right: solid 2px white
    border-top: solid 2px white
    top: $length / 2 - 1px
    left: -$length / 2 + 1px

  &--hover
    opacity: 1
</style>
<script lang='ts'>
// TODO: See here for custom handlers: https://codesandbox.io/s/vue-advanced-cropper-desktop-without-theme-4pp9f?file=/src/App.vue
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VuozToolbar from "@/components/toolbar/index.vue";
import { Cropper, CircleStencil, RectangleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { CropperOptions } from "./types";
import { buildToolbar } from "./toolbar";

/**
 * Vuoz animated loading icon.
 * @displayName VuozLoadingIcon
 */
@Component({
  name: "VuozCropper",
  components: {
    Cropper,
    CircleStencil,
    RectangleStencil,
    VuozToolbar,
  },
})
export default class VuozComponent extends Vue {
  @Prop({ type: String }) readonly cropperClass!: string;
  @Prop({ type: String, required: true }) readonly src!: string;
  @Prop({ type: String, default: "rectangle" }) readonly stencil!:
    | "rectangle"
    | "circle";
  @Prop({ type: Boolean, default: true }) readonly showHandlers!: boolean;
  @Prop({ type: Boolean, default: true }) readonly showToolbar!: boolean;
  @Prop({
    type: Object,
    default: () => {
      return {};
    },
  })
  readonly options!: CropperOptions;

  private toolbarItems = buildToolbar(this);
  private stencilComponent = RectangleStencil;
  private handlers = {
    eastNorth: true,
    north: true,
    westNorth: true,
    west: true,
    westSouth: true,
    south: true,
    eastSouth: true,
    east: true,
  };
  private handlersClasses = {
    default: "vuoz-cropper-handler",
    eastNorth: "vuoz-cropper-handler--east-north",
    westNorth: "vuoz-cropper-handler--west-north",
    eastSouth: "vuoz-cropper-handler--east-south",
    westSouth: "vuoz-cropper-handler--west-south",
  };
  private lines = {
    north: true,
    west: true,
    south: true,
    east: true,
  };

  private img: any = '';

  @Watch("src", { immediate: true })
  private onSrcChange() {
    this.$nextTick(() => {
      this.img = this.src;
    });
  }

  @Watch("stencil", { immediate: true })
  private onStencilChange() {
    switch (this.stencil) {
      case "rectangle": {
        this.stencilComponent = RectangleStencil;
        if (this.showHandlers) {
          this.lines = {
            north: true,
            west: true,
            south: true,
            east: true,
          };
        }
        break;
      }
      case "circle": {
        this.stencilComponent = CircleStencil;
        this.lines = {
          north: false,
          west: false,
          south: false,
          east: false,
        };
        break;
      }
    }
  }

  @Watch("showHandlers", { immediate: true })
  private onHandlersChange() {
    if (this.showHandlers === true) {
      if (this.stencil === "rectangle") {
        this.handlers = {
          eastNorth: true,
          north: true,
          westNorth: true,
          west: true,
          westSouth: true,
          south: true,
          eastSouth: true,
          east: true,
        };
        this.lines = {
          north: true,
          west: true,
          south: true,
          east: true,
        };
      } else {
        this.handlers = {
          eastNorth: false,
          north: true,
          westNorth: false,
          west: true,
          westSouth: false,
          south: true,
          eastSouth: false,
          east: true,
        };
      }
    } else {
      this.handlers = {
        eastNorth: false,
        north: false,
        westNorth: false,
        west: false,
        westSouth: false,
        south: false,
        eastSouth: false,
        east: false,
      };
      this.lines = {
        north: false,
        west: false,
        south: false,
        east: false,
      };
      // this.refresh();
    }
  }

  private onChange(event: any) {
    this.$emit("change", {
      coordinates: event.coordinates,
      canvas: event.canvas,
    });
  }

  public refresh() {
    (this.$refs.cropper as any).refresh();
  }

  public reset() {
    (this.$refs.cropper as any).reset();
  }

  public rotate(angle: number) {
    (this.$refs.cropper as any).rotate(angle);
  }

  public flip(horizontal: boolean, vertical: boolean) {
    (this.$refs.cropper as any).flip(horizontal, vertical);
  }

  public getResult() {
    return (this.$refs.cropper as any).getResult()
  }
}
</script>