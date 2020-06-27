import { Component, Template, Attribute } from '@scoutgg/widgets'
import { list, remove, kcalFor } from '../../services/meals'

import template from './history.pug'

@Component('kcal')
@Template(template)
export default class History extends HTMLElement {
  async connectedCallback() {
    this.load()
  }
  async load() {
    this.list = await list({ hello: 'world'})
    this.list = this.list.sort((a, b) => {
      return (new Date(b.createdAt)) - (new Date(a.createdAt))
    })
    this.render()
  }
  async remove(id) {
    const yes = confirm('Are you sure?')
    if(!yes) return

    await remove({ _id: id })
    this.load()
  }
  get kcalFor() {
    return kcalFor
  }
}
