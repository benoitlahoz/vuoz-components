import VuozCropper from './index.vue'
import './story.style.css'
/**
 * Options example.
 */
const options = {
  stencil: {
    aspectRatio: 1,
    resizable: true,
    movable: true
  },
  cropper: {
    autoZoom: true,
    checkOrientation: true,
    minWidth: 200,
    minHeight: 200,
    defaultPosition: { left: 80, top: 120 },
  }
};
/**
 * Story
 */
export default {
  component: VuozCropper,
  title: 'Components/Cropper',
  parameters: {
    layout: 'fullscreen'
  },
  // Arguments (props) description
  argTypes: {
    src: {
      description: 'Path to the image.',
      control: {
        type: 'select',
        options: ['images/IMG_0665.jpg', 'images/IMG_3993.jpg']
      }
    },
    cropperClass: {
      description: 'Class to apply to the cropper.',
    },
    stencil: {
      description: 'Stencil to use.',
      control: {
        type: 'select',
        options: ['rectangle', 'circle']
      }
    },
    showHandlers: {
      description: 'Show / hide the handlers.',
      type: 'boolean'
    },
    showToolbar: {
      description: 'Show / hide the toolbar.',
      type: 'boolean'
    },
    options: {
      description: 'Options for cropper and stencil',
    },
  },
  // Arguments (props) defaults
  args: {
    cropperClass: 'story-cropper',
    src: "images/IMG_0665.jpg",
    showHandlers: true,
    showToolbar: true,
    stencil: 'rectangle',
    options
  }
}
/**
 * Template
 */
const template = `<div style="height: 100vh;" class="has-padding-sm is-flex"><div style="width: 600px; height: 600px;">` +
  `<vuoz-cropper ` +
  // Props
  `   :cropperClass="cropperClass" ` +
  `   :src="src" ` +
  `   :showHandlers="showHandlers" ` +
  `   :showToolbar="showToolbar" ` +
  `   :stencil="stencil"` +
  `   :options="options"` +
  `> ` +
  `</vuoz-cropper></div>` +
  `</div>`
// To be displayed by Storybook
export const Cropper = (args: any, { argTypes }: any) => ({
  components: { VuozCropper },
  template,
  props: Object.keys(argTypes),
  argTypes
})
