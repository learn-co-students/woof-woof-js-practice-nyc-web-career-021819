document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');

  let dogBar = document.getElementById('dog-bar')
  let dogContainer = document.getElementById('dog-info')


  // Get JSON file and show on page
  function getDogs(e) {
    fetch('http://localhost:3000/pups')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        let output = ''
        data.forEach((dog) => {
          output += `
          <span id=${dog.id} class="all-dogs">${dog.name}</span>
        `;
        })

        //Add Dog spans to Dogbar
        dogBar.innerHTML = output

        //Grab dog span element
        const dogSpan = document.getElementsByClassName('all-dogs')

        //Add event listener to dog span
        for (var i = 0; i < dogSpan.length; i++) {
          dogSpan[i].addEventListener('click', showDogDetails, false);
        }

        //Show dog details
        function showDogDetails(e) {
          console.log('e.taget', e.target.id);
          fetch(`http://localhost:3000/pups/${e.target.id}`)
            .then((res) => {
              return res.json()
            })
            .then((dog) => {
              if (dog.isGoodDog === true) {
                let dogDetails = `
            <div class="dog-details-individual">
            <h2>ID: ${dog.id} </h2>
            <h2>Name: ${dog.name} </h2>
            <img src="${dog.image}" height="350" width="350" > <br>
            <button id="dogButton"> Good Dog! </button>
            </div>
            `
                dogContainer.innerHTML = dogDetails
              } else {
                let dogDetails = `
            <div class="dog-details-individual">
            <h2>ID: ${dog.id} </h2>
            <h2>Name: ${dog.name} </h2>
            <img src="${dog.image}" height="350" width="350" >
            <br>
            <button id="dogButton"> Bad Dog! </button>
            </div>
            `
              dogContainer.innerHTML = dogDetails
              }
              let dogButton = document.getElementById('dogButton')

              dogButton.addEventListener('click', switchGoodBoy);

              function switchGoodBoy() {
                console.log('here');
              }
          })
        }
      })
  }

  //Invoke Functions
  getDogs();
});
