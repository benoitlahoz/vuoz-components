import { argTypes } from './story.config.base'

const items = {
  rounded: true,
  border: true,
  buttons: [
    [
      {
        icon: 'crop',
        label: 'Crop',
        type: 'toggle',
        toggle: 'primary',
        name: 'vuoz:toolbar:crop',
        target: 'MyAwesomeComponent',
        onDown(target: any, button: any) {
          // Here 'this' represents the caller (VuozInnerToolbar)
          console.log('Caller', this)
          console.log('Select \'crop\' to target', target)
          console.log('Button called', button);
          // Disables the toolbar's button except this one.
          (this as any).disableAllBut('vuoz:toolbar:crop');
        },
        onUp(target: any, button: any) {
          console.log('Caller', this)
          console.log('Deselect \'crop\' to target', target)
          console.log('Button called', button);
          // Resets toolbar's state.
          (this as any).resetState()
        }
      },
      {
        icon: 'aspect_ratio',
        label: 'Resize',
        name: 'vuoz:toolbar:resize',
        target: 'MyAwesomeComponent',
        onDown(target: any, button: any) {
          console.log('Caller', this)
          console.log('Select \'resize\' to target', target)
          console.log('Button called', button);
          (this as any).disable('vuoz:toolbar:resize')
        },
        onUp(target: any, button: any) {
          console.log('Caller', this)
          console.log('Deselect \'resize\' to target', target)
          console.log('Button called', button)
        }
      },
      {
        icon: 'rotate_right',
        label: 'Rotate right',
        name: 'vuoz:toolbar:rotate:right',
        target: 'MyAwesomeComponent',
        onUp(target: any, button: any) {
          console.log('Caller', this)
          console.log('Rotate right on mouse up to target', target)
          console.log('Button called', button);
          button.toggleLoad()
          const timeout = setTimeout(() => {
            button.toggleLoad()
            clearTimeout(timeout)
          }, 1000)
        }
      }
    ],
    [
      {
        icon: 'rotate_left',
        label: 'Rotate left',
        name: 'vuoz:toolbar:rotate:left',
        target: 'MyAwesomeComponent',
        onDown(target: any, button: any) {
          console.log('Caller', this)
          console.log('Rotate left on mouse down to target', target)
          console.log('Button called', button)
        }
      },
      {
        icon: 'save',
        label: 'Save',
        name: 'vuoz:toolbar:save',
        target: 'MyAwesomeComponent',
        onDown(target: any, button: any) {
          console.log('Caller', this)
          console.log('Save on mouse down to target', target)
          console.log('Button called', button)
        }
      }
    ]
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
    shadow: false
  }
}