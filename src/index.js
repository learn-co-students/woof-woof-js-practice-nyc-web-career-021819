window.addEventListener('DOMContentLoaded', (event) => {
console.log("dom has loaded")

const dogBarDiv = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const filterButton = document.querySelector('#good-dog-filter')
const goodDogText = "💙 I'm a good dog! Change me to a bag dog 🦴"
const badDogText = "❌ I'm a bad dog! Change me to a good dog 🦴"

let dogButton;

fetchDogs(mainDiv)

    filterButton.addEventListener('click', e => {
      e.preventDefault()
      let buttonText = e.target.innerText
      if(buttonText === "Filter good dogs: ON"){
        dogBarDiv.innerHTML = ""
        filterButton.innerText = "Filter good dogs: OFF"
        fetchDogs(mainDiv)
      } else {
        filterButton.innerText = "Filter good dogs: ON"
        dogBarDiv.innerHTML = ""
        dogInfo.innerHTML = ""
        fetchDogs(filterDogs)
      }
    })

  dogInfo.addEventListener('click', e => {
    e.preventDefault()
    if(e.target.dataset.type === "good-dog-button"){
      let dogId = dogButton.id
      if(e.target.innerText == goodDogText){
        dogButton.innerText = badDogText
        fetchADog(dogId, false)
      } else {
        dogButton.innerText = goodDogText
        fetchADog(dogId, true)
      }
    }
  });

  //helper functions
  function fetchDogs(callBack){
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(callBack)
  }

  function fetchADog(dogId, value){
    fetch(`http://localhost:3000/pups/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "isGoodDog": value
      })
    })
    .then(res => res.json())
    .then( (res) => {
      if(filterButton.innerText === "Filter good dogs: ON"){
        dogBarDiv.innerHTML = ""
        dogInfo.innerHTML = ""
        fetchDogs(filterDogs)
      }
    })
  }

  function createDogSpan(dog){
    const span = document.createElement('button')
    span.dataset.type = "dog-span"
    span.innerText = dog.name
    return span
  }

  function createDogBarDiv(dog){
    dogBarDiv.appendChild(createDogSpan(dog))
  }

  function dogInfoDiv(dog) {
    const dogImage = document.createElement('img')
    dogImage.src = dog.image
    const dogName = document.createElement('h2')
    dogName.innerText = dog.name
    dogButton = document.createElement('button')
    dogButton.id = dog.id
    dogButton.dataset.type = "good-dog-button"
    if(dog.isGoodDog) {
      dogButton.innerText = goodDogText
    } else {
      dogButton.innerText = badDogText
    }
    dogInfo.appendChild(dogImage)
    dogInfo.appendChild(dogName)
    dogInfo.appendChild(dogButton)
  }

  function mainDiv(dogsObject){
    dogsObject.forEach(dog => createDogBarDiv(dog))
    dogBarDiv.addEventListener('click', e => {
      let userClick = e.target.innerText
      if(e.target.dataset.type === "dog-span"){
        dogInfo.innerHTML = ""
        let dog = dogsObject.find(dog => dog.name === userClick)
        dogInfoDiv(dog)
      }//end if statement
    });//end EventListener
  }

  function filterDogs(dogsObject){
    dogsObject.forEach(dog => {
      if(dog.isGoodDog){
        createDogBarDiv(dog)
      }
    })
  }

});
