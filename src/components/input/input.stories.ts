import VuozInput from './index.vue'
/**
 * Story
 */
export default {
  component: VuozInput,
  title: 'Base/Input',
  // Arguments (props) description
  argTypes: {
    type: {
      description: 'Type of the input.',
      control: {
        type: 'select',
        options: ['text', 'email', 'password', 'ip', 'integer', 'uinteger', 'float']
      }
    },
    label: {
      description: 'Label of the input'
    },
    labelPosition: {
      description: 'Position of the label.',
      control: {
        type: 'select',
        options: ['top', 'left', 'bottom', 'right']
      }
    },
    placeholder: {
      description: 'Placeholder of the input'
    },
    size: {
      description: 'Size of the input.',
      control: {
        type: 'select',
        options: ['tiny', 'small', 'normal', 'large']
      }
    },
    required: {
      description: 'Is an answer required.',
      control: { type: 'boolean' }
    },
    disabled: {
      description: 'Enable / disable the input.',
      control: { type: 'boolean' }
    },
    loading: {
      description: 'Loading state of the input.',
      control: { type: 'boolean' }
    },
    weight: {
      description: 'Font weight of the input\'s text.',
      control: {
        type: 'select',
        options: ['thin', 'ultra-light', 'light', 'regular', 'medium', 'semi-bold', 'bold', 'extra-bold', 'black']
      }
    },
    color: {
      description: 'Base color of the input.',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey', 'transparent']
      }
    },
    rounded: {
      description: 'Applies rounded corners.',
      control: { type: 'boolean' }
    },
    border: {
      description: 'Applies border.',
      control: { type: 'boolean' }
    },
    shadow: {
      description: 'Applies a shadow under the input.',
      control: { type: 'boolean' }
    },
    uppercase: {
      description: 'Transform text to uppercase.',
      control: { type: 'boolean' }
    },
    smallcaps: {
      description: 'Transform text to small caps.',
      control: { type: 'boolean' }
    },
    icon: {
      description: 'Icon for the input.'
    },
  },
  // Arguments (props) defaults
  args: {
    disabled: false,
    loading: false,
    required: false,
    type: 'text',
    label: 'My input',
    labelPosition: 'left',
    placeholder: 'Type text...',
    size: 'small',
    weight: 'semi-bold',
    color: 'medium-grey',
    rounded: true,
    border: true,
    shadow: true,
    uppercase: false,
    smallcaps: false,
    icon: 'search'
  }
}
/**
 * Template
 */
const template = `<vuoz-input ` +
  // Props
  `   :type="type" ` +
  `   :label="label" ` +
  `   :labelPosition="labelPosition" ` +
  `   :placeholder="placeholder" ` +
  `   :required="required" ` +
  `   :size="size" ` +
  `   :weight="weight" ` +
  `   :color="color" ` +
  `   :rounded="rounded" ` +
  `   :border="border" ` +
  `   :shadow="shadow" ` +
  `   :uppercase="uppercase" ` +
  `   :smallcaps="smallcaps" ` +
  `   :icon="icon" ` +
  `   :disabled="disabled"> ` +
  `</vuoz-input>`
// To be displayed by Storybook
export const Input = (args: any, { argTypes }: any) => ({
  components: { VuozInput },
  template,
  props: Object.keys(argTypes),
  argTypes
})
