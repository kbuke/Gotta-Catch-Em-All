# POKEMON TCG

## About the Pokemon App
This web application showcases the original 151 Pokemon, ranging from Bulbasur to Mew.
All Pokemon are put in the form of a Pokemon Card. All cards are face down showing the back of the card.
All Pokemon names, images, id numbers, and class have been taken from the public API:
https://pokeapi.co/
The web application is interactive, if a user hovers over a card the card face will show with name, image and id number, remove the cursour from the card and it will revert to back to the back of the card.
There are also two filter options that allow the user to see Pokemon based on either their type, or their name. 

## Intsalation
Please install the JSON server using:
```javascript
npm install -g json-server
```
Where the "g" flag stands for global, ensuring it is installed and accessible anywhere on your machine

To make requests to the server please run:
```javascript
json-server --watch db.json
```


## Usage
This app uses two fetch requests. The first is to obtain the Pokemons names
```javascript
//pokemon parameter returns 151 seperate object which show each Pokemons name, and a key url which includes additional information 
fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(resp => resp.json())
    .then(data => data.results.forEach(pokemon => createCard(pokemon)))
```
To abstract additional information regarding each Pokemon, we need to send another fetch request to the url keys value found in each value of "pokemon"
```javascript
//url is that from the first fetch request. data parameter contains additional info, like image, name, id number and type
fetch(`${pokemon.url}`)
    .then(resp => resp.json())
    .then(data => pokeStats(data))
```
The interactive elements of the application are done using two seperate "addEventListener":
```javascript
//replaces the back card with the front card
backOfPokeCard.addEventListener("mouseover", () => {
    pokeCardDiv.replaceChild(frontOfPokeCard, backOfPokeCard)
})
//replaces the front card with the back card 
frontOfPokeCard.addEventListener("mouseout", () => {
    pokeCardDiv.replaceChild(backOfPokeCard, frontOfPokeCard)
})
```

## Future Ideas
For the future I would like to create a side bar with 3 boxes you can drag your three favourite Pokemon into. 
I want it to also allow users to change their minds and switch their chosen three, returning their original choices to the deck of cards.

## Contribution
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


Please make sure to update tests as appropriate.