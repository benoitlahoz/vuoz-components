import VuozTitleBar from './index.vue'
/**
 * Story
 */
export default {
  component: VuozTitleBar,
  title: 'Components/TitleBar',
  parameters: {
    layout: 'fullscreen'
  },
  // Arguments (props) description
  argTypes: {
    title: {
      description: 'The... title.'
    },
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
    title: 'Untitled',
    size: 'normal',
    color: 'dark-grey',
    border: 'medium-grey'
  }
}

/**
 * Template
 */
const template = `<vuoz-title-bar :title="title" :size="size" :color="color" :border="border"> ` +
  `</vuoz-title-bar>`
// To be displayed by Storybook
export const TitleBar = (args: any, { argTypes }: any) => ({
  components: { VuozTitleBar },
  template,
  props: Object.keys(argTypes),
  argTypes
})
