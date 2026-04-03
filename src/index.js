import './style.css'
import formHandler from './modules/formHandling.js'
import { render } from './modules/rendering.js'

const init = () => {
    formHandler()
    render()
}

document.addEventListener('DOMContentLoaded', init)
