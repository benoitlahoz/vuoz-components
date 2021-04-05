import { action } from '@storybook/addon-actions'
import VuozToolbar from '../index.vue'
// Story
import ArrayMulti from '../stories.config/story.array.multi'
import { template } from './toolbar.template'
/**
 * Story
 */
export default {
  component: VuozToolbar,
  title: 'Toolbar/Entries',
  // Arguments (props) description
  ...ArrayMulti
}
// To be displayed by Storybook
export const ArrayMultidimensional = (args: any, { argTypes }: any) => ({
  components: { VuozToolbar },
  template,
  props: Object.keys(argTypes),
  methods: {
    onClick: action('click'),
  },
  argTypes
})
