document.addEventListener('DOMContentLoaded', function() {
  fetchDogs()
})

function fetchDogs() {
  fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => renderDogs(json))
}

function fetchDog() {
  fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => dogInfo(json))
}

function renderDogs(json) {
  const main = document.querySelector('#dog-bar')
  json.forEach(dog => {
    const span = document.createElement('span')
    span.innerText = dog.name
    main.appendChild(span)
  })
}

// function dogInfo(json) {
//   const main = document.querySelector('#dog-bar')
//   main.addEventListener('click', function(e) {
//     console.log(e.target.innerText);
//     json.forEach(dog => {
//       const div = document.querySelector('#dog-info')
//
//       div.innerHTML = `
//       <img src=${dog.image}> <h2>${dog.name}</h2> <button>${dog.isGoodDog}</button>
//       `
//
//       // div.appendChild('')
//       // div.appendChild('')
//       // div.appendChild('')
//     })
//
//   })
// }
