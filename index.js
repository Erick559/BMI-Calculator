// Variables needed for calculating the BMI

const height = document.querySelector('.height')
const weight = document.querySelector('.weight')
const age = document.querySelector('.age')
const gender = document.querySelector('.gender')
const heightUnit = document.querySelector('.height-unit')
const weightUnit = document.querySelector('.weight-unit')

//Variables needed for the background color change

const inputBoxes = document.querySelectorAll('input')
const labels = document.querySelectorAll('label')
const selectBoxes = document.querySelectorAll('select')
const container = document.querySelector('.container')

// Variables needed for appending the BMI results

const header = document.querySelector('.header')
const title = document.querySelector('.title')
const mainSection = document.querySelector('.main-text')
const commentsSection = document.createElement('p')
const resultWindow = document.querySelector('.result-window')
const iconContainer = document.querySelector('.icon-container')

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

// This function changes the container's color according to the returned BMI weight category

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

// This function appends the calculated BMI results to the header container

function appendResults(){
    let bmiResult = calculateBMI()
    let comments = getRandomComment(getWeightCategory())
  
    if(bmiResult === 'NaN'){
        mainSection.textContent = 'FILL IN DETAILS CORRECTLY'
        mainSection.style.color= 'red'
    }
    else{
        title.textContent = 'YOUR RESULT'
        mainSection.textContent = bmiResult

        mainSection.style.fontSize = '60px'
        mainSection.style.color = 'white'
        mainSection.style.marginBottom = '20px'

        title.style.color = 'white'
        title.style.fontWeight = '700'

        commentsSection.textContent = comments
        commentsSection.style.color = 'white'
        commentsSection.style.fontWeight = '700'
        commentsSection.style.fontSize = '15px'

        header.appendChild(commentsSection)
    }
}

function getRandomComment(weightCategory) {
    const comments = {
      "Underweight": ["You may want to consider gaining some weight.", "Eat a balanced diet for better health."],
      "Normal Weight": ["You're in a healthy weight range. Keep it up!", "Maintaining a healthy weight is important for overall well-being."],
      "Overweight": ["Consider making lifestyle changes to achieve a healthier weight.", "Regular exercise and a balanced diet can help with weight management."],
      "Obese": ["It's important to address obesity for long-term health.", "Consult with a healthcare professional for personalized advice."],
    };
  
    return comments[weightCategory] ? comments[weightCategory][Math.floor(Math.random() * comments[weightCategory].length)].toUpperCase() : "";
}

function appendIcon(){
    let bmiResult = calculateBMI()
    let existingIcon = document.querySelector('i')

    if(!existingIcon){
        if (bmiResult === NaN){

        } 
        else{
            let icon = document.createElement('i')
            icon.classList.add('fa-solid', 'fa-question', 'fa-xl')
            iconContainer.appendChild(icon)
        }  
    }
}




calculateButton.addEventListener('click',() => {
    changeContainerColor()
    appendResults()
    appendIcon()
})
