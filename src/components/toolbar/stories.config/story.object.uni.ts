import { argTypes } from './story.config.base'
import { itemsUniArray } from './story.items'

const items = {
  rounded: true,
  border: true,
  buttons: [
    ...itemsUniArray
  ]
}

export default {
  ...argTypes,
  // Arguments (props) defaults
  args: {
    items: items,
    show: 'always',
    vertical: false,
    disabled: false,
    size: 'tiny',
    position: 'top-right',
    space: '0.5rem',
    color: 'dark-grey',
    border: true,
    rounded: true,
    shadow: true
  }
}