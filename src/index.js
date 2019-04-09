 let dogArray;

document.addEventListener('DOMContentLoaded', ev => {
   const dogBar = document.getElementById("dog-bar")
   const dogInfo = document.getElementById("dog-info")
   const goodDogFilter = document.getElementById("good-dog-filter")

   fetch("http://localhost:3000/pups")
   .then(res => res.json())
   .then(data => {
     dogArray = data;
     renderDogNames(dogArray)
   })



   dogBar.addEventListener('click', ev => {
     if (ev.target.dataset.action === "showInfo") {
       clickedDog = dogArray.find(dog => {
         return dog.id === parseInt(ev.target.dataset.id)
       })

       renderDogInfo(clickedDog)
     }
   })

   dogInfo.addEventListener('click', ev => {
    if (ev.target.dataset.action === "toggle"){
      toggleGoodBad(ev.target, ev.target.dataset.id)
    }
   })

   goodDogFilter.addEventListener('click', ev => {
      if (ev.target.innerText === "Filter good dogs: OFF"){
        ev.target.innerText ="Filter good dogs: ON";
        filteredArray = filterDogs(dogArray);
        renderDogNames(filteredArray)
      }
      else {
        ev.target.innerText ="Filter good dogs: OFF";
        renderDogNames(dogArray)
      }
   })



   function renderDogNames(array){
     dogBar.innerHTML = ''
     array.forEach(dog => {
       span = document.createElement("span");
       span.innerText = dog.name;
       span.dataset.action = "showInfo"
       span.dataset.id = dog.id;
       dogBar.appendChild(span)
     })
   }

   function renderDogInfo(dog){
    dogInfo.innerHTML = ''
    let img = document.createElement("img")
    img.src = dog.image
    let h2 = document.createElement("h2")
    h2.innerText = dog.name
    let button = document.createElement("button")
    button.dataset.action = "toggle"
    button.dataset.id = dog.id
    if (dog.isGoodDog) {
      button.innerText = "Good Dog!"
    }
    else {
      button.innerText = "Bad Dog!"
    }
    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(button)
   }

   function toggleGoodBad (element,dogId){
     if (element.innerText === "Good Dog!") {
        element.innerText = "Bad Dog!";
        fetch(`http://localhost:3000/pups/${dogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({isGoodDog: false})
        })
        alert("This dog is now a bad dog!")
     }
     else {
       element.innerText = "Good Dog!";
       fetch(`http://localhost:3000/pups/${dogId}`, {
       method: "PATCH",
       headers: { "Content-Type": "application/json"},
       body: JSON.stringify({isGoodDog: true})
       })
       alert("This dog is now a good dog!")
     }
   }

   function filterDogs (array) {
     return array.filter(function(dog) {
       return dog.isGoodDog
     })
   }
})
