<template lang='pug'>
.is-inline-flex-column(style="align-items: flex-end")
  .is-flex-column.is-fullwidth.has-padding-bottom-md.has-border-bottom-medium-grey 
    .has-text-large.has-text-bold
      slot(name="title") Sign In
    .has-text-small.has-margin-top-sm
      slot(name="subtitle") Please enter your credentials.
  vuoz-input(type="email", label="Email", labelPosition="left", icon="alternate_email", rounded, @change="onEmailChange", :disabled="loading").has-padding-sm
  vuoz-input(type="password", label="Password", labelPosition="left", rounded, @change="onPasswordChange", :disabled="loading").has-padding-sm
  .is-flex.is-fullwidth.has-text-large.has-padding-top-sm.has-border-top-medium-grey(style="justify-content: flex-end;")
    vuoz-button(color="secondary", size="small", weight="bold", uppercase, rounded, border, :disabled="!valid", :loading="loading", @click="onSubmit").has-margin-left-s.has-margin-top-s.has-margin-bottom-s
      template(v-slot:main) Submit
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import VuozInput from '@/components/input/index.vue'
import VuozButton from '@/components/button/index.vue'
/**
 * Vuoz animated loading icon.
 * @displayName VuozSignIn
 */
@Component({
  name: 'VuozSignIn',
  components: {
    VuozInput,
    VuozButton
  }
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, default: 'normal' }) readonly size!: 'timy' | 'small' | 'normal' | 'large'

  // Inputs state
  private valid = false
  private email: { type: string; value: string; valid: boolean } = { type: 'email', value: '', valid: false }
  private password: { type: string; value: string; valid: boolean } = { type: 'password', value: '', valid: false }
  // Loading state
  private loading = false

  @Watch('email')
  @Watch('password')
  private onValidate() {
    this.valid = this.email.valid && this.password.valid
  }

  private onEmailChange(event: any) {
    console.log(event)
    this.email = event
  }

  private onPasswordChange(event: any) {
    console.log(event)
    this.password = event
  }

  private onSubmit(toggle: boolean) {
    if (toggle) {
      this.loading = true
      this.$emit('submit', {
        email: this.email.value,
        password: this.password.value
      })
    }
  }

  public reset(message: string) {
    console.log('reset with message', message)
  }

}
</script>