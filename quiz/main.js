let currentQuestion = 0;
let score = [];
let char = [];
let selectedAnswersData = [];
const totalQuestions = questions.length;

//Set score variables
let elizabethScore = 0;
let proctorScore = 0;
let parrisScore = 0;
let haleScore = 0;
let rebeccaScore = 0;
let abigailScore = 0;
let maryScore = 0;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Char = questions[index].answer1Char;
    const option2Char = questions[index].answer2Char;
    const option3Char = questions[index].answer3Char;
    const option4Char = questions[index].answer4Char;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-char', `${option1Char}`);
    option2.setAttribute('data-char', `${option2Char}`);
    option3.setAttribute('data-char', `${option3Char}`);
    option4.setAttribute('data-char', `${option4Char}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
    option4.innerHTML = `${question.answer4}`
}

function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerChar = String(selectedOption.nextElementSibling.getAttribute('data-char'));

    //Add the answer score to the score array
    char.push(answerChar);

    selectedAnswersData.push()

    //Increase score for a character depending on the answer
    if(answerChar == "elizabeth"){
        elizabethScore++;
    }
    if(answerChar == "proctor"){
        proctorScore++;
    }
    if(answerChar == "parris"){
        parrisScore++;
    }
    if(answerChar == "hale"){
        haleScore++;
    }
    if(answerChar == "rebecca"){
        rebeccaScore++;
    }
    if(answerChar == "mary"){
        maryScore++;
    }
    if(answerChar == "abigail"){
        abigailScore++;
    }

    //Finally we incement the current question number (to be used as the index for each array)
    currentQuestion++;
    //once finished clear checked
    selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        let scores = [elizabethScore, proctorScore, parrisScore, haleScore, rebeccaScore, maryScore, abigailScore]
        let highestScore = Math.max(elizabethScore, proctorScore, parrisScore, haleScore, rebeccaScore, maryScore, abigailScore);
        console.log(scores)
        console.log(highestScore)
        container.style.display = 'none';
        if(elizabethScore == highestScore){
            result.innerHTML =
            `<div class="summary">
               <h1>You got Elizabeth Proctor!</h1>
               <p>Congratulations! You probably got one of the best results on this quiz. Make sure to keep an eye on your husband, though.</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
        if(proctorScore == highestScore){
            result.innerHTML =
            `<div class="summary">
               <h1>You got John Proctor!</h1>
               <p>Except you're actually alive. I hope.</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
        if(parrisScore == highestScore){
            result.innerHTML =
            `<div class="summary">
               <h1>You got Reverend Parris!</h1>
               <p>Although you shouldn't tell anyone, or else you're gonna come home to find a dagger stuck in your door.</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
        if(haleScore == highestScore){
            result.innerHTML =
            `<div class="summary">
               <h1>You got Reverend Hale!</h1>
               <p>Stay away from alcoholic beverages.</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
        if(rebeccaScore == highestScore){
            result.innerHTML =
            `<div class="summary">
               <h1>You got Rebecca Nurse!</h1>
               <p>You'd probably be a good parent.</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
        if(maryScore == highestScore){
            result.innerHTML =
            `<div class="summary">
               <h1>You got Mary Warren!</h1>
               <p>You know what you want, and how to get it. You switch sides at a moment's notice.</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
        if(abigailScore == highestScore){
            result.innerHTML =
            `<div class="summary">
               <h1>You got Abigail Williams!</h1>
               <p>It's not too late to retake the quiz.</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
        else {
            result.innerHTML =
            `<div class="summary">
               <h1>You got... !?</h1>
               <p>I don't know who you got. This is an error handling message. If it shows up, tell me you got it and I'll look into it.</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }
}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);


