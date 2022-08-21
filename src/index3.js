import './styles.css'
import debounce from './utils/debounce'
import throttle from './utils/throttle'

const API_BASE_URL = 'https://www.algoexpert.io/api/testimonials'
const template = message => `<p class="testimonial">${message}</p>`
const container = document.querySelector('#app')

let id = ''
let hasNext = false
let canFetch = true
let data = []

const render = async result => {
  if (result && result.testimonials) {
    const temp = result.testimonials.map(({message, id: thisID}, index) => {
      if (index === result.testimonials.length - 1) id = thisID
      return template(message)
    })

    // console.log(res)
    data.push(temp)
    hasNext = result.hasNext
    canFetch = true
    container.innerHTML = data.join('')
  }
}

const fetchTm = async () => {
  canFetch = false
  const URL = id ? `${API_BASE_URL}?limit=5&after=${id}` : `${API_BASE_URL}?limit=5`
  const response = await fetch(URL)
  const result = await response.json()
  console.log(result)
  render(result)
}

function scrollAction() {
  if (hasNext && canFetch) {
    const space = this.scrollHeight - this.scrollTop - this.clientHeight
    // console.log(this.scrollHeight)
    // console.log(this.scrollTop)
    // console.log(this.clientHeight)

    if (space > 0) {
      return
    } else {
      fetchTm()
    }
    // fetchTm()
  }
}

window.addEventListener('scroll', debounce(scrollAction, 1000))
fetchTm()
