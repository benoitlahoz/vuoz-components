import { action } from '@storybook/addon-actions'
import VuozSplash from './index.vue'
/**
 * Story
 */
export default {
  component: VuozSplash,
  title: 'Splash Screen',
  parameters: {
    layout: 'fullscreen'
  },
  // Arguments (props) description
  argTypes: {

  },
  // Arguments (props) defaults
  args: {

  }
}
/**
 * Template
 */
const template = `
  <div style="height: 100vh; margin: 0; display: flex;">`   +
  `  <vuoz-splash logo="images/logo_2020.svg">`                                         +
  `  </vuoz-splash>`                                        +
  `</div>`
// To be displayed by Storybook
export const Full = (args: any, { argTypes }: any) => ({
  components: { VuozSplash },
  template,
  props: Object.keys(argTypes),
  argTypes
})
