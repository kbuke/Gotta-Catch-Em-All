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

     //Create the pokemon cards
     function createCard(pokemon){
        //Create the card holders
        let pokeCardDiv = document.createElement("div")
        pokeCardDiv.className = "pokemonCards"
    
        //Get names of each pokemon using "pokemon" values
        let pokeName = document.createElement("h2")
        pokeName.className = "pokemonName" //make the classNames of pokemonName their actual names
        pokeName.innerText = `${pokemon.name}`.toUpperCase() //convert all names to uppercase
        pokeCardDiv.classList.add(pokeName.innerText) //also add the names of each pokemon to their respective card
        //console.log(pokeName.innerText)

        //Retreive additional Pokemon Info from the nested url in the above
        let pokeUrl = pokemon.url
        fetch(pokeUrl)
        .then(resp => resp.json())
        .then(data => pokeStats(data))
    
        const pokeStats = (pokeInfo) => { //pokeInfo now carries all values from "data" (line 34)
            //pokeInfo includes additional info. I want their images, types and id number, all are here for each 151.
            console.log(pokeInfo)
        }
    }
})