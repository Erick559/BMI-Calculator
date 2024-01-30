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

// Variables needed for more information pop up
const resultWindow = document.querySelector('.result-window')
const iconContainer = document.querySelector('.icon-container')
const popUpWindow = document.querySelector('.popup-window')
const displayedImage = document.querySelector('img')
const closeButton = document.querySelector('.close')
const weightHeader = document.querySelector('.bmi-category')
const bmiInformation = document.querySelector('.bmi-information')
const overlay = document.querySelector('.overlay')

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
        labels.forEach(label => label.style.color = 'black')
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
        title.textContent = 'BodyBalance'
        title.style.color = '#D2D2D6'
        mainSection.textContent = 'FILL IN DETAILS CORRECTLY'
        mainSection.style.color= 'red'
        mainSection.style.fontSize= '40px'
        commentsSection.textContent = ''
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
    let existingIcon = document.querySelector('#moreinfo-icon')

    if (bmiResult !== 'NaN'){
        if(!existingIcon){
            iconContainer.classList.add('show')
            let icon = document.createElement('i')
            icon.setAttribute('id','moreinfo-icon')
            icon.classList.add('fa-solid', 'fa-question', 'fa-xl')
            iconContainer.appendChild(icon)
        }
    }
    else {
        iconContainer.classList.remove('show')
        existingIcon.removeAttribute('id')
        existingIcon.classList.remove('fa-solid', 'fa-question', 'fa-xl')
    }
}

function appendInformation(){
    let category = getWeightCategory()

    switch (category) {
        case 'Underweight':
            displayedImage.src='BMI Images/Waluigi.png'
            displayedImage.alt='Weight Category'
            weightHeader.textContent = category
            bmiInformation.textContent = 'Those falling below a BMI of 18.5 are considered underweight, signifying insufficient body weight relative to height and potential health risks such as nutritional deficiencies.'
            break;
        
        case 'Normal Weight':
            displayedImage.src='BMI Images/Luigi.webp'
            displayedImage.alt = 'Weight Category'
            weightHeader.textContent = category
            bmiInformation.textContent = 'The normal weight range, with a BMI between 18.5 and 24.9, is generally regarded as a healthy zone associated with a lower risk of various health conditions.'
            break;
        
        case 'Overweight':
            displayedImage.src='BMI Images/wario.webp'
            displayedImage.alt= 'Weight Category'
            weightHeader.textContent = category
            bmiInformation.textContent = 'A BMI between 25 and 29.9 indicates overweight status, reflecting excess body weight relative to height and an increased risk of health issues like heart disease, type 2 diabetes, and hypertension.'
            break;
        
        case 'Obese':
            displayedImage.src='BMI Images/bowser.png'
            displayedImage.alt= 'Weight Category'
            weightHeader.textContent = category
            bmiInformation.textContent = 'Obesity, identified with a BMI of 30 or higher, is further categorized into three classes based on severity.Class I, or moderate obesity (BMI 30-34.9), signifies the initial stage of obesity. Class II, or severe obesity (BMI 35-39.9), represents a higher level of excess weight. Class III, or very severe/morbid obesity (BMI 40 or higher), is associated with a significantly elevated risk of serious health conditions, including cardiovascular disease, diabetes, and certain cancers.'
    }
}

iconContainer.addEventListener('click', ()=>{
    popUpWindow.classList.add('active')
    overlay.classList.add('active')

    appendInformation()
})

closeButton.addEventListener('click', ()=>{
    popUpWindow.classList.remove('active')
    overlay.classList.remove('active')})

calculateButton.addEventListener('click',() => {
    changeContainerColor()
    appendResults()
    appendIcon()
})
