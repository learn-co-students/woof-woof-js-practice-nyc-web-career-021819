
addEventListener("DOMContentLoaded",function(e){

const dogBarTag = document.querySelector("#dog-bar")
const dogContainerTag = document.querySelector("#dog-summary-container")
const dogInfoDiv = document.querySelector("#dog-info")
const dogFilterTag = document.querySelector("#good-dog-filter")

let dogsArr = []
    
//fecth to get the nav bar for dogs 

    fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(function (json) {
        // console.table(json);
        dogsArr = json
        dogsArr.forEach(dog => {
            //create the dogs nav bar with dog names
            let newDogSpan = document.createElement("span")
            newDogSpan.innerText = dog.name
            //add id to keep track of dogs 
            newDogSpan.dataset.id = dog.id
            dogBarTag.className = "dogfilter"
            dogBarTag.appendChild(newDogSpan)
        })

        
        dogBarTag.addEventListener("click", function (e) {
            
            // console.log(e.target)
            const dogId = e.target.dataset.id
            const clickedDog = dogsArr.find(dog => dog.id === parseInt(dogId))
            if (dogBarTag.className === "dogfilter"){
            createDogInfo(clickedDog)
            }
            const toggleTag = document.querySelector(".goodOrBad")

            // console.log(toggleTag.innerText)

            toggleTag.addEventListener("click", function(e){

                // console.log(clickedDog.id)
                if (toggleTag.innerText === "Good Dog!") {
                    toggleTag.innerText = "Bad Dog!"
                    fetch(`http://localhost:3000/pups/${clickedDog.id}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({ isGoodDog: false })
                    })
    

                } else if (toggleTag.innerText === "Bad Dog!") {
                    toggleTag.innerText = "Good Dog!"
                    fetch(`http://localhost:3000/pups/${clickedDog.id}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({ isGoodDog: false })
                    })
                }

            })

            //create a function to create dogs when names are selected
            function createDogInfo(clickedDog) {
                dogInfoDiv.innerHTML = ""

                let newimgTag = document.createElement("img")
                newimgTag.src = clickedDog.image
                let newH2Tag = document.createElement("h1")
                newH2Tag.innerText = clickedDog.name
                let newButtonTag = document.createElement("button")
                newButtonTag.className = "goodOrBad"
                if (clickedDog.isGoodDog) {
                        newButtonTag.innerText = "Good Dog!"
                    } else {
                        newButtonTag.innerText = "Bad Dog!"
                    }

                dogInfoDiv.appendChild(newimgTag)
                dogInfoDiv.appendChild(newH2Tag)
                dogInfoDiv.appendChild(newButtonTag)
            }     
            


        })

        dogFilterTag.addEventListener("click",function(e){
            if (e.target.innerText === "Filter good dogs: OFF"){
                //change the button 
                e.target.innerText = "Filter good dogs: ON"
                //update the filter 
                // console.log(dogsArr[1].isGoodDog)
                let filterDogs = dogsArr.filter(dog => dog.isGoodDog)             
                dogBarTag.innerHTML = ""

                filterDogs.forEach(dog => {
                    //create the dogs nav bar with dog names
                    let newDogSpan = document.createElement("span")
                    newDogSpan.innerText = dog.name
                    //add id to keep track of dogs 
                    newDogSpan.dataset.id = dog.id
                    dogBarTag.appendChild(newDogSpan)
                }) 
                
            }else {
                e.target.innerText = "Filter good dogs: OFF"
                dogBarTag.innerHTML =""
                dogsArr.forEach(dog => {
                    //create the dogs nav bar with dog names
                    let newDogSpan = document.createElement("span")
                    newDogSpan.innerText = dog.name
                    //add id to keep track of dogs 
                    newDogSpan.dataset.id = dog.id
                    dogBarTag.appendChild(newDogSpan)
            })

        }

        })   
    })//fetch closing tag
}) //domcontentloaded event listner closing tag
