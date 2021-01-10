import { Component, Template, Attribute } from '@scoutgg/widgets'
import moment from 'moment'
import { create } from '../../services/meals'
import { list as listMissions } from '../../services/missions'

import '../new-meal/new-meal'
import '../history/history'
import '../quick-log/quick-log'
import '../ingredients/ingredients'
import '../auth/auth'
/*
Ideas:

 * XP-bar on main
 * Missions-tab
 * 

*/

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
    
    const { missions } = await listMissions()
    missions.forEach((mission) => {
      window.toasterService.alert('new-mission', mission)
    })
    this.render()
  }
  setState(state) {
    this.state = state
    this.render()
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.geo = `Location LAT:${position.coords.latitude} LONG: ${position.coords.longitude}`
      this.render()
    })
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
