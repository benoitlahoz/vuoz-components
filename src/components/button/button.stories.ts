import { action } from '@storybook/addon-actions'
import VuozButton from './index.vue'
/**
 * Story
 */
export default {
  component: VuozButton,
  title: 'Button',
  // Arguments (props) description
  argTypes: {
    disabled: {
      description: 'Enable / disable the button.',
      control: { type: 'boolean' }
    },
    loading: {
      description: 'Loading state of the button.',
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
    shape: {
      description: 'Shape of the button.',
      control: {
        type: 'select',
        options: ['free', 'square', 'circle']
      }
    },
    weight: {
      description: 'Font weight of the button\'s text.',
      control: {
        type: 'select',
        options: ['thin', 'ultra-light', 'light', 'regular', 'medium', 'semi-bold', 'bold', 'extra-bold', 'black']
      }
    },
    color: {
      description: 'Base color of the button.',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey', 'transparent']
      }
    },
    toggle: {
      description: 'Color of the button when toggled.',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey']
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
      description: 'Applies a shadow under the button.',
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
  },
  // Arguments (props) defaults
  args: {
    disabled: false,
    loading: false,
    type: 'push',
    size: 'small',
    shape: 'free',
    weight: 'semi-bold',
    color: 'secondary',
    toggle: 'danger',
    rounded: true,
    border: true,
    shadow: true,
    uppercase: true,
    smallcaps: false
  }
}
/**
 * Template
 */
const template = `<vuoz-button ` +
  // Props
  `   :disabled="disabled" ` +
  `   :loading="loading" ` +
  `   :type="type" ` +
  `   :size="size" ` +
  `   :shape="shape" ` +
  `   :weight="weight" ` +
  `   :rounded="rounded" ` +
  `   :border="border" ` +
  `   :shadow="shadow" ` +
  `   :uppercase="uppercase" ` +
  `   :smallcaps="smallcaps" ` +
  `   :color="color" ` +
  `   :toggle="toggle" ` +
  // Event
  `   @click="onClick">` +
  // Icon left slot
  // TODO: `<template v-slot:left><i class="gg-close"></i></template>` +
  // Default slot content
  `   <template v-slot:main>` +
  `     Click me` +
  `   </template>` +
  `</vuoz-button>`
// To be displayed by Storybook
export const Full = (args: any, { argTypes }: any) => ({
  components: { VuozButton },
  template,
  methods: { onClick: action('click') },
  props: Object.keys(argTypes),
  argTypes
})
