<template lang='pug'>
button.vuoz-button(
  ref="main",
  :class="getClasses()",
  :key="size",
  @mouseenter="onMouseEnter",
  @mouseleave="onMouseLeave",
  @mousedown="onMouseDown",
  @mouseup="onMouseUp",
  style="position: relative"
)
  .content(v-if="shape === 'free'", :class="{ 'is-hidden': load === true }")
    // @slot Icon left: TODO
    slot(name="left")
    // @slot Default button's text content
    slot(name="main") Click here
    // @slot Icon right: TODO
    slot(name="right") 
  // @slot Content for square and circle shapes
  slot(name="shaped", v-if="shape !== 'free' && !load") 
    span.material-icons {{ icon }}
  .loading-icon(v-if="load")
    slot(name="loader") 
      template(v-if="shape === 'free'")
        vuoz-loading-icon(name="ellipsis", :size="size")
      template(v-if="shape === 'square'")
        vuoz-loading-icon(name="grid", :size="size")
      template(v-if="shape === 'circle'")
        vuoz-loading-icon(name="spinner", :size="size")
  .has-shadow(
    v-if="type === 'dropdown'",
    ref="menu",
    v-click-outside="onClickOutside"
  )
    // style="position: absolute; left: 0px; top: 30px; display: inline-block; width: 250px; z-index: 9999;"
    // Can provide a slot content or a component via props
    slot(name="menu") 
      component.is-rounded-bottom-left.is-rounded-bottom-right.is-rounded-top-right(
        :is="menuComponent",
        @select="onMenu"
      )
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import tippy, { Content, MultipleTargets, Placement } from "tippy.js";
import VuozLoadingIcon from "../loading/icon/index.vue";
import { clickOutside } from "@/directives/click.outside";
import { VueConstructor } from "vue";
/**
 * Vuoz standard button
 * @displayName VuozButton
 */
@Component({
  name: "VuozButton",
  components: {
    VuozLoadingIcon,
  },
  directives: {
    clickOutside,
  },
})
export default class VuozComponent extends Vue {
  /**
   * Properties
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
  @Prop({ type: String, default: "push" }) readonly type!:
    | "push"
    | "toggle"
    | "dropdown";
  @Prop({ type: String, default: "normal" }) readonly size!:
    | "tiny"
    | "small"
    | "normal"
    | "large";
  @Prop({ type: String, default: "free" }) readonly shape!:
    | "free"
    | "square"
    | "circle";
  @Prop({ type: String, default: "regular" }) readonly weight!: string;
  @Prop({ type: Boolean, default: false }) readonly rounded!: boolean;
  @Prop({ type: Boolean, default: true }) readonly border!: boolean;
  @Prop({ type: Boolean, default: false }) readonly uppercase!: boolean;
  @Prop({ type: Boolean, default: false }) readonly smallcaps!: boolean;
  @Prop({ type: String, default: "medium-grey" }) readonly color!: string;
  @Prop({ type: String, default: "danger" }) readonly toggle!: string;
  @Prop({ type: Boolean, default: false }) readonly toggled!: string;
  @Prop({ type: Boolean, default: false }) readonly shadow!: boolean;
  @Prop({ type: String, default: "close" }) readonly icon!: string;
  @Prop({ type: String, default: "bottom-left" })
  readonly menuPlacement!: Placement;
  @Prop({ type: Function }) readonly menuComponent!: VueConstructor | null;
  /**
   * Internal component's data
   */
  private hovered = false;
  private selected = false;
  private disable = false;
  private load = false;
  /**
   * Dropdown
   */
  private menu: any = null;
  /**
   * Initialization and tear-down
   */
  private mounted() {
    if (this.toggled) {
      this.selected = true;
    }
    if (this.type === "dropdown") {
      const main = this.$refs.main as MultipleTargets;
      const menu = this.$refs.menu as Content;
      this.menu = tippy(main, {
        content: menu,
        trigger: "manual",
        duration: [0, 0],
        hideOnClick: false,
        arrow: false,
        interactive: true,
        allowHTML: true,
        // placement: this.menuPlacement,
        placement: "bottom-start",
        offset: [0, 5],
      });
      /*
      this.menu = tippy(main, {
        content: menu,
        render(instance) {
          // The recommended structure is to use the popper as an outer wrapper
          // element, with an inner `box` element
          const popper = document.createElement("div");
          const box = document.createElement("div");

          popper.appendChild(box);

          box.className = "my-custom-class";
          box.innerHTML = (instance.props.content as string);

          function onUpdate(prevProps: any, nextProps: any) {
            // DOM diffing
            if (prevProps.content !== nextProps.content) {
              box.innerHTML = nextProps.content;
            }
          }

          // Return an object with two properties:
          // - `popper` (the root popper element)
          // - `onUpdate` callback whenever .setProps() or .setContent() is called
          return {
            popper,
            onUpdate, // optional
          };
        },
      });
      */
    }
  }
  private updated() {
    //
  }
  private beforeDestroy() {
    //
  }

