import VuozBrushMenu from './brush.menu/index.vue'
import VuozBackgroundMenu from './background.menu/index.vue'

const brushButton = {
  icon: 'brush',
  label: 'Brush',
  type: 'dropdown',
  toggle: 'medium-grey',
  rounded: true,
  name: 'vuoz:whiteboard:brush',
  menu: VuozBrushMenu,
  onDown(target: any, button: any) {
    (this as any).$parent.toggleBrushPanel(true)
  },
  onUp(target: any, button: any) {
    (this as any).$parent.toggleBrushPanel(false)
  }
}

const backgroundButton = {
  icon: 'format_paint',
  label: 'Background',
  rounded: true,
  type: 'dropdown',
  toggle: 'medium-grey',
  name: 'vuoz:whiteboard:background',
  menu: VuozBackgroundMenu,
  onDown(target: any, button: any) {
    (this as any).$parent.toggleBackgroundPanel(true)
  },
  onUp(target: any, button: any) {
    (this as any).$parent.toggleBackgroundPanel(false)
  }
}

const deleteButton = {
  icon: 'delete',
  label: 'Clear',
  rounded: true,
  name: 'vuoz:whiteboard:clear',
  onDown() {
    (this as any).$parent.clear()
  }
}

const selectButton = {
  icon: 'north_west',
  label: 'Select',
  rounded: true,
  type: 'toggle',
  toggle: 'primary',
  name: 'vuoz:whiteboard:select',
  onDown() {
    (this as any).unselect('vuoz:whiteboard:erase');
    (this as any).unselect('vuoz:whiteboard:draw');
  }
}

const drawButton = {
  icon: 'gesture',
  label: 'Draw',
  rounded: true,
  type: 'toggle',
  toggle: 'primary',
  toggled: true,
  name: 'vuoz:whiteboard:draw',
  onDown() {
    (this as any).unselect('vuoz:whiteboard:erase');
    (this as any).unselect('vuoz:whiteboard:select');
  }
}

const eraserButton = {
  icon: 'layers_clear',
  label: 'Eraser',
  rounded: true,
  type: 'toggle',
  toggle: 'primary',
  name: 'vuoz:whiteboard:erase',
  onDown() {
    (this as any).unselect('vuoz:whiteboard:draw');
    (this as any).unselect('vuoz:whiteboard:select');
  }
}



const circleButton = {
  icon: 'circle',
  label: 'Circle',
  rounded: true,
  name: 'vuoz:whiteboard:circle',
  onDown() {
    console.warn('TODO: CIRCLE')
  }
}

const rectButton = {
  icon: 'crop_square',
  label: 'Square',
  rounded: true,
  name: 'vuoz:whiteboard:square',
  onDown() {
    console.warn('TODO: SQUARE')
  }
}

const triangleButton = {
  icon: 'change_history',
  label: 'Triangle',
  rounded: true,
  name: 'vuoz:whiteboard:triangle',
  onDown() {
    console.warn('TODO: TRIANGLE')
  }
}

const lineButton = {
  icon: 'show_chart',
  label: 'Line / Polygon',
  rounded: true,
  name: 'vuoz:whiteboard:line',
  onDown() {
    console.warn('TODO: LINE')
  }
}

const textButton = {
  icon: 'title',
  label: 'Text',
  rounded: true,
  name: 'vuoz:whiteboard:text',
  onDown() {
    console.warn('TODO: TEXT')
  }
}

const importButton = {
  icon: 'file_download',
  label: 'Import',
  rounded: true,
  name: 'vuoz:toolbar:import',
  onDown() {
    console.warn('TODO: IMPORT')
  }
}

const exportButton = {
  icon: 'file_upload',
  label: 'Export',
  rounded: true,
  name: 'vuoz:toolbar:export',
  onDown() {
    console.warn('TODO: EXPORT')
  }
}

const saveButton = {
  icon: 'save',
  label: 'Save',
  rounded: true,
  name: 'vuoz:whiteboard:save',
  onDown() {
    console.warn('TODO: SAVE')
  }
}

const spacer = {
  role: 'spacer'
}

const separator = {
  role: 'separator'
}

export const whiteBoardToolbarItems = [
  deleteButton,
  separator,
  brushButton,
  backgroundButton,
  separator,
  selectButton,
  drawButton,
  eraserButton,
  separator,
  circleButton,
  rectButton,
  triangleButton,
  lineButton,
  separator,
  textButton,
  spacer,
  importButton,
  exportButton,
  saveButton,
]