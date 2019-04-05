
document.addEventListener("DOMContentLoaded",domLoadFunctions)

function domLoadFunctions() {
  console.log("we're in.")
  addPups(renderPups)
  document.addEventListener("click", dogEnhanceOrSupport)
// Fetch Functionss
function addPups(renderFunction){
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(function(myJson) {
    renderFunction(myJson)
  });
}

// filter callbacks
const filterForAllPups = pup => pup

function renderPups(json){
  const dogBar = document.getElementById('dog-bar')
  dogBar.innerHTML =''
  let puppos = json
  puppos.forEach(puppo => {
    const newSpan = document.createElement("SPAN")
    newSpan.setAttribute('data-id', puppo.id)
    newSpan.setAttribute('data-action', "enhance")
    newSpan.innerText = puppo.name
    return dogBar.appendChild(newSpan)
  })
}

function dogEnhanceOrSupport(e){
  console.log("e", e.target.dataset)
  if (e.target.dataset.action === "enhance"){
    console.log("in the if")
    addPups(renderFunction)}
  else if (e.target.dataset.action === "boopPuppo")
    {
    let goodDogChanger
      if (!!e.target.dataset.isgooddog){goodDogChanger = false} else {goodDogChanger=true}
    console.log(e.target)
    console.log(goodDogChanger)
    fetch(`http://localhost:3000/pups/${parseInt(e.target.dataset.id)}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({id: e.target.dataset.id, isGoodDog: !!goodDogChanger}),
    })
    .then(response => response.json())
    .then(function(myJson) {renderFunction(myJson)})};
  function renderFunction(puppos){
    let foundDog
    if (Array.isArray(puppos)){
    foundDog = puppos.filter(puppo => parseInt(puppo.id) == e.target.dataset.id)[0]}
    else {foundDog = puppos}
    const dogInfoDiv = document.getElementById("dog-info")
    dogInfoDiv.innerHTML = `
      <img src=${foundDog.image}>
      <h2>${foundDog.name}</h2>
      <button data-id=${foundDog.id}, data-action="boopPuppo", data-isGoodDog=${!!foundDog.isGoodDog}>${!!foundDog.isGoodDog ? "Good Dog!" : "Bad Dog!" }</button>`
    }}
  }
