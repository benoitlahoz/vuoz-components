import VuozAvatar from "./index.vue";
import VuozButton from "@/components/button/index.vue";
/**
 * Options example.
 */
const options = {
  stencil: {
    aspectRatio: 1,
    resizable: true,
    movable: true,
  },
  cropper: {
    autoZoom: true,
    checkOrientation: true,
    minWidth: 200,
    minHeight: 200,
    defaultPosition: { left: 80, top: 120 },
  },
};
/**
 * Story
 */
export default {
  component: VuozAvatar,
  title: "Components/Avatar",
  parameters: {
    layout: "fullscreen",
  },
  // Arguments (props) description
  argTypes: {
    editable: {
      description: "Make editable or not.",
      control: {
        type: "boolean",
      },
    },
    src: {
      description: "Path to the image.",
      control: {
        type: "select",
        options: ["", "images/IMG_0665.jpg", "images/IMG_3993.jpg"],
      },
    },
    fullname: {
      description: "The full name of the user (if no image is present.",
    },
    size: {
      description: "The size in pixels.",
      control: {
        type: "number",
      },
    },
  },
  // Arguments (props) defaults
  args: {
    editable: true,
    src: "images/IMG_0665.jpg",
    fullname: "Benoît LAHOZ",
    size: 200,
  },
};
/**
 * Template
 */
const template =
  `<div style="height: 600px; display:flex; align-items: center;" class="has-padding-sm is-flex">` +
  `<vuoz-avatar ref="avatar" ` +
  // Props
  `   :editable="editable" ` +
  `   :src="src" ` +
  `   :fullname="fullname" ` +
  `   :size="size" ` +
  `> ` +
  `</vuoz-avatar>` +
  `<div style="display: block; margin: 60px;">` +
  `<vuoz-button color="warning" size="small" shape="square" icon="arrow_forward_ios" rounded shadow uppercase border @click="getResult">` +
  `</vuoz-button>` +
  `</div>` +
  `<div style="display: block;">` +
  `<img ref="image" :src="img" />` +
  `</div>` +
  `</div>`;
// To be displayed by Storybook
export const Avatar = (args: any, { argTypes }: any) => ({
  components: { VuozAvatar, VuozButton },
  template,
  props: Object.keys(argTypes),
  data: () => {
    return {
      img: "",
    };
  },
  methods: {
    // Actual actions
    async getResult(down: boolean) {
      if (down) {
        const result = await (this as any).$refs.avatar.getResult();
        const img: string = result.cropped.toDataURL("image/png");
        (this as any).img = img;
      }
    },
  },
  argTypes,
});