  public toggleLoad() {
    this.load = !this.load;
  }

  @Watch("disabled", { immediate: true })
  onDisable() {
    this.disable = this.disabled;
  }

  @Watch("loading", { immediate: true })
  onload() {
    this.load = this.loading;
  }
  /**
   * Gets button's classes according to props' values.
   */
  private getClasses() {
    // Size
    let classes = `is-${this.size}`;
    // Shape
    this.shape !== "free" ? (classes += ` is-${this.shape}`) : "";
    // load
    this.load ? (classes += ` is-load`) : "";
    // Font weight
    classes += ` has-text-${this.weight}`;
    // Rounded
    this.rounded && this.shape !== "circle" ? (classes += ` is-rounded`) : "";
    // Uppercase
    this.uppercase ? (classes += ` is-uppercase`) : "";
    // Small caps
    this.smallcaps ? (classes += ` is-small-caps`) : "";
    // Background color
    if (this.type !== "push") {
      if (this.selected) {
        classes += ` has-background-${this.toggle}`;
      } else {
        classes += ` has-background-${this.color}`;
      }
      if (!this.disable && this.hovered) {
        this.selected
          ? (classes += ` has-background-${this.toggle}-shaded`)
          : (classes += ` has-background-${this.color}-shaded`);
        this.border
          ? this.selected
            ? (classes += ` has-border-${this.toggle}`)
            : (classes += ` has-border-${this.color}`)
          : (classes += ` has-border-none`);
      } else {
        this.border
          ? this.selected
            ? (classes += ` has-border-${this.toggle}-shaded`)
            : (classes += ` has-border-${this.color}-shaded`)
          : (classes += ` has-border-none`);
      }
    } else {
      classes += ` has-background-${this.color}`;
      // Hovered but not selected
      if (!this.disable && this.hovered && !this.selected) {
        // Is hovered
        classes += ` has-background-${this.color}-shaded`;
        this.border
          ? (classes += ` has-border-${this.color}`)
          : (classes += ` has-border-none`);
      } else {
        // Is not hovered
        this.border
          ? (classes += ` has-border-${this.color}-shaded`)
          : (classes += ` has-border-none`);
      }
    }
    // Shadow
    if (!this.disable) {
      this.shadow && !this.selected ? (classes += ` has-shadow`) : "";
    }
    // Disabled
    this.disable ? (classes += ` is-disabled`) : "";
    return classes;
  }

  public click(toggle: boolean) {
    this.selected = toggle;
  }

  public unselect() {
    if (this.selected) {
      this.selected = false;
      this.$emit("click", this.selected);
    }
  }

  /**
   * Mouse events
   */
  private onMouseEnter() {
    if (!this.load) {
      this.hovered = true;
    }
  }
  private onMouseLeave() {
    if (!this.load) {
      this.hovered = false;
    }
  }
  private onMouseDown(event: any) {
    event.stopPropagation();
    if (!this.disable && !this.load) {
      if (this.type !== "push") {
        // Toggles or untoggles the button
        this.selected = !this.selected;
        if (this.type === "dropdown") {
          if (this.selected) {
            this.menu.show();
          } else {
            this.menu.hide();
          }
        }
      } else {
        this.selected = true;
      }
      this.$emit("click", this.selected);
    }
  }
  private onMouseUp(event: any) {
    event.stopPropagation();
    if (this.type === "push" && !this.disable && !this.load) {
      this.selected = false;
      this.$emit("click", this.selected);
    }
  }

  private onMenu(event: any) {
    this.$emit("menu", event);
  }

  private onClickOutside(event: any) {
    let wasButton = false;
    event.path.forEach((el: any) => {
      if (el === this.$refs.main) {
        wasButton = true;
      }
    });
    if (wasButton === false) {
      this.selected = false;
      this.menu.hide();
    }
  }
}
</script>