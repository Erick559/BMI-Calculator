const container = document.querySelector('.container')

// Variables needed for calculating the BMI
const height = document.querySelector('.height')
const weight = document.querySelector('.weight')
const age = document.querySelector('.age')
const gender = document.querySelector('.gender')
const heightUnit = document.querySelector('.height-unit')
const weightUnit = document.querySelector('.weight-unit')

const calculateButton = document.querySelector('.submit')

// This function gets the values of the height and weight unit and returns the converted units which will be kg and meters
function getHeightValue(){
    let selectedHeightUnit = heightUnit.value
    let heightInput;

    if (selectedHeightUnit == 'inches'){
        heightInput = height.value * 0.0254
    }
    else{
        heightInput = height.value / 100;
    }

    return heightInput
}

calculateButton.addEventListener('click',() => {
    console.log(getHeightValue())
})
