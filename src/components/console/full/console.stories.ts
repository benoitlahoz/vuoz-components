import { action } from '@storybook/addon-actions'
import VuozConsole from './index.vue'
import VuozConsoleItem from '../item/index.vue'
/**
 * Data for the template
 */
let lines = [
  {
    content: 'A first console line'
  },
  {
    content: 'A second console line'
  }
]
/**
 * Story
 */
export default {
  component: VuozConsole,
  title: 'Console',
  // Arguments (props) description
  argTypes: {
    // 
  },
  // Arguments (props) defaults
  args: {
    lines
  }
}
/**
 * Template
 */
const template = `<vuoz-console ` +
  `:lines="lines">` +
  `</vuoz-console>`
// To be displayed by Storybook
export const Full = (args: any, { argTypes }: any) => ({
  components: { VuozConsole, VuozConsoleItem },
  template,
  props: Object.keys(argTypes),
  argTypes
})
