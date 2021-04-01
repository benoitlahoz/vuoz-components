import VuozLoadingIcon from './index.vue'
/**
 * Story
 */
export default {
  component: VuozLoadingIcon,
  title: 'Base/Loading/Icon',
  // Arguments (props) description
  argTypes: {
    name: {
      description: 'Name of the button (its type).',
      control: {
        type: 'select',
        options: ['spinner', 'ellipsis', 'grid']
      }
    },
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
    name: 'ellipsis',
    size: 'normal'
  }
}
/**
 * Template
 */
const template = `<vuoz-loading-icon ` +
  // Props
  `   :size="size" ` +
  `   :name="name"> ` +
  `</vuoz-loading-icons>`
// To be displayed by Storybook
export const Icon = (args: any, { argTypes }: any) => ({
  components: { VuozLoadingIcon },
  template,
  props: Object.keys(argTypes),
  argTypes
})
