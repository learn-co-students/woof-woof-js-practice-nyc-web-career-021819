
document.addEventListener("DOMContentLoaded", function() {

//get the dog bar
//make a fetch to get all of the pup objects
//add a span with the pup's name to the dog bar

const dogBar = document.querySelector("#dog-bar") // the upper bar
const url = "http://localhost:3000/pups" // the url that needs to be fetched
const container = document.querySelector("#dog-summary-container") // the entire container that has a div dog info child
let dogs = []
let dog = []
let goodDogs = []
const dogInfo = document.querySelector("#dog-info")  // div area to show each dog info
const filterButton = document.querySelector("#good-dog-filter")

  fetch(url)
    .then(function(response) {
      return response.json()
    })
    .then(function(dogData) {
      dogs = dogData   //sets the dogs array to the data gotten from the api key
      createSpan(dogs)
    //   dogData.forEach(function(dog) {
    //     const dogSpan = document.createElement("span")
    //     dogSpan.innerText = dog.name
    //     dogBar.appendChild(dogSpan)
    // })
  })

  function createSpan(array) {
    array.forEach(function(dog) {
      const dogSpan = document.createElement("span")
      dogSpan.innerText = dog.name
      dogBar.appendChild(dogSpan)
  })
  }
//user clicks on a pup's span in the dog bar, that pup's info (image, name, and isGoodDog status
// //should show up in the div with the id of "dog-info"
// //img tag with the pup's image url
// //h2 with the pup's name
// // button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false

      dogBar.addEventListener("click", function(e) {
        if (e.target.tagName === "SPAN") {
          const name = e.target.innerText
          dog = dogs.find(function(dogObj) {   //setting dog to equal this dogs.find thing to pinpoint one dog
            return dogObj.name === name
          })
          dogInfo.innerHTML = ""  // at the beginning for the click, sets the inner hmtl to blank
          const dogImage = document.createElement("img")      //sets the image and appends
            dogImage.src = dog.image
            dogInfo.appendChild(dogImage)

          const dogName = document.createElement("h2")        //sets the names and appends
            dogName.innerText = dog.name
            dogInfo.appendChild(dogName)

          const goodBadButton = document.createElement("button")    //sets the button and appends
            goodBadButton.id = "button"                             // adds id to the button as "button" for search later
            if (dog.isGoodDog === true) {
              goodBadButton.innerText = "Good Dog!"
            } else {
              goodBadButton.innerText = "Bad Dog!"
            }
            dogInfo.appendChild(goodBadButton)
        }
        const button = document.querySelector("#button")
          button.addEventListener("click", function(e) {
            if (e.target.innerText === "Bad Dog!") {
              e.target.innerText = "Good Dog!"
              fetch(`http://localhost:3000/pups/${dog.id}`, {   //gets info for specific dog with that id
                method: "PATCH",  //method said to patch so we can update
                headers: {
                    'Content-Type': 'application/json'  // required
                  },
                body: JSON.stringify({isGoodDog: true})   // body must be stringify-d
              })
          } else {
            e.target.innerText = "Bad Dog!"
            fetch(`http://localhost:3000/pups/${dog.id}`, {
              method: "PATCH",
              headers: {
                  'Content-Type': 'application/json'
                },
              body: JSON.stringify({isGoodDog: false})
            })
          }
        })
      }) // closes the dog bar click function

      filterButton.addEventListener("click", function(e) {
          if (e.target.innerText === "Filter good dogs: OFF") {
            e.target.innerText = "Filter good dogs: ON"
            goodDogs = dogs.filter(function(dogObject) {
              return dogObject.isGoodDog === true
            })
            dogBar.innerHTML = ""
            createSpan(goodDogs)
          } else {
            e.target.innerText = "Filter good dogs: OFF"
            dogBar.innerHTML = ""
            createSpan(dogs)
          } // closes if statement
      }) // closes filter addEventListener




}) // closes the dom content
