document.addEventListener('DOMContentLoaded', function() {
  fetchDogs()

  document.querySelector('#dog-bar').addEventListener('click' , function(e) {
    fetchDog(e.target.id)
  })

  document.querySelector('#good-dog-filter').addEventListener('click', function(e) {
    fetchDogsFilter(e)
  })

})

function fetchDogs() {
  fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => renderDogs(json))
}

function fetchDogsFilter(e) {
  fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => filterButton(e, json))
}

function fetchDog(id) {
  fetch(`http://localhost:3000/pups/${id}`)
  .then(resp => resp.json())
  .then(json => renderInfo(json))
}

function patchDog(id, value) {
  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: value
    })
  })
  .then(response => response.json())
}

function renderDogs(json) {
  const main = document.querySelector('#dog-bar')
  json.forEach(dog => {
    const span = document.createElement('span')
    span.innerText = dog.name
    span.id = dog.id

    main.appendChild(span)
  })
}

function renderInfo(json) {
  const dogInfo = document.querySelector('#dog-info')
  let isGoodDog
  if (json.isGoodDog === true) {
    isGoodDog = "Good Dog!"
  } else if (json.isGoodDog === false) {
    isGoodDog = "Bad Dog!"
  }
  dogInfo.innerHTML = `<img src=${json.image}> <h2>${json.name}</h2> <button id="dogButton" dogId=${json.id}>${isGoodDog}</button>`
  document.querySelector('#dogButton').addEventListener('click', buttonClick)
}

function buttonClick(e) {
  if (e.target.innerHTML === "Good Dog!") {
    e.target.innerHTML = 'Bad Dog!'
    patchDog((e.target.attributes.getNamedItem('dogId').value), false);
  } else if (e.target.innerHTML === "Bad Dog!") {
    e.target.innerHTML = "Good Dog"
    patchDog((e.target.attributes.getNamedItem('dogId').value), true);
  }
}

function filterButton(e, json) {

  goodDogs = []

  if (e.target.innerText === "Filter good dogs: OFF") {
    e.target.innerText = "Filter good dogs: ON"
    json.forEach(function (dog) {
      if (dog.isGoodDog === false) {
        goodDogs.push(dog.name)
      }
    })

    Array.from(document.querySelectorAll("span")).forEach(function(span) {
      if (goodDogs.includes(span.innerText)) {
        span.style.display = 'none'
      }
    })

  } else if (e.target.innerText === "Filter good dogs: ON") {
    e.target.innerText = "Filter good dogs: OFF"
    Array.from(document.querySelectorAll("span")).forEach(function(span) {
      span.style.display = ''
    })
  }
}
