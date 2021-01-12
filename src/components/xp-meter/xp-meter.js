import { Component, Template, Attribute } from '@scoutgg/widgets'

import {input} from '../../utils/index'

import template from './xp-meter.pug'

@Component('kcal')
@Template(template)
@input('xp')
export default class XpMeter extends HTMLElement {
  async connectedCallback() {
    this.render()
  }
}
