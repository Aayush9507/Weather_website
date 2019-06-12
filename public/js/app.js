console.log('Client side javascript file loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

// fetch('http://localhost:3000/weather?address=!').then(response => {
//     response.json().then((data) => {
//         if (data.error){
//             console.log(data.error)
//         }
//         else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

msg1.textContent = "From app.js"

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    // console.log(location)

    fetch('http://localhost:3000/weather?address='+location).then(response => {
    response.json().then((data) => {
        if (data.error){
            msg1.textContent = data.error
        }
        else {
            // console.log(data.location)
            msg1.textContent = data.location
            msg1.textContent = data.forecast


        }
    })
})


})