import { action } from '@storybook/addon-actions'
import VuozTabs from './index.vue'
/**
 * Data for the template
 */
let tabs = [
  {
    id: 0,
    title: 'Tab 1',
    content: 'Content 1'
  },
  {
    id: 1,
    title: 'Tab 2',
    content: 'Content 2'
  }
]
let counter = 2
/**
 * Story
 */
export default {
  component: VuozTabs,
  title: 'Components/Tabs',
  parameters: {
    layout: 'fullscreen'
  },
  // Arguments (props) description
  argTypes: {
    size: {
      description: 'Size of the tab bar.',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large']
      }
    },
    showAdd: {
      description: "Show / hide the plus button",
      control: {
        type: 'boolean'
      }
    },
    draggable: {
      description: "Are the tabs draggable",
      control: {
        type: 'boolean'
      }
    }
  },
  // Arguments (props) defaults
  args: {
    size: 'small',
    showAdd: true,
    draggable: true,
    tabs
  }
}
/**
 * Template
 */
const template = `
  <div style="height: 100vh; margin: 0; display: flex;">`     +
  `   <vuoz-tabs ` +
  `     :size="size"` +
  `     :draggable="draggable"` +
  `     :showAdd="showAdd"` +
  `     :tabs="tabs"` +
  `     :placeholder="placeholder"` +
  // Event
  `     @select="onClick"` +
  `     @close="onClose($event); closeData($event)"` +
  `     @addtab="onAddTab(); addTab()"` +
  `     @dragged="onDragged($event); drag($event)">` +
  `   </vuoz-tabs>` +
  `</div>`
// To be displayed by Storybook
export const Tabs = (args: any, { argTypes }: any) => ({
  components: { VuozTabs },
  template,
  methods: {
    // Storybook logs
    onClick: action('select'),
    onClose: action('close'),
    onAddTab: action('addtab'),
    onDragged: action('dragged'),
    // Custom actions
    closeData: (id: number | string) => {
      // Get tab
      const tab = args.tabs.find((t: any) => {
        return t.id === id
      })
      // Get tab's index
      const index = args.tabs.indexOf(tab)
      // Remove tab
      args.tabs.splice(index, 1)
    },
    addTab: () => {
      args.tabs.push({
        id: counter,
        title: `Tab ${counter + 1}`,
        content: `Content ${counter + 1}`
      })
      counter++
    },
    drag(e: {
      oldIndex: number,
      newIndex: number
    }) {
      args.tabs.splice(e.oldIndex, 1, args.tabs.splice(e.newIndex, 1, args.tabs[e.oldIndex])[0])
    }
  },
  props: Object.keys(argTypes),
  argTypes
})
