import { Component, Template, Attribute } from '@scoutgg/widgets'
import { setStarred, getStarred, list } from '../../services/ingredients'

import template from './ingredients.pug'

@Component('kcal')
@Template(template)
export default class Ingredients extends HTMLElement {
  async connectedCallback() {
    this.load()
  }
  async load() {
    this.starred = await getStarred()
    this.list = await list()
    this.render()
  }
  async star(item) {
    await setStarred({ _id: item._id })
    this.load()
  }
  isStarred(item) {
    return this.starred.find(s => s._id === item._id)
  }
}