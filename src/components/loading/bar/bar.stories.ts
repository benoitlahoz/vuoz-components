import VuozLoadingBar from './index.vue'
import VuozButton from '../../button/index.vue'
/**
 * Story
 */
export default {
  component: VuozLoadingBar,
  title: 'Base/Loading/Bar',
  // Arguments (props) description
  argTypes: {
    size: {
      description: 'Size of the button.',
      control: {
        type: 'select',
        options: ['tiny', 'small', 'normal', 'large']
      }
    },
    progress: {
      control: {
        disable: true
      }
    }
  },
  // Arguments (props) defaults
  args: {
    size: 'normal'
  }
}
/**
 * Template
 */
const template = `<div><vuoz-loading-bar ` +
  // Props
  `   :size="size" ` +
  `   :progress="prog"> ` +
  `</vuoz-loading-bar>` +
  `<div style="display: block; margin: 10px;">` +
  `<vuoz-button color="primary" size="small" rounded shadow uppercase border @click="simulateProgress();">` +
  `<template v-slot:main>SImulate</template>` +
  `</vuoz-button>` +
  `</div></div>`
// To be displayed by Storybook
export const Bar = (args: any, { argTypes }: any) => ({
  components: { VuozLoadingBar, VuozButton },
  template,
  data () {
    return {
      prog: 0,
      interval: null
    }
  },
  created() {
    (this as any).prog = 0
  },
  methods: {
    // Actual actions
    simulateProgress() {
      console.log(args)
      if ((this as any).interval) {
        clearInterval((this as any).interval)
      }
      (this as any).prog = 0;
      (this as any).interval = setInterval(() => {
        if ((this as any).prog < 1) {
          (this as any).prog += 0.01;
        } else {
          clearInterval((this as any).interval)
        }
      }, 50);
    }
  },
  props: Object.keys(argTypes),
  argTypes
})
