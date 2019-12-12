async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

//use the returned async data
let allSenators = []
let simpleSenators = []
const theData = getAPIData('/assets/senators.json').then(data => {
    allSenators = data.results[0].members
    simpleSenators = makeSimpleMap(allSenators)
    populateDOM(simpleSenators)
})

//map
function makeSimpleMap(allOfThem) {
    let results = allOfThem.map(senator => {
        return {
            id: senator.id,
            name: `${senator.first_name} ${senator.last_name}`,
            party: senator.party,
            age: `${calculate_age(new Date(senator.date_of_birth))}`,
            state: senator.state,
            gender: senator.gender,
            twitterAccount: senator.twitter_account,
            office: senator.office,
        }
    })
    return results
}

//filter



const container = document.querySelector('.container')

function populateDOM(senator_array) {
    senator_array.forEach(senator => {
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        let cardImage = document.createElement('div')
        cardImage.setAttribute('class', 'card-image')
        let figure = document.createElement('figure')
        figure.setAttribute('class', 'image')
        let figureImage = document.createElement('img')
        figureImage.src = `https://www.congress.gov/img/member/${senator.id.toLowerCase()}_200.jpg`
        figureImage.alt = 'Placeholder image'

        figure.appendChild(figureImage)
        cardImage.appendChild(figure)
        card.appendChild(cardImage)
        card.appendChild(cardContent(senator))
        container.appendChild(card)
    })
}

function cardContent(senator) {
    let cardContent = document.createElement('div')
    cardContent.setAttribute('class', 'card-content')
    let media = document.createElement('div')
    media.setAttribute('class', 'media')
    let mediaLeft = document.createElement('div')
    mediaLeft.setAttribute('class', 'media-left')
    let figure = document.createElement('figure')
    figure.setAttribute('class', 'image is-48x48')
    let img = document.createElement('img')
    if (senator.party === "R") {
        img.src = `/images/elephant_republicans.jpeg`
    }
    if (senator.party === "D") {
        img.src = `/images/donkey_democrats.jpg`
    }
    if (senator.party === "ID") {
        img.src = `https://bulma.io/images/placeholders/96x96.png`
        img.alt = 'Placeholder image'
    }


    let mediaContent = document.createElement('div')
    mediaContent.setAttribute('class', 'media-content')
    let titleP = document.createElement('p')
    titleP.setAttribute('class', 'title is-5')
    titleP.textContent = senator.name
    let subtitleP = document.createElement('p')
    subtitleP.setAttribute('class', 'subtitle is-6')
    subtitleP.textContent = `State: ${senator.state}`

    let contentDiv = document.createElement('div')
    contentDiv.setAttribute('class', 'content')
    let contentBreak = document.createElement('br')
    let ageP = document.createElement('p')
    ageP.textContent = `Age: ${senator.age}`
    let twitterAccount = document.createElement('p')
    twitterAccount.textContent = `Twitter: @${senator.twitterAccount}`
    let office = document.createElement('p')
    office.textContent = `Office: ${senator.office}`

    mediaContent.appendChild(titleP)
    mediaContent.appendChild(subtitleP)
    figure.appendChild(img)
    mediaLeft.appendChild(figure)
    media.appendChild(mediaLeft)
    media.appendChild(mediaContent)

    contentDiv.appendChild(contentBreak)
    contentDiv.appendChild(ageP)
    contentDiv.appendChild(twitterAccount)
    contentDiv.appendChild(office)
    cardContent.appendChild(media)
    cardContent.appendChild(contentDiv)

    return cardContent
}

function calculate_age(dob) {
    let diff_ms = Date.now() - dob.getTime()
    let age_dt = new Date(diff_ms)

    return Math.abs(age_dt.getUTCFullYear() - 1970)
}