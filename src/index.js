
document.addEventListener("DOMContentLoaded",domLoadFunctions)

function domLoadFunctions() {
  console.log("we're in.")
  addPups(filterForAllPups, renderPups)
  document.addEventListener("click", dogEnhance)
}
// Fetch Functionss
function addPups(filter,renderFunction){
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(function(myJson) {
    renderFunction(filterPups(myJson, filter))
  });
}

// filterer function, takes in a filter callback
function filterPups(json, filter){
  let puppos = json
  puppos = json.filter(filter)
  console.log("filter in filter function", filter)
  console.log("filtered puppos", puppos)
  return puppos

}
// filter callbacks
const filterForAllPups = pup => pup

function renderPups(json){
  const dogBar = document.getElementById('dog-bar')
  let puppos = json
  puppos.forEach(puppo => {
    const newSpan = document.createElement("SPAN")
    newSpan.setAttribute('data-id', puppo.id)
    newSpan.setAttribute('data-action', "enhance")
    newSpan.innerText = puppo.name
    return dogBar.appendChild(newSpan)
  })
}

function dogEnhance(e){
  if (e.target.dataset.action){
    const dogInfoDiv = document.getElementById("dog-info")
    const pup = addPups((puppo => puppo.id === e.target.dataset.id), renderFunction)
    function renderFunction(puppo){
      console.log("puppo in render function", puppo)
    dogInfoDiv.innerHTML = `
      <img src=${puppo.image}>
      <h2>${puppo.name}</h2>
      <button>Good Dog!</button>`}}
  }
