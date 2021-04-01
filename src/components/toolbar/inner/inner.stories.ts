import VuozInnerToolbar from './index.vue'
// Data for the toolbar
const items = [
  {
    icon: 'crop',
    label: 'Crop',
    action: 'vuoz:toolbar:crop'
  },
  {
    icon: 'aspect_ratio',
    label: 'Resize',
    action: 'vuoz:toolbar:resize'
  },
  {
    icon: 'rotate_right',
    label: 'Rotate right',
    action: 'vuoz:toolbar:rotate:right'
  },
  {
    icon: 'rotate_left',
    label: 'Rotate left',
    action: 'vuoz:toolbar:rotate:left'
  },
  {
    icon: 'save',
    label: 'Save',
    action: 'vuoz:toolbar:save'
  },
]
/**
 * Story
 */
export default {
  component: VuozInnerToolbar,
  title: 'Toolbar/Inner',
  // Arguments (props) description
  argTypes: {
    //
  },
  // Arguments (props) defaults
  args: {
    items
  }
}
/**
 * Template
 */
const template = `
   <vuoz-inner-toolbar :items="items"> `          + 
  `</vuoz-inner-toolbar>`
// To be displayed by Storybook
export const Inner = (args: any, { argTypes }: any) => ({
  components: { VuozInnerToolbar },
  template,
  props: Object.keys(argTypes),
  argTypes
})
