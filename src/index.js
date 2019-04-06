
document.addEventListener('DOMContentLoaded', function () {
  let all_pups = []
  let guud_bois_only = []
  const dog_bar = document.querySelector("#dog-bar")
  const div_summary_container = document.querySelector("#dog-summary-container")

  fetch('http://localhost:3000/pups')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      all_pups = JSON.parse(JSON.stringify(myJson))
      console.log('all_pups= ', all_pups[0].isGoodDog)
      render_all_dog_names(all_pups)
    });

  document.addEventListener('click', function(e) {

    // console.log('innerText is', e.target.innerText)

   if (e.target.id === "good-dog-filter"){

     fetch('http://localhost:3000/pups')
       .then(function(response) {
         return response.json();
       })
       .then(function(myJson) {
         all_pups = JSON.parse(JSON.stringify(myJson))

         if (e.target.innerText === 'Filter good dogs: OFF') {
            guud_bois_only = all_pups.filter(function (pup) {
              return pup.isGoodDog === true
            })
            e.target.innerHTML = "Filter good dogs: ON"
            dog_bar.innerHTML = ""
            render_all_dog_names(guud_bois_only)
            // need to add conditional to turn filter off if it is on
          } else {
            e.target.innerHTML = "Filter good dogs: OFF"
            dog_bar.innerHTML = ""
            render_all_dog_names(all_pups)
          }
        });
    };

   if (e.target.dataset.action === "expand") {
     clicked_doge = all_pups.find(function(dog){
       return dog.id === parseInt(e.target.dataset.id)
     })
     div_summary_container.innerHTML = ""
     div_summary_container.appendChild(create_dog_content(clicked_doge))
   };

     //  if (e.target.dataset.action === "dog_content_button"){
     // console.log('e.target is', e.target.dataset.action === "dog_content_button")
     //

      // console.log('in doc addEventListener', e.target.dataset.id)

    if (e.target.dataset.action == 'dog_content_button') {

        if (e.target.innerText === 'guud boi') {
          e.target.innerText = 'bad boi'

          fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({'isGoodDog': false})
         })
          .then(function(response) {
            return response.json();
          })
          .then(function(myJson){
            if (document.querySelector("#good-dog-filter").innerHTML === "Filter good dogs: ON") {

              fetch('http://localhost:3000/pups')
                .then(function(response) {
                  return response.json();
                })
                .then(function(myJson) {
                  all_pups = JSON.parse(JSON.stringify(myJson))
                  guud_bois_only = all_pups.filter(function (pup) {
                    return pup.isGoodDog === true
                  })
                  dog_bar.innerHTML = ""
                  render_all_dog_names(guud_bois_only)
                });
            }
          })


         // dog_bar.innerHTML = ""
         //
         // guud_bois_only = all_pups.filter(function (pup) {
         //   return pup.isGoodDog === true
         // })
         //
         // render_all_dog_names(guud_bois_only)

        } else {
          e.target.innerText = 'guud boi'

          fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({'isGoodDog': true})
         })
        }
     };
     // // render_dog_info(clicked_doge) // need to write this method
     // console.log('clicked_doge is', clicked_doge)
     // console.log('target dataset id =', e.target.dataset.id)
  });

  const create_span = function(dog) {
    span = document.createElement("span")
    span.dataset.action = "expand"
    span.dataset.id = dog.id
    span.dataset.guudboi = dog.isGoodDog
    span.innerText = dog.name
    return span
  };

  const append_span = function(node) {
    dog_bar.appendChild(node)
  };

  const render_all_dog_names = function (array) {
    const all_pup_spans = array.map(create_span)
    all_pup_spans.forEach(append_span)
  };

  const create_dog_content = function (dog) {
    const div = document.createElement("div")
    div.id = 'dog-info'
    const img = document.createElement("img")
    img.src = dog.image
    const h2 = document.createElement("h2")
    h2.innerText = dog.name
    const button = document.createElement("button")
    if (dog.isGoodDog) {
      button.innerText = "guud boi"
    } else {
      button.innerText = "bad boi"
    }
    button.class = "dog_content_button"
    button.dataset.action = "dog_content_button"
    button.dataset.id = dog.id

    div.appendChild(img)
    div.appendChild(h2)
    div.appendChild(button)
    return div
  };

});
