const count = document.querySelector("#counter")
const minus = document.querySelector("#minusButton")
const plus = document.querySelector("#plusButton")

minus.addEventListener('click', () => {
    count.innerText = Number(count.innerText) -1
})

plus.addEventListener('click', () => {
    count.innerText = Number(count.innerText) +1
})