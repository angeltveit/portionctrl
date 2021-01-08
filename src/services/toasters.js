
const QUEUE = []

export default class ToasterService {
  constructor(id='toaster-service', parentElement=document.body) {

    // Find or create alert component
    let alertComponent = document.querySelector('.' + id)
    if(!alertComponent) {
      alertComponent = document.createElement('kcal-toaster-popup')
      alertComponent.classList.add(id)

      parentElement.appendChild(alertComponent)
    }
    this.alertComponent = alertComponent
  }
  emit(data) {
    const { action } = data
    if(action === 'closed') {
      this.current = null
      this.consume()
    }
  }

  alert(message, opts) {
    QUEUE.push({ message, ...opts })
    this.consume()
  }


  subscribe(eventName, eventListener='emitter') {
    if(!eventName) return console.warn('Subscribe called without an eventName')
    if(eventListener === 'emitter') {
      return emitter.on(eventName, (opts) => {
        this.alert(opts.message, opts)
      })
    } else if(eventListener === 'window') {
      return window.addEventListener(eventName, this.consume)
    }
    console.warn('Subscribe ran without required option "emitter" or "window"')
  }

  consume() {
    // Check if showing a popup
    if(this.current) return
    if(QUEUE.length) {
      const alert = QUEUE.shift()
      this.current = alert

      this.alertComponent.trigger({
        ...this.current,
      })
    }
  }
}