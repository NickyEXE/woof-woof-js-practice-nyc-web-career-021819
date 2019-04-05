
document.addEventListener("DOMContentLoaded", domLoadFunctions)
function domLoadFunctions(){
  const dogBar = document.getElementById("dog-bar")
  const filterButton = document.getElementById('good-dog-filter')
  filterButton.setAttribute("data-clicked", false)
  function filterButtonIsFalse() {return filterButton.getAttribute('data-clicked')=="false"}
  doggoHeader(filterButton.getAttribute('data-clicked'))
  document.addEventListener("click",clickInterpreter)

function doggoHeader(goodFilter){
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(function(myJson) {
    doggoHeaderRenderer(myJson,goodFilter);
  })
  function doggoHeaderRenderer(json,goodFilter){
    let doggos = json
    dogBar.innerHTML = ''
    if (goodFilter === true){
      doggos = doggos.filter(doggo => !!doggo["isGoodDog"])
    }
    doggos.forEach(doggo => {
    const dogDiv = document.createElement("span")
    dogDiv.setAttribute("data-id", doggo.id)
    dogDiv.classList.add("bubble")
    dogDiv.innerText = doggo.name
    dogBar.appendChild(dogDiv)
      })
    }
    ;
  }

  function clickInterpreter(e){
    if (e.target.id==="good-dog-filter"){headerChanger()}
    if (e.target.classList.value == "bubble"){expandDoggo(e.target.dataset.id)}}
  function headerChanger(){
    console.log(filterButtonIsFalse())
    if (filterButtonIsFalse()){filterButton.setAttribute("data-clicked", true);doggoHeader(true);filterButton.innerText ="Filter Good Dogs: ON"}
    else {filterButton.setAttribute("data-clicked", false); doggoHeader(false);filterButton.innerText ="Filter Good Dogs: OFF"}
  }

  function expandDoggo(id){
    fetch(`http://localhost:3000/pups/${id}`)
    .then(response => response.json())
    .then(function(doggo) {
      doggoRenderer(doggo);
    })
    function doggoRenderer(doggo){
      const doggoWindow = document.getElementById('dog-info')
      const id = doggo.id
      const img = doggo.image
      const name = doggo.name
      let isGoodDog = doggo["isGoodDog"]
      console.log ("the opposite of the dog's status", !isGoodDog)
      doggoWindow.innerHTML =
      `<img src=${img}>
        <h2>${name}</h2>
        <button id="goodDogButton" >${isGoodDog ? "Make This Good Dog Bad" : "Make This Bad Dog Good"}</button>`
      button = document.getElementById("goodDogButton")
      button.addEventListener("click", changeDogStatus)
      function changeDogStatus(e){
        console.log("isGoodDog:", isGoodDog)
        console.log("!isGoodDog:", !isGoodDog)
        console.log(id)
        fetch(`http://localhost:3000/pups/${id}`,
        {
            method: "PATCH", // *GET, POST, PUT, DELETE, etc.
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: id, isGoodDog: !isGoodDog})
          })
        .then(expandDoggo(id))}
      }
    }
  }
