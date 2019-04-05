document.addEventListener('DOMContentLoaded', function() {
console.log('DOM fully loaded and parsed');

//Define variables and items
const dogBar = document.getElementById('dog-bar')
const dogContainer = document.getElementById('dog-summary-container')
const filterButton = document.getElementById('good-dog-filter')

//Events
dogBar.addEventListener('click', showDogDetails);
dogContainer.addEventListener('click', switchIsGoodDog);
filterButton.addEventListener('click', toggleFilter);

//Render dogs
function getDogs() {
  fetch('http://localhost:3000/pups')
  .then((res) => {return res.json()})
  .then((dogs) => {
    let output = ''
    dogs.forEach((dog) => {
      output += `<span id=${dog.id} class="all-dogs">${dog.name}</span>`
    })
    dogBar.innerHTML = output
  })
}

//Render good dogs
function getGoodDogs() {
  fetch('http://localhost:3000/pups/?isGoodDog=true')
  .then((res) => {return res.json()})
  .then((dogs) => {
    let output = ''
    dogs.forEach((dog) => {
      output += `<span id=${dog.id} class="all-dogs">${dog.name}</span>`
    })
    dogBar.innerHTML = output
  })
}

//Show dog details
function showDogDetails(e) {
  if (e.target.className === "all-dogs") {
    let dog = e.target
    let dogId = dog.id
    fetch(`http://localhost:3000/pups/${dogId}`)
    .then((res) => {return res.json()})
    .then((pup) => {
      let output = ''
      if (pup.isGoodDog === true) {
      output += `
        <div class="dog-details-individual" id="${pup.id}">
        <h2>ID: ${pup.id} </h2>
        <h2>Name: ${pup.name} </h2>
        <img src="${pup.image}" height="350" width="350" > <br>
        <button id="dogButton" data-type = "good"> Good Dog! </button>
        </div> `
      dogContainer.innerHTML = output
    } else {
      output += `
        <div class="dog-details-individual" id="${pup.id}">
        <h2>ID: ${pup.id} </h2>
        <h2>Name: ${pup.name} </h2>
        <img src="${pup.image}" height="350" width="350" > <br>
        <button id="dogButton" data-type = "bad"> Bad Dog! </button>
        </div> `
      dogContainer.innerHTML = output
    }
    })
  }
}

//Switch Good Dog boolean and PATCH request to API
function switchIsGoodDog(e) {
  if (e.target.id === "dogButton") {
    let dogId = e.target.parentElement.id
    if (e.target.dataset.type === "bad") {
      fetch(`http://localhost:3000/pups/${dogId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({isGoodDog:true})
      })
      e.target.innerText = 'Good Dog!'
    } else if (e.target.dataset.type === "good") {
      fetch(`http://localhost:3000/pups/${dogId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({isGoodDog:false})
      })
      e.target.innerText = 'Bad Dog!'
    }
  }
}

//Toggle filter method
function toggleFilter(e) {
  // console.log('e.target', e.target.innerText);
  if (e.target.innerText === "Filter good dogs: OFF") {
    e.target.innerText = "Filter good dogs: ON"
    getGoodDogs()
  }
  else if (e.target.innerText === "Filter good dogs: ON") {
    e.target.innerText = "Filter good dogs: OFF"
    getDogs()
  }
}

getDogs();
})
