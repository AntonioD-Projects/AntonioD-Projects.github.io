let currentQuestion = 0;
let score = [];
let char = [];
let selectedAnswersData = [];
const totalQuestions = questions.length;

//CHANGE THESE TO THE CHARACTERS IN THE BOOK
//THEN JUST WRITE OUT SOME QUESTIONS & RESPONSES
//DO WE NEED THE VALUE ANYMORE IF THEY ALL GONNA BE THE SAME
let cakeScore = 1;
let chessScore = 1;
let courageScore = 1;
let wimpScore = 1;

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
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    const option4Total = questions[index].answer4Total;
    const option1Char = questions[index].answer1Char;
    const option2Char = questions[index].answer2Char;
    const option3Char = questions[index].answer3Char;
    const option4Char = questions[index].answer4Char;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option4.setAttribute('data-total', `${option4Total}`);
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
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));
    const answerChar = String(selectedOption.nextElementSibling.getAttribute('data-char'));

    //Add the answer score to the score array
    score.push(answerScore);
    char.push(answerChar);

    selectedAnswersData.push()

    if(answerChar == "cake"){
        cakeScore++;
    }
    if(answerChar == "chess"){
        chessScore++;
    }
    if(answerChar == "wimp"){
        wimpScore++;
    }
    if(answerChar == "courage"){
        courageScore++;
    }

    totalScore = score.reduce((total, currentNum) => total + currentNum);

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
        let scores = [cakeScore, chessScore, wimpScore, courageScore]
        let highestScore = Math.max(cakeScore, chessScore, wimpScore, courageScore);
        console.log(scores)
        console.log(highestScore)
        container.style.display = 'none';
        if(cakeScore == highestScore){
            result.innerHTML =
            `<h1 class="final-score">Your score: ${totalScore}</h1>
            <div class="summary">
               <h1>Summary</h1>
               <p>CAKE BEST SCORE</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
        if(chessScore == highestScore){
            result.innerHTML =
            `<h1 class="final-score">Your score: ${totalScore}</h1>
            <div class="summary">
               <h1>Summary</h1>
               <p>CHESS BEST SCORE</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
        if(wimpScore == highestScore){
            result.innerHTML =
            `<h1 class="final-score">Your score: ${totalScore}</h1>
            <div class="summary">
               <h1>Summary</h1>
               <p>WIMP BEST SCORE</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
        if(courageScore == highestScore){
            result.innerHTML =
            `<h1 class="final-score">Your score: ${totalScore}</h1>
            <div class="summary">
               <h1>Summary</h1>
               <p>COURAGE HIGHEST SCORE</p>
           </div>
           <button class="restart">Restart Quiz</button>
            `;
           return;   
        }
        else {
            result.innerHTML =
            `<h1 class="final-score">Your score: ${totalScore}</h1>
            <div class="summary">
               <h1>Summary</h1>
               <p>You clicked somethin else idk</p>
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


