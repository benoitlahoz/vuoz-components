<template lang='pug'>
.vuoz-avatar(ref="dropzone", @drop="onDrop", @dragover="onDragOver")
  .vuoz-avatar__container
    vuoz-cropper(
      v-if="img",
      ref="cropper",
      :src="img",
      stencil="circle",
      :showHandlers="false",
      :showToolbar="false",
      :options="options",
      cropperClass="vuoz-avatar-cropper",
      @change="onChange",
      style="background: transparent"
    )
    .vuoz-avatar__component(v-if="!img")
      vue-avatar-component(
        ref="avatar",
        :fullname="fullname",
        :size="size",
        :color="randomColor()"
      )
    input(
      ref="input",
      type="file",
      accept="image/*",
      visibility="hidden",
      style="display: none",
      @click="loadImage"
    )
  .vuoz-avatar__toolbar-container
    .vuoz-avatar__toolbar
      vuoz-toolbar(
        ref="toolbar",
        :items="img ? imgToolbar : initialsToolbar",
        position="left",
        size="tiny",
        shadow,
        vertical
      )
</template>
<style lang="sass">
@import "@vuoz/theme-core-default/dist/sass/theme"

\:root
  --vuoz-avatar__size: 200px

.vuoz-avatar
  position: relative
  &:hover
    .vuoz-avatar__toolbar
      visibility: visible
      .vuoz-toolbar
        pointer-events: all
  .vuoz-avatar__toolbar
    visibility: hidden

.vuoz-avatar__toolbar
  position: relative
  display: flex
  pointer-events: none
  width: 100%
  height: 100%

.vuoz-avatar__toolbar-container
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  pointer-events: none

.vuoz-avatar
  position: relative
  width: var(--vuoz-avatar__size)
  height: var(--vuoz-avatar__size)
  background: transparent

.vuoz-avatar__container
  width: 100%
  height: 100%
  clip-path: circle(50%)
  background: transparent

.vuoz-avatar-cropper
  width: var(--vuoz-avatar__size)
  height: var(--vuoz-avatar__size)

.vuoz-avatar__component
  @extend .is-unselectable
  position: absolute
  top: 0
  left: 0
  z-index: 1
  background: transparent
</style>
<script lang='ts'>
// TODO: See here for custom handlers: https://codesandbox.io/s/vue-advanced-cropper-desktop-without-theme-4pp9f?file=/src/App.vue
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VuozCropper from "@/components/cropper/index.vue";
import VueAvatarComponent from "vue-avatar-component";
import VuozToolbar from "@/components/toolbar/index.vue";
import { CropperOptions } from "@/components/cropper/types";
import html2canvas from "html2canvas";

/**
 * Vuoz animated loading icon.
 * @displayName VuozLoadingIcon
 */
@Component({
  name: "VuozAvatar",
  components: {
    VuozCropper,
    VueAvatarComponent,
    VuozToolbar,
  },
})
export default class VuozComponent extends Vue {
  @Prop({ type: String }) readonly fullname!: string;
  @Prop({ type: String }) readonly src!: string;
  @Prop({ type: Number, default: 200 }) readonly size!: number;

  private img: any;
  // Declarations
  private options: CropperOptions = {
    cropper: {
      autoZoom: true,
      defaultPosition: { left: 0, top: 0 },
      stencilSize: { width: 200, height: 200 },
      imageRestriction: "stencil",
      resizeImage: {
        adjustStencil: false,
      },
    },
    stencil: {
      movable: false,
      resizable: false,
      aspectRatio: 1,
    },
  };
  private initialsToolbar = [
    {
      icon: "palette",
      label: "Change Color",
      rounded: true,
      name: "vuoz:avatar:color:change",
      target: this,
      onDown(target: any) {
        (target as any).$forceUpdate();
      },
    },
  ];
  private imgToolbar = [
    {
      icon: "rotate_left",
      label: "Rotate left",
      rounded: true,
      name: "vuoz:cropper:rotate:left",
      target: this,
      onDown(target: any) {
        (target as any).rotate(-90);
      },
    },
    {
      icon: "rotate_right",
      label: "Rotate right",
      rounded: true,
      name: "vuoz:cropper:rotate:right",
      target: this,
      onDown(target: any) {
        (target as any).rotate(90);
      },
    },
    {
      icon: "flip",
      label: "Flip horizontal",
      rounded: true,
      name: "vuoz:toolbar:flip:horizontal",
      target: this,
      onDown(target: any) {
        (target as any).flip(true, false);
      },
    },
    {
      icon: "<div style='transform: rotate(-90deg);'>flip</span>",
      label: "Flip vertical",
      rounded: true,
      name: "vuoz:toolbar:flip:vertical",
      target: this,
      onDown(target: any) {
        (target as any).flip(false, true);
      },
    },
  ];

