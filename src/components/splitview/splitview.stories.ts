import VuozSplitView from './index.vue'
/**
 * Story
 */
export default {
  component: VuozSplitView,
  title: 'Components/SplitView',
  parameters: {
    layout: 'fullscreen'
  },
  // Arguments (props) description
  argTypes: {
    direction: {
      description: 'Direction of the split view.',
      control: {
        type: 'select',
        options: ['vertical', 'horizontal']
      }
    },
    activeSize: {
      description: "Size of the active zone around the actual separator."
    },
    settings: {
      description: "Settings for the first (left or top) item min and max size (in %)."
    }
  },
  // Arguments (props) defaults
  args: {
    direction: 'horizontal',
    activeSize: 21,
    settings: {
      min: 60, 
      max: 70
    },
  }
}
/**
 * Template
 */
const template = `<div style="height: 100vh; margin: 0; display: flex;"><vuoz-split-view :direction="direction" :activeSize="activeSize" :settings="settings"> ` +
  `<div class="is-flex flex-grow has-background-warning is-fullsize align-center justify-center" slot="first">Le premier</div>` +
  `<div class="is-flex flex-grow has-background-danger is-fullsize align-center justify-center" slot="second">Le second</div>` +
  `</vuoz-split-view></div>`
// To be displayed by Storybook
export const Splitview = (args: any, { argTypes }: any) => ({
  components: { VuozSplitView },
  template,
  props: Object.keys(argTypes),
  argTypes
})
