<template lang="pug">
div(ref="container", :style="containerStyle")
  img(:src="path", :style="imageStyle")
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

/**
 * Vuoz image component
 * @displayName VuozImage
 */
@Component({
  name: 'VuozImage'
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, required: true }) readonly path!: string
  @Prop({ type: String, default: '' }) readonly width!: string
  @Prop({ type: String, default: '' }) readonly height!: string
  @Prop({ type: String, default: 'contain' }) readonly fit!: string

  private containerStyle = ''
  private imageStyle = ''

  @Watch('width')
  private onWidthChanged () {
    this.setStyles()
  }

  @Watch('height')
  private onHeightChanged () {
    this.setStyles()
  }

  @Watch('fit')
  private onFitChanged () {
    this.setStyles()
  }

  private async created() {

    this.setStyles()

  }

  private setStyles() {
    this.setContainerStyle()
    this.setImageStyle()
  }

  private setContainerStyle() {

    const width = (w: string) => `width: ${w}; min-width: ${w}; max-width: ${w}; overflow: hidden; `
    const height = (h: string) => `height: ${h}; min-height: ${h}; max-height: ${h}; overflow: hidden; `

    let style = ``

    if (this.width && this.width.trim().length > 0) {
      style += width(this.width)
      if (!this.height || this.height.trim().length === 0) {
        style += width('100%')
      }
    }
    if (this.height && this.height.trim().length > 0) {
      style += height(this.height)
      if (!this.width || this.width.trim().length === 0) {
        style += height('100%')
      }
    }

    this.containerStyle = style

  }

  private setImageStyle() {

    const style = `width:100%; height:100%; object-fit: ${this.fit};`

    this.imageStyle = style

  }

}
</script>