import { action } from '@storybook/addon-actions'
import VuozToolbar from '../index.vue'
// Story
import ArrayUni from '../stories.config/story.array.uni'
/**
 * Story
 */
export default {
  component: VuozToolbar,
  title: 'Toolbar/Inner',
  // Arguments (props) description
  ...ArrayUni
}
/**
 * Template
 */
const template = `
 <div><div style="width: 640px; height: 480px; border: solid 1px black; position: relative;" class="has-background-warning">` +
  `<vuoz-toolbar :show="show" :vertical="vertical" :size="size" :position="position" :space="space" :items="items" :color="color" :border="border" :rounded="rounded" :shadow="shadow" :disabled="disabled" @click="onClick"> ` +
  `</vuoz-toolbar></div>` +
  `</div>`
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