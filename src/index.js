function selectDom(identifier) {
    return document.querySelector(identifier)
}

let allDogs

document.addEventListener('DOMContentLoaded', function() {
    getAllDogs()
    eShowDog()
    dogStatus()
    filterDogs()
})

// Event Listeners
function eShowDog() {
    const dogBar = selectDom("#dog-bar")
    dogBar.addEventListener('click', (e) => {
        if (e.target.matches('span')){
            const dogId = parseInt(e.target.dataset.id)
            const dog = allDogs.find(dog => {
                return dog.id === dogId
            })
            showDogtoDOM(dog)
        }
    })
}

function dogStatus() {
    const dogInfo = selectDom('#dog-info')
    dogInfo.addEventListener('click', (e) => {
        if (e.target.dataset.action === "dog-status") {
            const dogId = parseInt(e.target.dataset.id)
            const dog = allDogs.find(dog => {
                return dog.id === dogId
            })
            let goodDog 
            if (dog.isGoodDog === "true") {
                goodDog = "false"
            } else {
                goodDog = "true"
            }
            body = {isGoodDog: goodDog}
            updateDog(dogId, body)
            dog.isGoodDog = goodDog
            showDogtoDOM(dog)
        }
    })
}

function filterDogs() {
    const goodDogFilter = selectDom('#good-dog-filter')
    goodDogFilter.addEventListener('click', (e) => {
        
        if (e.target.innerText.includes('OFF')){
            goodDogs = allDogs.filter(dog => {
                return dog.isGoodDog === "true"
            })
            addDogstoDOM(goodDogs)
            e.target.innerText = "Filter good dogs: On"
        } else {
            addDogstoDOM(allDogs)
            e.target.innerText = "Filter good dogs: OFF"
        }  
    })

}

// Convert to HTML

function dogToHTML(dog) {
    return `<span data-id=${dog.id}>${dog.name}</span>`
}

function detailDogHTML(dog) {
    let goodDog = false
    if (dog.isGoodDog === "true") {
        goodDog = true
    }
    return `<img src=${dog.image}> 
            <h2>${dog.name}</h2> 
            <button data-action="dog-status" data-id=${dog.id}>${goodDog}</button>
            `
}

// Add Elemnts to DOM
function addDogstoDOM(allDogs) {
    const dogBar = selectDom("#dog-bar")
    dogBar.innerHTML = ''
    allDogs.forEach(function(dog){
        dogBar.innerHTML += dogToHTML(dog)
    })
}

function showDogtoDOM(dog){
    const dogInfo = selectDom("#dog-info")
    dogInfo.innerHTML = detailDogHTML(dog)
}

// Fetches

function getAllDogs() {
    adapter.getAll()
    .then(dogs => {
        allDogs = dogs
        console.log(allDogs)
        addDogstoDOM(allDogs)
    })
}

function updateDog(id, body) {
    adapter.update(id, body)
}
