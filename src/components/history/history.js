import { Component, Template, Attribute } from '@scoutgg/widgets'
import { list, remove, kcalFor } from '../../services/meals'
import moment from 'moment'

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
  status(kcal) {
    if(kcal <= 999) return 'success'
    if(kcal <= 1499) return 'warning'
    return 'danger'
  }
  totalCalories(day) {
    if(!this.list) return 0
    const meals = this.list.filter(meal => {
      return moment(meal.createdAt).isSame(moment(day), 'day')
    })
    return meals.reduce((prev, curr) => {
      prev += +kcalFor(curr)
      return prev
    }, 0)
  }
  get kcalFor() {
    return kcalFor
  }
}
