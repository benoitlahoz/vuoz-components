import { action } from '@storybook/addon-actions'
import VuozToolbar from '../index.vue'
// Story
import ArrayUni from '../stories.config/story.array.uni'
import { template } from './toolbar.template'
/**
 * Story
 */
export default {
  component: VuozToolbar,
  title: 'Toolbar/Entries',
  // Arguments (props) description
  ...ArrayUni
}
// To be displayed by Storybook
export const ArrayUnidimensional = (args: any, { argTypes }: any) => ({
  components: { VuozToolbar },
  template,
  props: Object.keys(argTypes),
  methods: {
    onClick: action('click'),
  },
  argTypes
})
