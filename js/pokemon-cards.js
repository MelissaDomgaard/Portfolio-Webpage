
class Pokemon {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

// const Thoremon = new Pokemon(900, 'Thoremon');

const newButton = document.querySelector('#newPokemon')
newButton.addEventListener('click', function () {
    let pokeId = prompt("Please enter a Pokemon ID")
    if (pokeId > 0 && pokeId <= 807) {
        getPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(result => {
            populateDOM(result)
        })
    } else {
        alert('There are no Pokemon with that ID. Choose an ID that is less than 807')
    }
})

async function getPokemonData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// use the returned async data
const theData = getPokemonData('https://pokeapi.co/api/v2/pokemon/?limit=25')
    .then(data => {
        for (const pokemon of data.results) {
            getPokemonData(pokemon.url)
                .then(pokemonData => {
                    populateDOM(pokemonData)
                })
        }
    })

let mainArea = document.querySelector('main')

function populateDOM(single_pokemon) {
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')

    fillCardFront(pokeFront, single_pokemon)
    fillCardBack(pokeBack, single_pokemon)

    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')
    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)

    mainArea.appendChild(pokeScene)

    pokeCard.addEventListener('click', function () {
        pokeCard.classList.toggle('is-flipped')
    })
}

function fillCardFront(pokeFront, data) {
    pokeFront.setAttribute('class', 'card_face card_face--front')
    let pokeName = document.createElement('h2')
    let pic = document.createElement('img')
    pic.setAttribute('class', 'picDivs')

    let pokeNum = getPokeNumber(data.id)

    pokeFront.appendChild(pokeName)
    // name.textContent = `${data.name} height: ${data.height}`

    pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`

    pokeName.textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`

    pokeFront.appendChild(pic)
    pokeFront.appendChild(pokeName)
}


function fillCardBack(pokeBack, data) {
    pokeBack.setAttribute('class', 'card_face card_face--back')

    let pokeOrder = document.createElement('h3')
    let pokeHP = document.createElement('h3')
    let pokeAbility = document.createElement ('h3')
    pokeOrder.textContent = `#${data.id} ${data.name[0].toUpperCase()}${data.name.slice(1)}`
    pokeHP.textContent = `Base HP: ${data.stats[0].base_stat}`
    pokeAbility.textContent = `Main Ability: ${data.abilities[0].ability.name}`
    pokeBack.appendChild(pokeOrder)
    pokeBack.appendChild(pokeHP)
    pokeBack.appendChild(pokeAbility)
}

function getPokeNumber(id) {
    if (id < 10) return `00${id}`
    if (id > 9 && id < 100) {
        return `0${id}`
    } else return id
}
    /* let end =charURL.lastIndexOf('/')
    let charID = charURL.substring(end - 2, end)
    if (charID.indexOf('/') !== -1 {
        return `00${charID.slice(1, 2)}`
    } else {
        return `0${charID}`
    }
 } */

 