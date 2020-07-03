import { Component, Template, Attribute } from '@scoutgg/widgets'

import template from './icon.pug'

@Component('kcal')
@Template(template)
@Attribute('name', String)
export default class Icon extends HTMLElement {
  async connectedCallback() {
  }
}
