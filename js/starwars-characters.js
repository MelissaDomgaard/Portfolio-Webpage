// import { films } from '../assets/films.js'
import { people } from '../assets/people.js'


let mainArea = document.querySelector('main')

/* const justNames = people.map(person => {
    return {name: person.name}
}) */

function showCharArray(arrayOfPeople){
    arrayOfPeople.forEach(person => {
        let personDiv = document.createElement('div')
        let name = document.createElement('h1')
        let gender = document.createElement('p')
        let pic = document.createElement('img')

        personDiv.setAttribute('class', 'charDivs')
        pic.setAttribute('class', 'picDivs')

        let charNum = getCharNumber(person.url)

    name.textContent = person.name
    gender.textContent = person.gender
    pic.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`

    personDiv.appendChild(name)
    personDiv.appendChild(gender)
    personDiv.appendChild(pic)

    mainArea.appendChild(personDiv)
    })
}

/* people.forEach((person) => {
    let personDiv = document.createElement('div')
    let name = document.createElement('h1')
    let gender = document.createElement('p')
    let pic = document.createElement('img')

    let charNum = getCharNumber(person.url)

    name.textContent = person.name
    gender.textContent = person.gender
    pic.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`

    personDiv.appendChild(name)
    personDiv.appendChild(gender)
    personDiv.appendChild(pic)

    mainArea.appendChild(personDiv)
}) */

function getCharNumber(charURL) {
    let end = charURL.lastIndexOf('/')
    let charID = charURL.substring(end - 2, end)
    if (charID.indexOf('/') !== -1) {
        return charID.slice(1, 2)
    } else {
        return charID
    }
}

const allDivs = Array.from(document.querySelectorAll('div'))

const navArea = document.querySelector('nav')

/* let allButton = document.createElement('button')
allButton.textContent = "All Characters"

allButton.addEventListener('click', () => {
    deleteNodes(
        showCharArray(allCharacters)
    )
}) */


let maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'

maleButton.addEventListener('click', () => {
deleteNodes()
showCharArray(maleCharacters)
    /* femaleCharacters.forEach(character => {
        let matchedDiv = allDivs.find(element => {
            return element.firstChild.textContent === character.name
        })
        matchedDiv.setAttribute("style", "display: none;")
    }) */
})


let femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
femaleButton.addEventListener('click', () => {
    deleteNodes()
    showCharArray(femaleCharacters)
    /* maleCharacters.forEach(character => {
        let matchedDiv = allDivs.find((oneDiv) => {
            return oneDiv.firstChild.textContent === character.name
        })
        matchedDiv.setAttribute("style", "display: none;")
    }) */
})

let othersButton = document.createElement('button')
othersButton.textContent = "Other Characters"
othersButton.addEventListener('click', () => {
    deleteNodes()
    showCharArray(otherCharacters)

    /* maleCharacters.forEach(character => {
        let matchedDiv = allDivs.find((oneDiv) => {
            return oneDiv.firstChild.textContent === character.name
        }
        
        )
        matchedDiv.setAttribute("style", "display: none;")
    }) */
})

function deleteNodes() {
    while (mainArea.firstChild) {
        mainArea.removeChild(mainArea.firstChild)
    }
}

// navArea.appendChild(allButton)
navArea.appendChild(maleButton)
navArea.appendChild(femaleButton)
navArea.appendChild(othersButton)

// const allButton = people.filter(person => person.gender === 'male' && 'female')
const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter(person => person.gender !== 'female' && person.gender !== 'male')