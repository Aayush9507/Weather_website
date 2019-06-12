console.log('Client side javascript file loaded')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

msg1.textContent = ""

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value


    fetch('/weather?address='+location).then(response => {
    response.json().then((data) => {
        if (data.error){
            msg1.textContent = data.error
        }
        else {
            msg1.textContent = data.location
            msg1.textContent = data.forecast


        }
    })
})


})