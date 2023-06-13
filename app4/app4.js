let colorNumber= sessionStorage.getItem("number") || 5
let colorContainer = document.querySelector("#color-container")
for (let i = 0; i < colorNumber; i++) {
    colorContainer.innerHTML += `<button class="color-bloc w-28 h-28"></button>`
}

const colArray = [...document.querySelectorAll(".color-bloc")]
const modeButtons = [...document.querySelectorAll(".mode-button")]
const HexText = document.querySelector("#hex-text")

let randColor = Math.floor(Math.random()*colArray.length)
let randRGB = {}


function rgbToHex(r,g,b) {
    return "#" + toBase16(r) + toBase16(g) + toBase16(b)
}

function toBase16(value) {
    let unit = value%16
    let tens = Math.floor(value/16)
    if (unit > 9) {
        unit = String.fromCharCode('A'.charCodeAt(0) - 10 + unit)
    }
    if (tens > 9) {
        tens = String.fromCharCode('A'.charCodeAt(0) - 10 + tens)
    }
    return `${tens}${unit}`
}

function wingame() {
    HexText.innerText = randRGB.Hex + "\nYou win!"
    HexText.style.color = `rgb(${randRGB.red},${randRGB.green},${randRGB.blue})`
    colArray.forEach((color) => {
        color.disabled = true;
    })
}

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        colorNumber = button.id.slice(-1)
        sessionStorage.setItem("number", colorNumber)
        location.reload()
    })
})

colArray.forEach((color, index) => {
    const r = Math.floor(Math.random()*256)
    const g = Math.floor(Math.random()*256)
    const b = Math.floor(Math.random()*256)
    color.style.backgroundColor = `rgb(${r},${g},${b})`;
    if (index === randColor) {
        randRGB.red = r
        randRGB.green = g
        randRGB.blue = b
        randRGB.Hex = rgbToHex(r,g,b)
    }

    color.addEventListener("click", () => {
        if (index === randColor) {
            wingame()
        } else {
            color.style.backgroundColor = 'rgb(255,255,255)'
            color.disabled = true;
        }
    })
})


HexText.innerText = randRGB.Hex


