<template lang="pug">
.vuoz-input(
  :class="`${getClasses('container')} ${isDragging ? ' is-unselectable' : ''}`",
  style="height: auto; white-space: nowrap"
)
  .vuoz-input__label.is-flex.align-center(
    v-if="label.trim() !== '' && (labelPosition === 'left' || labelPosition === 'top')",
    :class="getClasses('label')"
  ) {{ label }}
  .vuoz-input__main(ref="main", :class="getClasses('main')")
    .required-placeholder(v-if="required === true") 
    input.has-text-regular(
      ref="input",
      :type="getInputType()",
      :placeholder="placeholder",
      :class="getClasses('input')",
      :disabled="disabled",
      v-model="value",
      @input="onInput",
      :style="`width: ${width};`"
    )
    template(v-if="(icon.trim() !== '' && !isNumber()) || type === 'password'")
      span.material-icons.is-unselectable(v-if="type !== 'password'") {{ icon }}
      span.material-icons.is-unselectable(
        v-if="type === 'password'",
        @click="togglePasswordVisibility"
      ) {{ passwordVisibility === false ? 'visibility' : 'visibility_off' }}
    template(v-if="isNumber()")
      .vuoz-input__number-stepper
        .material-icons.is-unselectable.up-arrow arrow_drop_down
        .material-icons.is-unselectable.down-arrow arrow_drop_down
        // Bad hack to keep the same size accross types
        span.material-icons.is-unselectable(style="visibility: hidden") search
        template(v-if="isNumber()")
          .up-actuator(@mousedown="onMouseDown('up', $event)")
          .down-actuator(@mousedown="onMouseDown('down', $event)")
  .vuoz-input__label(
    v-if="label.trim() !== '' && (labelPosition === 'right' || labelPosition === 'bottom')",
    :class="getClasses('label')"
  ) {{ label }}
</template>
<script lang="ts">
import { parse } from "node:path";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
/**
 * Vuoz input.
 * @displayName VuozInput
 */
@Component({
  name: "VuozInput",
})
export default class VuozComponent extends Vue {
  @Prop({ type: String, default: "text" }) readonly type!:
    | "text"
    | "email"
    | "password"
    | "ip"
    | "integer"
    | "uinteger"
    | "float";
  @Prop({ type: String, default: "" }) readonly label!: string;
  @Prop({ type: String, default: "top" }) readonly labelPosition!:
    | "top"
    | "left"
    | "bottom"
    | "right";
  @Prop({ type: String, default: "" }) readonly placeholder!: string;
  @Prop({ type: Boolean, default: false }) readonly required!: boolean;
  @Prop({ type: String, default: "small" }) readonly size!:
    | "tiny"
    | "small"
    | "normal"
    | "large";
  @Prop({ type: String, default: "auto" }) readonly width!: string;
  @Prop({ type: String, default: "" }) readonly initial!: string;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
  @Prop({ type: String, default: "regular" }) readonly weight!: string;
  @Prop({ type: Boolean, default: false }) readonly rounded!: boolean;
  @Prop({ type: Boolean, default: true }) readonly border!: boolean;
  @Prop({ type: Boolean, default: false }) readonly uppercase!: boolean;
  @Prop({ type: Boolean, default: false }) readonly smallcaps!: boolean;
  @Prop({ type: String, default: "medium-grey" }) readonly color!:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "darker-grey"
    | "dark-grey"
    | "medium-grey"
    | "transparent";
  @Prop({ type: Boolean, default: false }) readonly shadow!: boolean;
  @Prop({ type: String, default: "" }) readonly icon!: string;

  // Click/drag behavior for numerals
  private numDirection: "up" | "down" = "up";
  private maxDelta = 6;
  private isDragging = false;
  private pageY = 0;
  // Password behavior
  private passwordVisibility = false;
  // eslint-disable-next-line
  private passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  // Input value
  private value = "";
  private valid = false;

  @Watch("type", { immediate: true })
  onTypeChange() {
    this.$nextTick(() => {
      // Set format and eventual default value
      this.setFormat();
    });
  }

  @Watch("initial", { immediate: true })
  onInitialChange() {
    this.$nextTick(() => {
      // Sets default value
      this.setFormat()
    });
  }

  private getInputType() {
    switch (this.type) {
      case "text":
      case "integer":
      case "float": {
        return "text";
      }
      case "email":
      case "password": {
        return this.type;
      }
    }
  }

  private setFormat() {
    this.value = this.initial;
    if (this.isNumber() && (isNaN(this.value as any) || this.value.trim() === '')) {
      // Type is integer, uinteger or float, with no initial value or an initial value that is not a number
        this.value = "0";
    } else if (this.value.trim() === '') {
      this.value = "";
    }
  }

  private isNumber() {
    return (
      this.type === "integer" ||
      this.type === "uinteger" ||
      this.type === "float"
    );
  }

