async function getPokemonData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}
// this fetch the dom from the pokeapi on the web without using the import function.

getPokemonData('https://pokeapi.co/api/v2/pokemon/')

