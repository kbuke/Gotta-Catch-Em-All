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

            //Get the Pokemon Types, and add them to the class of each pokemon card
            let types = pokeInfo.types
            let specificType = types.map(pokeType => pokeType.type.name)
            //The class name of each pokemon will be their specific classes
            //Note that some Pokemon have more than 1 class. In this case the for loop will ensure all classes are logged in the class
            for(let i = 0; i < specificType.length; i++){
                pokeCardDiv.classList.add(specificType[i])
            }
            //Get the id of each specific Pokemon, base this on the Kanto Regions id number
            let kantoId = pokeInfo.id
            pokeCardDiv.id = kantoId

            //Get the image of each of the 151 Pokemon
            let pokeImg = document.createElement("img")
            pokeImg.className = "pokemonImages"
            pokeImg.id = `${kantoId} image`
            pokeImg.src = `${pokeInfo.sprites["front_default"]}`

            //We already have img, name and id, but I want to make the id number a bit more specific
            let pokeId = document.createElement("b")
            pokeId.className = "pokemonID"
            pokeId.innerText = `KANTO REGION ID: ${kantoId}`

            //Create the back of the Pokemon Card
            let backOfPokeCard = document.createElement("img")
            backOfPokeCard.className = "backEnd"
            backOfPokeCard.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fit/w_828,h_1148/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA"
            backOfPokeCard.classList.add(pokeName.innerText)
            //Append backOfPokeCard to the pokeCardDiv
            pokeCardDiv.appendChild(backOfPokeCard)
        }
        kantoPokemon.append(pokeCardDiv)
    }
})