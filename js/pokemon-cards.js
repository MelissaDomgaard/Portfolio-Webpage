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
const theData = getPokemonData('https://pokeapi.co/api/v2/pokemon/')
    .then(data => {
        for (const pokemon of data.results) {
            getPokemonData(pokemon.url)
                .then(pokedata => {
                    populateDOM(pokedata)
                })

        }
    })

let mainArea = document.querySelector('main')

function populateDOM(single_pokemon) {
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')
    let name = document.createElement('h3')
    let pic = document.createElement('img')

    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')
    pokeFront.setAttribute('class', 'charDivs', 'card_face card_face--front')
    pokeBack.setAttribute('class', 'card_face card_face--back')
    pic.setAttribute('class', 'picDivs')

    let pokeNum = getPokeNumber(single_pokemon.id)

    pokeFront.appendChild(name)

    name.textContent = `${single_pokemon.name} height: ${single_pokemon.height}`

    pic.src = ' paste url'
    pokeFront.appendChild(pic)
    pokeFront.appendChild(name)
    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)
    
    mainArea.apendChild(pokeScene)

    pokeCard.addEventListener('click', function()
    
    )

}

function getPokeNumber(id) {
    if (id < 10) return `00${id}`
    if (id > 9 && id < 100) {
        return `0${id}`
    } else return id

    /* let end =charURL.lastIndexOf('/')
    let charID = charURL.substring(end - 2, end)
    if (charID.indexOf('/') !== -1 {
        return `00${charID.slice(1, 2)}`
    } else {
        return `0${charID}`
    } */
}