  private getClasses(type: string) {
    let classes = "";
    switch (type) {
      case "container": {
        classes += `is-${this.size} `;
        switch (this.labelPosition) {
          case "right":
          case "left": {
            classes += "is-inline-flex align-center ";
            break;
          }
          case "bottom":
          case "top": {
            classes += "is-inline-flex-column justify-center ";
            break;
          }
        }
        break;
      }
      case "label": {
        const opposite =
          this.labelPosition === "left"
            ? "right"
            : this.labelPosition === "right"
            ? "left"
            : this.labelPosition === "top"
            ? "bottom"
            : "top";
        switch (this.size) {
          case "tiny": {
            classes += `has-margin-${opposite}-s `;
            classes +=
              this.labelPosition === "bottom" || this.labelPosition === "top"
                ? "has-margin-left-s "
                : "is-flex align-center ";
            break;
          }
          case "small": {
            classes += `has-margin-${opposite}-s `;
            classes +=
              this.labelPosition === "bottom" || this.labelPosition === "top"
                ? "has-margin-left-s "
                : "is-flex align-center ";
            break;
          }
          case "normal":
          case "large": {
            classes += `has-margin-${opposite}-sm `;
            classes +=
              this.labelPosition === "bottom" || this.labelPosition === "top"
                ? "has-margin-left-sm "
                : "is-flex align-center ";
            break;
          }
        }
        break;
      }
      case "main": {
        classes += `is-${this.size} has-background-${this.color} has-border-${this.color}-shaded `;
        classes += this.border
          ? `has-border-${this.color}-shaded `
          : "has-border-none ";
        if (this.rounded) {
          classes += "is-rounded ";
        }
        if (this.uppercase) {
          classes += "is-uppercase ";
        }
        if (this.shadow) {
          classes += "has-shadow ";
        }
        if (this.disabled) {
          classes += "is-disabled ";
        }
        break;
      }
      case "input": {
        if (this.uppercase) {
          classes += "is-uppercase ";
        }
        if (this.smallcaps) {
          classes += "is-small-caps ";
        }
        break;
      }
    }
    return classes;
  }

  private onInput(event: any) {
    // ^[^@]+@[a-zA-Z0-9._-]+\\.+[a-z._-]+$
    let current = this.value;
    let updated = this.value;

    switch (this.type) {
      case "email": {
        console.warn("TODO: validate email");
        // Replace white spaces
        current = current.replace(/\s+/g, "");
        break;
      }
      case "password": {
        console.warn("TODO: validate password");
        // For password regex:
        // see: https://stackoverflow.com/a/21456918/1060921
        // see: https://stackoverflow.com/a/33589907/1060921
        current = current.replace(/\s+/g, "");
        this.valid = this.passwordPattern.test(current);
        break;
      }
      case "integer": {
        if (
          current.trim() === "" ||
          current.trim() === "-" ||
          event.data === null
        ) {
          current = "0";
        }
        // see: https://stackoverflow.com/questions/1898129/javascript-subtract-keycode
        // FIXME: charCode to be tested according to browsers and keyboard layouts?
        const code = event.data?.charCodeAt(0);
        let sign = "";
        const actual = parseInt(current);
        if ((code === 45 || code === 109 || code === 149) && actual === 0) {
          sign = "-";
        }
        updated = `${sign}${actual}`;
        break;
      }
      case "uinteger": {
        const actual = parseInt(current);
        if (actual >= 0) {
          updated = `${parseInt(current)}`;
        } else {
          updated = "0";
        }
        break;
      }
      case "float": {
        console.warn("TODO: float behavior");
        console.log(current);
        // Juste un point => NaN
        // Point et un choffre après le zéro initial => le chiffre
        // Point tout seul après chiffre au-dessus de zéro : pas pris en compte
        // Signe moins après select all => NaN
        updated = `${parseFloat(current)}`;
        break;
      }
    }

    this.value = updated;
    this.$emit("change", {
      type: this.type,
      value: this.value,
      valid: this.valid,
    });
  }

  private onMouseDown(direction: "up" | "down", event: MouseEvent) {
    this.numDirection = direction;
    this.pageY = event.pageY;

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onDrag = this.onDrag.bind(this);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onDrag);
  }

  private onDrag(event: any) {
    if (!this.isDragging) {
      const delta = Math.abs(Math.abs(event.pageY) - this.pageY);
      if (delta >= this.maxDelta) {
        this.isDragging = true;
        document.documentElement.classList.add("is-unselectable");
      }
    }
    if (this.isDragging) {
      const delta = this.pageY - event.pageY;
      this.pageY = event.pageY;

      const current = this.value;
      switch (this.type) {
        case "integer": {
          const updated = parseInt(current) + delta;
          this.value = `${updated}`;
          break;
        }
        case "uinteger": {
          const updated = parseInt(current) + delta;
          if (updated >= 0) {
            this.value = `${updated}`;
          }
          break;
        }
        case "float": {
          let updated = parseFloat(current);
          updated += delta * 0.1;
          this.value = `${updated.toFixed(2)}`;
          break;
        }
      }

      this.$emit("change", {
        type: this.type,
        value: this.value,
        valid: true,
      });
    }
  }

  private onMouseUp(event: any) {
    document.removeEventListener("mousemove", this.onDrag);
    document.removeEventListener("mouseup", this.onMouseUp);

    const wasDragging = this.isDragging;
    this.isDragging = false;
    document.documentElement.classList.remove("is-unselectable");

    if (wasDragging) {
      return;
    }

    switch (this.numDirection) {
      case "up": {
        switch (this.type) {
          case "integer":
          case "uinteger": {
            let current = parseInt(this.value);
            current++;
            this.value = `${current}`;
            break;
          }
          case "float": {
            const current = `${parseFloat(this.value) + 1}`;
            this.value = current;
            break;
          }
        }
        break;
      }
      case "down": {
        switch (this.type) {
          case "integer": {
            let current = parseInt(this.value);
            current--;
            this.value = `${current}`;
            break;
          }
          case "uinteger": {
            let current = parseInt(this.value);
            if (current > 0) {
              current--;
              this.value = `${current}`;
            }
            break;
          }
          case "float": {
            const current = `${parseFloat(this.value) - 1}`;
            this.value = current;
            break;
          }
        }
        break;
      }
    }

    this.$emit("change", {
      type: this.type,
      value: this.value,
      valid: true,
    });
  }

  private togglePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
    const el = this.$refs.input as HTMLInputElement;
    if (this.passwordVisibility) {
      el.type = "text";
    } else {
      el.type = "password";
    }
  }
}
</script>