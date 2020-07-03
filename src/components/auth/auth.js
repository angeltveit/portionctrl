import { Component, Template, Attribute } from '@scoutgg/widgets'
import moment from 'moment'
import { login } from '../../services/auth'
import template from './auth.pug'

@Component('kcal')
@Template(template)
export default class Auth extends HTMLElement {
  async connectedCallback() {
    this.form = {}
    this.render()
  }
  async login() {
    const response = await login({
      phone: +this.form.phone,
      ...(this.form.code && {code: +this.form.code}),
    })
    delete this.form.code
    if(response.state === 'otp') {
      this.state = 'otp'
      return this.render()
    }
    if(response.error) {
      this.state = 'login'
      this.error = 'Wrong code. Please try again.'
      return this.render()
    }
    if(!response.token) {
      this.error = 'Something went wrong. Please try again.'
      return this.render()
    }
    localStorage.token = response.token
    this.emit('changeState', { state: 'quick-log' })
  }
  setValue(key, e) {
    const input = this.shadowRoot.querySelector(`input[name=${key}]`).value
    this.form[key] = input
    this.render()
  }
}
