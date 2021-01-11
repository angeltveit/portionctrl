import { Component, Template, Attribute } from '@scoutgg/widgets'

import {input} from '../../utils/index'

import template from './progress-ring.pug'

const CIRCLES = ['empty', 'success', 'warning', 'danger']

@Component('kcal')
@Template(template)
@input('success')
@input('warning')
@input('danger')
export default class ProgressRing extends HTMLElement {
  async connectedCallback() {
    this.radius = 70
    this.circumference = this.radius * 2 * Math.PI
    this._oldValue = 0

    this.buildCircles()
    
    this.render()
  }

  buildCircles() {
    this.circles = {
      success: {
        getOffset: (value) => {
          const p = (value / this.success) * 100
          console.log('success result', p)
          return Math.min(100, Math.max(0, p))
        },
      },
      warning: {
        getOffset: (value) => {
          const p = (value / this.success) * 100
          return Math.min(100, Math.max(0, p - 100))
        },
      },
      danger: {
        getOffset: (value) => {
          const p = (value / this.success) * 100
          return Math.min(100, Math.max(0, p - 200))
        },
      },
    }

    CIRCLES.forEach(c => {
      const el = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      el.setAttribute('height', '150')
      el.setAttribute('width', '150')
      let progress = this.progressify(100)
      
      if(c !== 'empty') {
        progress = this.progressify(0)
        console.log(progress)
      }

      el.innerHTML = `

        <circle
          class="${c}"
          style="stroke-dasharray: ${this.circumference}, ${this.circumference}; stroke-dashoffset: ${progress}"
          stroke-width="4"
          stroke="url(#gradient-${c})"
          fill="transparent"
          r="${this.radius}"
          cx="75"
          cy="75"
        ></cricle>
      `
      this.shadowRoot.appendChild(el)
    })

    this.ready = true
    this.render()
  }

  progressify(value) {
    const offset = this.circumference - value / 100 * this.circumference
    return offset
  }
  renderProgress() {    
    if(!this.ready) return
    Object.keys(this.circles).forEach((c, index) => {
      const offset = this.progressify(this.circles[c].getOffset(this.value))
      const el = this.shadowRoot.querySelector(`circle.${c}`)

      setTimeout(() => {
        el.style.strokeDashoffset = offset
      }, (index * 500) )
    })
  }

  set value(value) {
    this._oldValue = this._value
    this._value = value
    this.renderProgress()
  }

  get value() {
    return this._value
  }

  get progress() {
    return this.circumference - this.percent / 100 * this.circumference
  }
}
