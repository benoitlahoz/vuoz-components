import { action } from '@storybook/addon-actions'
import VuozImage from './index.vue'

/**
 * Story
 */
export default {
  component: VuozImage,
  title: 'Base/Image',
  // Arguments (props) description
  argTypes: {
    path: {
      description: 'Path to the image.',
      control: {
        type: 'select',
        options: ['images/logo_2020.svg', 'images/IMG_0665.jpg']
      }
    },
    width: {
      description: 'Width of the image, with units.',
      type: 'string'
    },
    height: {
      description: 'Height of the image, with units.',
      type: 'string'
    },
    fit: {
      description: 'Object fit method.',
      control: {
        type: 'select',
        options: ['none', 'fill', 'contain', 'cover', 'scale-down']
      }
    },
  },
  // Arguments (props) defaults
  args: {
    path: "images/IMG_0665.jpg",
    width: '400px',
    height: '600px',
    fit: 'fill'
  }
}
/**
 * Template
 */
const template = `
   <vuoz-image `          + 
    `:path="path"`        +
    `:width="width" `     +
    `:height="height" `   +
    `:fit="fit"> `        +
  `</vuoz-image>`
// To be displayed by Storybook
export const Image = (args: any, { argTypes }: any) => ({
  components: { VuozImage },
  template,
  props: Object.keys(argTypes),
  argTypes
})
