import { Component, Template, Attribute } from '@scoutgg/widgets'
import { setStarred, getStarred, list } from '../../services/ingredients'

import template from './ingredients.pug'

@Component('kcal')
@Template(template)
export default class Ingredients extends HTMLElement {
  async connectedCallback() {
    this.load()
  }
  async load(search='') {
    this.starred = await getStarred()
    const result = await list({
      ...(search.length && { search })
    })

    console.log(result)
    this.list =  result
    this.render()
  }
  async star(item) {
    await setStarred({ _id: item._id })
    this.load()
  }
  isStarred(item) {
    return this.starred?.find(s => s?._id === item?._id)
  }
  async searchIngredients() {
    if(this.debounce) {
      clearTimeout(this.debounce)
      this.debounce = null
    }
    this.debounce = setTimeout(async () => {
      let value = this.shadowRoot.querySelector('input')
      if(!value) {
        console.log('ELEMENT NOT FOUND')
        return
      }
      value =value.value
      console.log('SEARCHING', value)
      await this.load(value)
      this.debounce = null
    }, 500)
  }
}