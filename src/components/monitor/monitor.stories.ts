import VuozMonitorView from './index.vue'
/**
 * Story
 */
export default {
  component: VuozMonitorView,
  title: 'Components/MonitorView',
  parameters: {
    layout: 'fullscreen'
  },
  // Arguments (props) description
  argTypes: {
    //
  },
  // Arguments (props) defaults
  args: {
    //
  }
}
/**
 * Template
 */
const template = `<div style="height: 100vh; margin: 0; display: flex;">` +
  `<vuoz-monitor-view :debug="true"> ` +
  `</vuoz-monitor-view></div>`
// To be displayed by Storybook
export const MonitorView = (args: any, { argTypes }: any) => ({
  components: { VuozMonitorView },
  template,
  props: Object.keys(argTypes),
  argTypes
})
