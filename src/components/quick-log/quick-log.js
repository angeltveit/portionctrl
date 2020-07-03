import { Component, Template, Attribute } from '@scoutgg/widgets'
import { create, list as listMeals, kcalFor } from '../../services/meals'
import { list, getStarred } from '../../services/ingredients'
import moment from 'moment'

import template from './quick-log.pug'

@Component('kcal')
@Template(template)
export default class QuickLog extends HTMLElement {
  async connectedCallback() {
    this.load()
  }
  async load() {
    this.list = await getStarred()
    this.today = await listMeals()
    this.render()
  }
  setState(state) {
    this.state = state
    this.render()
  }
  async quickLog(ingredient) {
    const yes = confirm('Are you sure?')
    if(!yes) return
    delete ingredient._id
    const response = await create({
      title: ingredient.name,
      ingredients: [ingredient],
    })
    if(response.ok) {
      alert('saved')
      this.load()
    } else {
      alert(response.error || 'Unknown error')
    }
  }
  status(kcal) {
    if(kcal <= 999) return 'success'
    if(kcal <= 1499) return 'warning'
    return 'danger'
  }
  get totalCalories() {
    if(!this.today) return 0
    const meals = (this.today || []).filter(meal => {
      return moment(meal.createdAt).isSame(moment(), 'day')
    })
    return meals.reduce((prev, curr) => {
      prev += +kcalFor(curr)
      return prev
    }, 0)
  }
}
