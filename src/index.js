import "./styles.css";


const API_BASE_URL = 'https://www.algoexpert.io/api/testimonials';
const template = message => {
  const testimonialElm = document.createElement('p')
  testimonialElm.classList.add('testimonial')
  testimonialElm.textContent = message
  return testimonialElm
}
const container = document.querySelector('#app')

let id = ''
let hasNext = false
let canFetch = true

const render = async (result) => {
  if (result && result.testimonials) {
    const fragment = document.createDocumentFragment()

    result.testimonials.forEach(({message,id:thisID}, index) => {
      if(index===result.testimonials.length-1) id=thisID
      console.log(message)
      fragment.appendChild(template(message))
    })

    // console.log(res)
    container.appendChild(fragment)
    hasNext = result.hasNext
    canFetch = true
  }
  // document.getElementById("app").innerHTML = 'hi'
}

const fetchTm = async () => {
  canFetch = false
  // const response = await fetch(`${API_BASE_URL}?limit=${length}&after=${id}`)
  const URL = id?`${API_BASE_URL}?limit=5&after=${id}`:`${API_BASE_URL}?limit=5`
  const response = await fetch(URL)
  const result = await response.json()
  console.log(result)
  render(result)
}


function scrollAction () {
  if(hasNext && canFetch) {
    const space = this.scrollHeight - (this.scrollTop + this.clientHeight)
    // console.log(this.scrollHeight)
    // console.log(this.scrollTop)
    // console.log(this.clientHeight)
    if(space > 0) return
    fetchTm()
  }
}

container.addEventListener('scroll', scrollAction)

fetchTm()






// render()


// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use the same configuration as Parcel to bundle this sandbox, you can find more
//   info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `
