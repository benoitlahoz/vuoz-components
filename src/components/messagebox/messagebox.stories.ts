import VuozMessageBox from './index.vue'
/**
 * Story
 */
export default {
  component: VuozMessageBox,
  title: 'Components/MessageBox',
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
const template = `<div style="height: 100vh; justify-content: space-between; align-items: center;" class="has-padding-sm is-flex">` + 
  `<div class="has-border-medium-grey" style="width: 33%; height: 80%;"><vuoz-message-box ` +
  // Props
  `   :size="size"> ` +
  `</vuoz-message-box></div>` + 
  `<div class="has-border-medium-grey" style="width: 33%; height: 80%;"><vuoz-message-box ` +
  // Props
  `   :size="size"> ` +
  `</vuoz-message-box></div>` + 
  `</div>`
// To be displayed by Storybook
export const MessageBox = (args: any, { argTypes }: any) => ({
  components: { VuozMessageBox },
  template,
  props: Object.keys(argTypes),
  argTypes
})
