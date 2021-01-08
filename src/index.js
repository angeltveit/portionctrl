import { bootstrap } from '@scoutgg/widgets'
import { vdom as renderer } from './utils/vdom-renderer'
import rerenderPlugin from '@scoutgg/widgets/cjs/plugins/rerender.js'
import { emit } from './utils'
import patch from 'virtual-dom/patch'
import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'

// Notification service
import ToasterService from './services/toasters'

// Import the components you want to use
import './components/main/main'
import './components/icon/icon'
import './components/toaster-popup/toaster-popup'

if(module.hot) {
  module.hot.accept()
}

window.toasterService = new ToasterService()

// Bootstrap Widgets (Start it)
bootstrap([
  emit,
  renderer({ patch, VNode: h, diff}),
  rerenderPlugin({}),
])
