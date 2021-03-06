export const argTypes = {
  argTypes: {
    type: {
      description: 'Type of the toolbar.',
      control: {
        type: 'select',
        options: ['fixed', 'contextual']
      }
    },
    show: {
      description: 'How the toolbar is shown.',
      control: {
        type: 'select',
        options: ['always', 'over', 'call']
      }
    },
    vertical: {
      description: 'Inverts rows and columns of the input items.',
      control: { type: 'boolean' }
    },
    disabled: {
      description: 'Disables / enables the toolbar.',
      control: { type: 'boolean' }
    },
    size: {
      description: 'Size of the toolbar.',
      control: {
        type: 'select',
        options: ['tiny', 'small', 'normal']
      }
    },
    position: {
      description: 'The position of the toolbar in its container',
      control: {
        type: 'select',
        options: ["top-left", "left", "bottom-left", "bottom", "bottom-right", "right", "top-right", "top"]
      }
    },
    space: {
      description: 'Space between the toolbar and the border.',
      control: {
        type: 'select',
        options: ['0', '0.5rem', '1rem', '20px', '2vw']
      }
    },
    color: {
      description: 'Base color of the toolbar.',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey', 'transparent']
      }
    },
    border: {
      description: 'The color of the border.',
      control: {
        type: 'select',
        options: ['none', 'primary', 'secondary', 'success', 'warning', 'danger', 'darker-grey', 'dark-grey', 'medium-grey', 'transparent']
      }
    },
    rounded: {
      description: 'Applies rounded corners.',
      control: { type: 'boolean' }
    },
    shadow: {
      description: 'Applies shadow.',
      control: { type: 'boolean' }
    }
  }
}