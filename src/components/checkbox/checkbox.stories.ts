import { action } from '@storybook/addon-actions'
import VuozCheckbox from './index.vue'
/**
 * Story
 */
export default {
  component: VuozCheckbox,
  title: 'Base/Checkbox',
  // Arguments (props) description
  argTypes: {
    disabled: {
      description: 'Enable / disable the button.',
      control: { type: 'boolean' }
    },
    type: {
      description: 'Type of the button.',
      control: {
        type: 'select',
        options: ['push', 'toggle']
      }
    },
    size: {
      description: 'Size of the button.',
      control: {
        type: 'select',
        options: ['tiny', 'small', 'normal', 'large']
      }
    },
    color: {
      description: 'Base color of the button.',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey', 'transparent', 'yellow']
      }
    },
    toggle: {
      description: 'Color of the button when toggled.',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey', 'yellow']
      }
    },
    toggled: {
      description: 'Initially toggled.',
      control: { type: 'boolean' }
    },
    rounded: {
      description: 'Applies rounded corners.',
      control: { type: 'boolean' }
    },
    shadow: {
      description: 'Applies a shadow under the button.',
      control: { type: 'boolean' }
    }
  },
  // Arguments (props) defaults
  args: {
    disabled: false,
    type: 'push',
    size: 'small',
    color: 'secondary',
    toggle: 'danger',
    toggled: false,
    rounded: true,
    shadow: true,
  }
}
/**
 * Template
 */
const template = `<vuoz-checkbox ` +
  // Props
  `   :disabled="disabled" ` +
  `   :type="type" ` +
  `   :size="size" ` +
  `   :rounded="rounded" ` +
  `   :shadow="shadow" ` +
  `   :color="color" ` +
  `   :toggle="toggle" ` +
  `   :toggled="toggled" ` +
  // Event
  `   @click="onClick">` +
  `</vuoz-checkbox>`
// To be displayed by Storybook
export const Checkbox = (args: any, { argTypes }: any) => ({
  components: { VuozCheckbox },
  template,
  methods: { onClick: action('click') },
  props: Object.keys(argTypes),
  argTypes
})
