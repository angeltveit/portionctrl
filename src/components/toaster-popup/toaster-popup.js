import { Component, Template, Attribute } from '@scoutgg/widgets'
import moment from 'moment'

import template from './toaster-popup.pug'
const LEVELS = ['info', 'warning', 'danger', 'success']

@Component('kcal')
@Template(template)
export default class ToasterPopup extends HTMLElement {
  async connectedCallback() {
    
  }
  trigger(data) {
    this.applyState({
      level: 'info',
      title: '',
      message: '',
      ...data,
    })
    this.applyState({
      state: 'open',
    })
  }

  close() {
    this.applyState({
      state: 'closing',
    })
    window.toasterService.emit({ action: 'closing' })


    setTimeout(() => {
      this.applyState({
        confirm: null,
        level: null,
        message: null,
        title: null,
        state: 'closed',
      })
      window.toasterService.emit({ action: 'closed' })
    }, this.timeout)
  }
  applyState(state) {
    Object.assign(this, state)
    this.render()
  }
  get state() {
    return this._state || 'closed'
  }

  set state(state) {
    this.dataset.state = state
    this._state = state
    this.render()
  }

  get level() {
    return this._level || 'info'
  }

  set level(level='info') {
    this._level = (LEVELS.includes(level) && level) || 'info'
    this.dataset.level = this._level
    this.render()
  }
}
