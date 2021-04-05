import { action } from '@storybook/addon-actions'
import VuozToolbar from '../index.vue'
// Story
import ObjectMulti from '../stories.config/story.object.multi'
import { template } from './toolbar.template'
/**
 * Story
 */
export default {
  component: VuozToolbar,
  title: 'Toolbar/Entries',
  // Arguments (props) description
  ...ObjectMulti
}
// To be displayed by Storybook
export const ObjectMultidimensional = (args: any, { argTypes }: any) => ({
  components: { VuozToolbar },
  template,
  props: Object.keys(argTypes),
  methods: {
    onClick: action('click'),
  },
  argTypes
})
