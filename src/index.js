// DOM elements & variables
const baseUrl = 'http://localhost:3000/pups'
const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const dogButton = document.getElementById('good-dog-filter')
let allDoggos;

// event listeners
dogBar.addEventListener('click', (e) => {
  if (e.target.className === "dog-span") {
    // debugger
    let id = e.target.dataset.id
    let name = e.target.dataset.name
    let image = e.target.dataset.image
    let isGoodDog = e.target.dataset.isgooddog

    // console.log(e.target.dataset);
    let dog = {
      id,
      name,
      image,
      isGoodDog
    }

    renderDog(dog)
  }
})

dogButton.addEventListener('click', e => {
  // console.log(e.target)
  // debugger
  if (dogButton.innerHTML.includes('OFF')) {
    let goodDoggos = allDoggos.filter(doggo => {
      return doggo.isGoodDog === "true"
    })
    renderDogs(goodDoggos)
    dogButton.innerText = 'Filter good dogs: ON'
  } else {
    renderDogs(allDoggos);
    dogButton.innerText = 'Filter good dogs: OFF'
  }
})

dogInfo.addEventListener('click', e => {
    let currentDogValue = e.target.dataset.isgooddog
    if(currentDogValue === "false"){
      // debugger
      currentDogValue = "true"
      e.target.dataset.isgooddog = "true"
    }else if (currentDogValue === "true") {
      currentDogValue = "false"
      e.target.dataset.isgooddog = "false"
    }

    // debugger
    const theDogObj = allDoggos.find(doggo =>
      doggo.id === parseInt(e.target.dataset.id))
    theDogObj.isGoodDog = currentDogValue
    // debugger

  if (e.target.dataset.action === "toggle") {
    fetch(`${baseUrl}/${e.target.dataset.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        isGoodDog: currentDogValue
      })
    })
    .then(res => res.json())


  }

})



// convert to HTML
function dogToHTML(dog) {
  // debugger
  return  `<span class='dog-span' data-id=${dog.id} data-name=${dog.name} data-image=${dog.image} data-isGoodDog=${dog.isGoodDog}>${dog.name}</span>`
}

function dogInfoToHTML(dog) {
  // debugger
  return  `
          <img src=${dog.image}>
          <h2>${dog.name}</h2>
          <button data-action='toggle' data-id=${dog.id} data-isGoodDog=${dog.isGoodDog}>toggle</button>
          `
}

// add elements to DOM
function renderDogs(dogs) {
  dogBar.innerHTML = dogs.map(dogToHTML).join('')
}

function renderDog(dog) {
  dogInfo.innerHTML = dogInfoToHTML(dog)
}

// fetches
function getAllDogs() {
  return fetch(baseUrl)
  .then(res => res.json())
}

// start app
function init() {
  getAllDogs().then(dogs => {
    renderDogs(dogs)
    allDoggos = dogs
    console.log(allDoggos)
  })
}

init()
