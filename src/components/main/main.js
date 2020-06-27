import { Component, Template, Attribute } from '@scoutgg/widgets'
import { create } from '../../services/meals'

import '../new-meal/new-meal'
import '../history/history'
import '../quick-log/quick-log'


import template from './main.pug'

@Component('kcal')
@Template(template)
export default class Main extends HTMLElement {
  async connectedCallback() {
    this.state = 'quick-log'
    this.render()
  }
  setState(state) {
    this.state = state
    this.render()
  }
}
