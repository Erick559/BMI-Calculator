const container = document.querySelector('.container')

// Variables needed for calculating the BMI
const height = document.querySelector('.height')
const weight = document.querySelector('.weight')
const age = document.querySelector('.age')
const gender = document.querySelector('.gender')
const heightUnit = document.querySelector('.height-unit')
const weightUnit = document.querySelector('.weight-unit')

const calculateButton = document.querySelector('.submit')

// This function gets the value of the height unit and returns the converted unit which will be meters squared

function getHeightValue(){
    let selectedHeightUnit = heightUnit.value
    let heightInput;

    if (selectedHeightUnit == 'inches'){
        heightInput = height.value * 0.0254
    }
    else{
        heightInput = height.value / 100;
    }

    return parseFloat(heightInput ** 2)
}

// This function gets the value of the weight unit and returns the converted unit which will be kg

function getWeightValue(){
    let selectedWeightUnit = weightUnit.value
    let weightInput;

    if (selectedWeightUnit == 'pounds'){
        weightInput = (weight.value * 0.453592).toFixed(2)
    }
    else {
        weightInput = weight.value
    }

    return parseFloat(weightInput)
}

// This function takes the heightValue and weightValue from their respective functions and returns the BMI

function calculateBMI(){
    let userHeight = getHeightValue()
    let userWeight = getWeightValue()

    return userWeight/userHeight
}


calculateButton.addEventListener('click',() => {
    console.log(calculateBMI())
})
