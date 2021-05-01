import VuozSignIn from './in/index.vue'
/**
 * Story
 */
export default {
  component: VuozSignIn,
  title: 'Components/Sign',
  parameters: {
    layout: 'fullscreen'
  },
  // Arguments (props) description
  argTypes: {
    size: {
      description: 'Size of the button.',
      control: {
        type: 'select',
        options: ['tiny', 'small', 'normal', 'large']
      }
    },
  },
  // Arguments (props) defaults
  args: {
    size: 'normal'
  }
}
/**
 * Template
 */
const template = `<div class="has-padding-sm is-flex">` + 
  `<div style="height: 100vh; width: 100vw;" class="is-flex align-center justify-center"><vuoz-sign-in ` +
  // Props
  `   :size="size"> ` +
  `</vuoz-sign-in></div>` + 
  `</div>`
// To be displayed by Storybook
export const Sign = (args: any, { argTypes }: any) => ({
  components: { VuozSignIn },
  template,
  props: Object.keys(argTypes),
  argTypes
})
