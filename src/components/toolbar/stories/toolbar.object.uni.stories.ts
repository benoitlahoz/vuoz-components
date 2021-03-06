import { action } from '@storybook/addon-actions'
import VuozToolbar from '../index.vue'
// Story
import ObjectUni from '../stories.config/story.object.uni'
import { template } from './toolbar.template'
/**
 * Story
 */
export default {
  component: VuozToolbar,
  title: 'Components/Toolbar/ObjectUnidimensional',
  // Arguments (props) description
  ...ObjectUni
}
// To be displayed by Storybook
export const ObjectUnidimensional = (args: any, { argTypes }: any) => ({
  components: { VuozToolbar },
  template,
  props: Object.keys(argTypes),
  methods: {
    onClick: action('click'),
  },
  argTypes
})
