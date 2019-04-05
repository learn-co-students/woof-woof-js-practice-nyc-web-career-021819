document.addEventListener('DOMContentLoaded', ev => {
  const dogBar = document.getElementById("dog-bar")
  const dogInfo = document.getElementById("dog-info")
  const dogFilter = document.getElementById("good-dog-filter")
  let puppyArray = []




fetch("http://localhost:3000/pups")
.then(function (res) {
  return res.json()
})
.then(function (data) {
   puppyArray = data
   puppyArray.forEach(function(pup) {
    const span = document.createElement("span")
     span.innerText = `${pup.name}`
     span.dataset.action = "show-info"
     dogBar.appendChild(span)
   })

    dogFilter.addEventListener('click', ev => {
      puppyArray = data
      dogBar.innerHTML = ''

      if (dogFilter.innerHTML === "Filter good dogs: OFF"){
         dogFilter.innerHTML = "Filter good dogs: ON"
        puppyArray = puppyArray.filter(function(puppy){
          return puppy.isGoodDog === true
        })
      }
      else if (dogFilter.innerHTML === "Filter good dogs: ON"){
         dogFilter.innerHTML = "Filter good dogs: OFF"
      }



      puppyArray.forEach(function(pup) {
       const span = document.createElement("span")
        span.innerText = `${pup.name}`
        span.dataset.action = "show-info"
        dogBar.appendChild(span)
      })
    })
  })





   dogBar.addEventListener('click', function(ev){
     dogInfo.innerHTML = ''
     if (ev.target.dataset.action === "show-info") {
         const matchingPup = puppyArray.find(function(pup){
         return pup.name === ev.target.innerText
       })
       const img = document.createElement("img")
       img.src = matchingPup.image
       const h2 = document.createElement("h2")
       h2.innerText = matchingPup.name
       const button = document.createElement("button")
        if (matchingPup.isGoodDog)
        {button.innerText = "Good Dog!"
        }
        else {
          button.innerText = "Bad Dog!"
        }

       dogInfo.appendChild(img)
       dogInfo.appendChild(h2)
       dogInfo.appendChild(button)

     button.addEventListener('click', ev => {
       if (matchingPup.isGoodDog) {
         matchingPup.isGoodDog = false
         button.innerText = "Bad Dog!"
            fetch(`http://localhost:3000/pups/${matchingPup.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type':'application/json' },
              body: JSON.stringify({isGoodDog: false})
            })
        }


       else {
         matchingPup.isGoodDog = true
         button.innerText = "Good Dog!"
         fetch(`http://localhost:3000/pups/${matchingPup.id}`, {
           method: 'PATCH',
           headers: { 'Content-Type':'application/json' },
           body: JSON.stringify({isGoodDog: true})
         })
       }
     })

     }

   })

 })
