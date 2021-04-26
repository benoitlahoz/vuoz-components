import VuozWhiteBoard from './index.vue'
/**
 * Story
 */
export default {
  component: VuozWhiteBoard,
  title: 'Components/WhiteBoard',
  parameters: {
    layout: 'fullscreen'
  },
  // Arguments (props) description
  argTypes: {
    size: {
      description: 'Size of the title bar.',
      control: {
        type: 'select',
        options: ['tiny', 'small', 'normal']
      },
    },
    color: {
      description: 'Base color of the title bar.',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey', 'transparent']
      }
    },
    border: {
      description: 'The color of the border.',
      control: {
        type: 'select',
        options: ['none', 'primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey', 'transparent']
      }
    },
  },
  // Arguments (props) defaults
  args: {
    size: 'normal',
    color: 'dark-grey',
    border: 'medium-grey'
  }
}

/**
 * Template
 */
const template = `<div style="height: 100vh;"><vuoz-white-board :size="size" :color="color" :border="border"> ` +
  `</vuoz-white-board></div>`
// To be displayed by Storybook
export const WhiteBoard = (args: any, { argTypes }: any) => ({
  components: { VuozWhiteBoard },
  template,
  props: Object.keys(argTypes),
  argTypes
})
