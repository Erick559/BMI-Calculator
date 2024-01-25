const container = document.querySelector('.container')

// Variables needed for calculating the BMI
const height = document.querySelector('.height')
const weight = document.querySelector('.weight')
const age = document.querySelector('.age')
const gender = document.querySelector('.gender')
const heightUnit = document.querySelector('.height-unit')
const weightUnit = document.querySelector('.weight-unit')

const inputBoxes = document.querySelectorAll('input')
const labels = document.querySelectorAll('label')
const selectBoxes = document.querySelectorAll('select')

const calculateButton = document.querySelector('button')

// This function gets the value of the height unit and returns the converted unit which will be meters squared

function getHeightValue(){
    let selectedHeightUnit = heightUnit.value
    let heightInput;

    if (selectedHeightUnit == 'inches'){
        heightInput = parseFloat(height.value * 0.0254).toFixed(2)
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
    let BMI = userWeight/userHeight

    return parseFloat(BMI).toFixed(2)
}

// This function returns the weight category according to the calculated BMI value

function getWeightCategory(){
    let calculatedBMI = calculateBMI()
    let weightCategory;

    if (calculatedBMI <18.5){
        weightCategory = 'Underweight'
    }
    else if (calculatedBMI >= 18.5 && calculatedBMI<= 24.9){
        weightCategory = 'Normal Weight'
    }
    else if (calculatedBMI >= 25 && calculatedBMI <= 29.9){
        weightCategory = 'Overweight'
    } 
    else if (calculatedBMI >= 30 ){
        weightCategory = 'Obese'
    }

    return weightCategory
}

function changeContainerColor(){
    let returnedWeightCategory = getWeightCategory()

    if(returnedWeightCategory === undefined){
        container.style.backgroundColor = '#F5F5F5'
        inputBoxes.forEach(inputBox => inputBox.style.backgroundColor ='#F5F5F5')
        selectBoxes.forEach(selectBox => selectBox.style.backgroundColor='#F5F5F5')
    }
    else{
        switch (returnedWeightCategory){
            case 'Underweight':
                container.style.backgroundColor= '#87B1E3'
                inputBoxes.forEach(inputBox => inputBox.style.backgroundColor ='#87B1E3')
                selectBoxes.forEach(selectBox => selectBox.style.backgroundColor='#87B1E3')
                break;
    
            case 'Normal Weight':
                container.style.backgroundColor = '#C1E898'
                inputBoxes.forEach(inputBox => inputBox.style.backgroundColor ='#C1E898')
                selectBoxes.forEach(selectBox => selectBox.style.backgroundColor='#C1E898')
                break;
            
            case 'Overweight':
                container.style.backgroundColor = '#F9E488'
                inputBoxes.forEach(inputBox => inputBox.style.backgroundColor ='#F9E488')
                selectBoxes.forEach(selectBox => selectBox.style.backgroundColor='#F9E488')
                break;
            
            case 'Obese':
                container.style.backgroundColor = '#F38B8B'
                inputBoxes.forEach(inputBox => inputBox.style.backgroundColor ='#F38B8B')
                selectBoxes.forEach(selectBox => selectBox.style.backgroundColor='#F38B8B')
        }
    
        labels.forEach(label => label.style.color = 'white')
        calculateButton.classList.add('calculate')
        container.appendChild(calculateButton)
    }
}

calculateButton.addEventListener('click',() => {
    console.log(getWeightCategory())
    changeContainerColor()
})
