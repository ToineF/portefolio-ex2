const height = document.querySelector("#height")
const weight = document.querySelector("#weight")
const submitButton = document.querySelector("#submitButton")
const answer = document.querySelector("#answer")

console.log(height.value)
submitButton.addEventListener('click', () => {
    const heightValue = height.value / 100
    const weightValue = weight.value
    if (isNaN(heightValue) || isNaN(weightValue) 
    || !heightValue || !weightValue) {
        preventDefault()
    }
    let imc = weightValue / (Math.pow(heightValue,2))
    imc = imc.toFixed(1)
    answer.innerText = `You have a BMI of ${imc}`
})