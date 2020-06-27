import { Component, Template, Attribute } from '@scoutgg/widgets'
import { create, list as listMeals, kcalFor } from '../../services/meals'
import { list as listRecipes } from '../../services/recipes'
import { list as listIngredients } from '../../services/ingredients'

import template from './new-meal.pug'

@Component('kcal')
@Template(template)
export default class NewMeal extends HTMLElement {
  async connectedCallback() {
    this.form = {
      ingredients: [{},{}],
    }
    this.ingredientSuggestions = {}
  }

  setInput(key, e) {
    const input = this.shadowRoot.querySelector('input[name=title]').value
    this.form[key] = input
    if(key === 'title' && input.length > 2) {
      this.searchMeals(input)
    }
    if(!input.length) {
      this.clearSuggestions()
    }
    this.render()
  }

  setIngredient(index, key, e) {
    let input = this.shadowRoot.querySelector(`input[name=${key}-${index}]`)
    if(!input) return
    input = input.value
    if(input.length > 2 && key === 'name') {
      this.searchIngredients(input, index)
    }
    if(!input.length) {
      this.clearSuggestions()
    }
    this.form.ingredients[index][key] = input
    this.render()
  }

  addIngredient() {
    this.form.ingredients.push({})
    this.render()
  }

  removeIngredient(index) {
    this.form.ingredients.splice(index, 1)
    this.render()
  }

  async searchMeals(str) {
    this.mealSuggestions = await listRecipes({ search: str })
    this.render()
  }

  async useMealSuggestion(suggestion) {
    delete suggestion._id
    this.form.ingredients = this.form.ingredients.map(i => {
      delete i._id
      return i
    })
    this.form = suggestion
    this.clearSuggestions() // renders
  }
  async searchIngredients(str, index) {
    this.ingredientSuggestions[index] = await listIngredients({ search: str })
    this.render()
  }
  async useIngredientSuggestion(index, suggestion) {
    delete suggestion._id
    this.form.ingredients[index] = suggestion
    this.clearSuggestions() // renders
  }

  clearSuggestions() {
    this.mealSuggestions = []
    Object.keys(this.ingredientSuggestions).forEach(key => {
      this.ingredientSuggestions[key] = []
    })
    this.render()
  }

  async save() {
    const response = await create(this.form)
    if(response.ok) {
      alert('saved')
      this.emit('changeState', { state: 'quick-log' })
    } else {
      alert(response.error || 'Unknown error')
    }
  }

  get totalCalories() {
    return kcalFor(this.form)
  }
}
