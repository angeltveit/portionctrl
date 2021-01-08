import { Component, Template, Attribute } from '@scoutgg/widgets'
import moment from 'moment'
import { create } from '../../services/meals'

import '../new-meal/new-meal'
import '../history/history'
import '../quick-log/quick-log'
import '../ingredients/ingredients'
import '../auth/auth'


import template from './main.pug'

@Component('kcal', {  })
@Template(template)
export default class Main extends HTMLElement {
  async connectedCallback() {
    if(!localStorage.token) {
      this.state = 'auth'
    } else {
      this.state = 'quick-log'
    }
    navigator.geolocation.getCurrentPosition((position) => {
      alert(`Location LAT:${position.coords.latitude} LONG: ${position.coords.longitude}`)
    })
    this.render()
  }
  setState(state) {
    this.state = state
    this.render()
  }
  
  logout() {
    const yes = confirm('Are you sure you want to log out?')
    if(!yes) return
    localStorage.clear()
    location.reload()
  }
  get moment() {
    return moment
  }
  get noShadow() {
    return true
  }
}
