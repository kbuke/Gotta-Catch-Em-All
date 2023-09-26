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
  
      function pokeStats(pokeInfo){ //pokeInfo now carries all values from "data" (line 34)
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
  
        
  
        //Create the back of the Pokemon Card
        let backOfPokeCard = document.createElement("img")
        backOfPokeCard.className = "backEnd"
        backOfPokeCard.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fit/w_828,h_1148/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA"
        backOfPokeCard.classList.add(pokeName.innerText)
        //Append backOfPokeCard to the pokeCardDiv
        pokeCardDiv.appendChild(backOfPokeCard)
  
        //Create the front of the pokemon card, it will show the Pokemons name, img, and id number
        let frontOfPokeCard = document.createElement("div")
        frontOfPokeCard.className = "frontCard"
        
        //We already have img, name and id, but I want to make the id number a bit more specific
        let pokeId = document.createElement("b")
        pokeId.className = "pokemonID"
        pokeId.innerText = `KANTO REGION ID: ${kantoId}`
  
        //Append name, images and id to the front of card
        frontOfPokeCard.append(pokeName, pokeImg, pokeId)
        
  
        //Now show the front of the card, when i hover over the back of it
        backOfPokeCard.addEventListener("mouseover", () => {
          pokeCardDiv.replaceChild(frontOfPokeCard, backOfPokeCard)
  
          //When the sidepanel is closed, and you drag an image it will open
          let isPanelOpen = false;
  
          pokeImg.addEventListener("dragstart", () => { //start dragging the img from pokeCard
            if (!isPanelOpen) {
              document.querySelector(".wrapper").classList.add("side-panel-open");
              isPanelOpen = true;
              //Makes the area you got the image from blurred
              pokeImg.classList.add("dragging"); //Add dragging to pokeImg class
            } 
          });
  
          //Set up containers and make them available to receive img when dropped in them
          let containers = document.getElementsByClassName("select-team"); //these are the three spots in the side panel
  
          const handleDragOver = (container) => { //function handleDragOver(container)
            container.addEventListener("dragover", (e) => { //container listens for when an img is being dragged over it, as it is a drop target
              e.preventDefault();
            });
          
            container.addEventListener("drop", (e) => { //i drop the image into the container
              //e.preventDefault();
              // console.log(document.getElementsByClassName("dragging"))
              let pokeDrag = Array.from(document.getElementsByClassName("dragging"))[0]; //This gets the pokeImg variable as a HTML collection. Array.from coverts it to an array, and [0] gives us the first element including, id, src etc
              //console.log(pokeDrag)
  
              if(pokeDrag.classList.item(1) === "dragging"){
                console.log(pokeDrag)
                pokeDrag.classList.remove("dragging")
                console.log(pokeDrag)
                let pokeImgCopy = pokeDrag.cloneNode(true); // Create a clone of the dragged image
                let identifier = pokeImgCopy.id.split(" ")[0] //This gives is the number from id
                let cardFinder = document.getElementById(identifier)
                cardFinder.childNodes[0].style.display = "none" //Hides the card, as it tracks it through identifier, as these are just the numbers
            
                if (pokeDrag && container.children.length === 0) { 
                  //console.log(pokeDrag)
                  container.innerHTML = ""; // Remove other cards from the container
                  pokeImgCopy.className = "teamImage";
                  //pokeImgCopy.classList.remove("dragging");
                  container.appendChild(pokeImgCopy); // Append the cloned image to the container
    
            
                  pokeImgCopy.addEventListener("dragstart", () => { //Listens for you dragging the img out of the container
                    
                    //How can I make it so it correlates to correct card?
                    let identifier = pokeImgCopy.id.split(" ")[0]
                    //console.log(identifier)
                    let cardFinder = document.getElementById(identifier)
                    cardFinder.childNodes[0].style.display = "block" //now returns the card when you begin dragging
                    cardFinder.childNodes[0].childNodes[1].classList.remove("dragging")
                  });
                  pokeImgCopy.addEventListener("dragend", () => {
                    pokeImgCopy.remove() //removes the copy of the img in the container
                  })
                }
              }       
            });
          };
          Array.from(containers).forEach(handleDragOver) //containers is a HTML collection of the three containers, this line turns them into an array, and for each one of them it is susseptible to the handleDragOver function
        })
  
        //When you leave the front of the card, the card will flip to the back
        frontOfPokeCard.addEventListener("mouseout", () => {
          pokeCardDiv.replaceChild(backOfPokeCard, frontOfPokeCard)
        })
      }
      kantoPokemon.append(pokeCardDiv) //Append all cards to this section
    }
 //Now control the drop down bar
  typeSelector.addEventListener("change", () => {
    let selectedType = typeSelector.value
    
    let pokemonCards = document.querySelectorAll(".pokemonCards")
  
    //Show Pokemon whos pokeTypes match the dropselect option 
    pokemonCards.forEach((card) => {
      //Ensures if "all pokemon" is selected, then all pokemon will show
      if(selectedType == "all pokemon"){
        card.style.display = "block"
        //If the pokeTypes mention in classlist matches the value of dropdown it will return those cards
      } else if (card.classList.contains(selectedType)) {
        card.style.display = "block";
        //Otherwise nothing
      } else {
        card.style.display = "none";
      }
    })
  })

    //Handle search bar
    searchInput.addEventListener("input", e => {
        e.preventDefault()
        const value = e.target.value.toUpperCase() //the letters of what I type in the search bar
    
        let pokemonCards = document.querySelectorAll(".pokemonCards")
        let pokeCardArray = []
        pokeCardArray.push(pokemonCards)
        //console.log(pokeCardArray)
    
        pokeCardArray.forEach(card => {
          //console.log(card.length) => 151
          //console.log(card[0].classList.item(1)) => gives name of pokemon
          for(let i = 0; i < card.length; i++){
            let cardSelector = card[i]
            if(cardSelector.classList.item(1).includes(value)){
              cardSelector.style.display = "block"
            } else {
              cardSelector.style.display = "none"
            }
          }
        })
      })
})