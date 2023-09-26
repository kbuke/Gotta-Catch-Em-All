//Load Web Page
document.addEventListener("DOMContentLoaded", () => {
    //Create a variable to store all Pokemon Cards
    let kantoPokemon = document.getElementById("Pokemon-List")
  
    //Create a variable for the drop down list
    let typeSelector = document.getElementById("type-dropdown")
  
    //Create a variable for search bar
    let searchInput = document.getElementById("search")
  
    //Now fetch available data of original 151 pokemon, ALSO limit the number to 151
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(resp => resp.json())
    .then(data => data.results.forEach(pokemon => createCard(pokemon)))
})