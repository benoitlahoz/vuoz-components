import { argTypes } from './story.config.base'
import { itemsUniArray as items } from './story.items'

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