  @Watch("src", { immediate: true })
  private onSrcChange() {
    this.img = this.src;
    this.$forceUpdate();
  }

  @Watch("size", { immediate: true })
  private onSizeChange() {
    this.$nextTick(() => {
      const root = this.$refs.dropzone as HTMLElement;
      const cropper = this.$refs.cropper as any;
      const toolbar = this.$refs.toolbar as Vue;
      root.style.setProperty("--vuoz-avatar__size", `${this.size}px`);
      if (this.options.cropper) {
        this.options.cropper.stencilSize = {
          width: this.size,
          height: this.size,
        };
      }
      toolbar.$forceUpdate();
      if (cropper) {
        cropper.refresh();
      }
    });
  }

  private randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private loadImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    // Reference to the DOM input element
    const input = this.$refs.input as HTMLInputElement;
    // Ensure that you have a file before attempting to read it
    if (input.files && input.files[0]) {
      // create a new FileReader to read this image and convert to base64 format
      const reader = new FileReader();
      // Define a callback function to run, when FileReader finishes its job
      reader.onload = ((e: any) => {
        this.img = e.target.result;
        this.$forceUpdate();
      }).bind(this);
      // Start the reader job - read file as a data url (base64 format)
      reader.readAsDataURL(input.files[0]);
    }
  }

  public rotate(angle: number) {
    (this.$refs.cropper as any).rotate(angle);
  }

  public flip(horizontal: boolean, vertical: boolean) {
    (this.$refs.cropper as any).flip(horizontal, vertical);
  }

  private onDragOver(event: any) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
  }

  private onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files.length === 1) {
      const el = this.$refs.input as HTMLInputElement;
      el.files = event.dataTransfer.files;
      el.click();
    }
  }

  private onChange(event: any) {
    this.$emit("change", {
      coordinates: event.coordinates,
      canvas: event.canvas,
    });
  }

  public async getResult() {
    // Scales by the window.devicePixelRatio value (intended)
    let result;
    if (this.img) {
      result = this.resize();
    } else {
      const avatar = (this.$refs.avatar as Vue).$el as HTMLElement;
      const cropped = await html2canvas(avatar, {
        allowTaint: true,
        useCORS: true,
        removeContainer: true,
        backgroundColor: "rgba(0,0,0,0)",
        imageTimeout: 0,
        width: this.size,
        height: this.size,
      });
      result = {
        cropped,
        devicePixelRatio: window.devicePixelRatio,
        creationSize: this.size,
      };
    }
    return result;
  }

  public resize() {
    const result = (this.$refs.cropper as any).getResult();
    const scale = window.devicePixelRatio;
    const center = this.size * scale * 0.5;

    const cropped: HTMLCanvasElement = document.createElement("canvas");
    cropped.width = this.size * scale;
    cropped.height = this.size * scale;
    const ctx = cropped.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(
        center,
        center,
        center,
        (0 * Math.PI) / 180,
        (360 * Math.PI) / 180,
        false
      );
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(result.canvas, 0, 0, this.size * scale, this.size * scale);

      return {
        ...result,
        cropped,
        devicePixelRatio: scale,
        creationSize: this.size,
      };
    }

    return result.canvas;
  }
}
</script>