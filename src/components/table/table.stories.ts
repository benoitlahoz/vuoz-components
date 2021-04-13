import VuozTable from './index.vue'
import VuozTableHeader from './header/index.vue'
import VuozTableRow from './row/index.vue'
/**
 * Data for the story.
 */
const headersItems = [
  'One',
  'Two',
  'Three'
]
const items = [
  ['BLA', 'BLEU', 'BEURK'],
  'BLO',
  'BLI'
]
/**
 * Story
 */
export default {
  component: VuozTable,
  title: 'Components/Table',
  parameters: {
    layout: 'fullscreen'
  },
  // Arguments (props) description
  argTypes: {
    showHeaders: {
      description: 'Show / hide headers.',
      control: {
        type: 'boolean'
      }
    },
    headersColor: {
      description: 'Color of the header.',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey', 'transparent']
      }
    },
    headersSize: {
      description: 'Size of the headers.',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large']
      }
    },
    size: {
      description: 'Size of the button.',
      control: {
        type: 'select',
        options: ['small-thin', 'small', 'normal', 'large']
      }
    },
    color: {
      description: 'Base color of the table.',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey', 'transparent']
      }
    },
    highlight: {
      description: 'Highlight color of the table\'s rows.',
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
    delimiter: {
      description: 'The color of the cells\' border.',
      control: {
        type: 'select',
        options: ['none', 'primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey', 'transparent']
      }
    },
    selectable: {
      description: 'Selection mode.',
      control: {
        type: 'select',
        options: ['none', 'one', 'multiple']
      }
    },
    items: {
      description: 'The main rows of the table.',
    }
  },
  // Arguments (props) defaults
  args: {
    items,
    showHeaders: true,
    headersSize: 'small',
    headersColor: 'transparent',
    size: 'small-thin',
    color: 'transparent',
    border: 'medium-grey',
    delimiter: 'medium-grey',
    highlight: 'dark-grey',
    selectable: 'none',
    // For headers
    headersItems
  }
}
/**
 * Template
 */
const template = `<div style="width: 100%; height: 100%;"><vuoz-table :items="items" :selectable="selectable" :size="size" :color="color" :border="border" :delimiter="delimiter" :highlight="highlight" @header="onHeader" @row="onRow" @cell="onCell" @multi="onMultiSelection" @unselect="onUnselect">` +
  `<template v-if="showHeaders === true" slot="headers" slot-scope="props"><vuoz-table-header :row="headersItems" :selectable="props.selectable" :size="headersSize" :color="headersColor" :border="props.border"></vuoz-table-header></template>` +
  `<template slot="rows" slot-scope="props">` +
  `<vuoz-table-row :row="props.row" :id="props.id" :selectable="props.selectable" :size="props.size" :border="props.border" :cell-border="delimiter" :selected="props.selected" :highlight="highlight"></vuoz-table-row>` +
  `</template>` +
  `</vuoz-table></div>`
// To be displayed by Storybook
export const Table = (args: any, { argTypes }: any) => ({
  components: { VuozTable, VuozTableHeader, VuozTableRow },
  template,
  props: Object.keys(argTypes),
  methods: {
    onHeader(header: any) {
      console.log('Header was clicked', header)
    },
    onRow(payload: any) {
      console.log('Row was selected', payload)
    },
    onCell(payload: any) {
      console.log('Cell was selected', payload)
    },
    onMultiSelection(payload: any) {
      console.log('Multiple rows were selected', payload)
    },
    onUnselect() {
      console.log('Selection was cleared')
    }
  },
  argTypes
})
