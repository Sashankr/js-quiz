const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

const showHighScoresButton = document.querySelector('#leaderboard');
const quizContainer = document.querySelector('.quiz-container');
const quizWelcomeCard = document.querySelector('.quiz-welcome-card');
const hightScoresContainer = document.querySelector('.quiz-highscore-container');
const body = document.getElementsByTagName('body');
const quizTimer = document.querySelector('.quiz-timer');
const quizQuestions = document.createElement('div');
quizQuestions.classList.add('quiz-questions');
let selectCount = 0;
let questionIndex = 0;

showHighScoresButton.addEventListener('click',()=>{
    quizWelcomeCard.remove();
    quizQuestions.remove();
    hightScoresContainer.classList.add('show');
    quizContainer.appendChild(hightScoresContainer)
})


function showWelcomeCard(){
    hightScoresContainer.classList.remove('show');
    hightScoresContainer.remove();
    quizQuestions.remove();
    quizContainer.appendChild(quizWelcomeCard);
}

const startTimer = () => {

    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 52);
    const countdown = setInterval(()=>{
    const now = new Date().getTime();
    const interval = deadline - now
    const seconds = Math.floor((interval % (1000 * 60)) / 1000);
    quizTimer.textContent = seconds;
        if(seconds <= 0){
            clearInterval(countdown)
        }
    },1000)

}

const createQuestions = (data,index) => {
    
        const quizSingleQuestion = document.createElement('div');
        quizSingleQuestion.classList.add('quiz-single-question');

        const quizQuestionTitle = document.createElement('h2');
        quizQuestionTitle.textContent = data.questionText

        quizQuestionTitle.classList.add('question-title');
        quizQuestions.appendChild(quizSingleQuestion);
        quizSingleQuestion.appendChild(quizQuestionTitle);
        quizSingleQuestion.setAttribute('data-key',index);

    const answerList = document.createElement('div');
    answerList.classList.add('quiz-answers-list');
    quizSingleQuestion.appendChild(answerList);
    data.options.forEach((answer)=>{
        const answerItem = document.createElement('button');
        answerItem.classList.add('quiz-answer-item');
        answerList.appendChild(answerItem);
        answerItem.textContent = answer;
    })


}


const showResult = (content,question,count) => {
    if(count === 1){
    const currentAnswer = document.createElement('p');
    question.appendChild(currentAnswer);
    currentAnswer.textContent = content;
    questionIndex++;
    console.log(questionIndex)
    debugger;
    showQuestion(questionIndex)
    }

}

const selectAnswer = (answers,index,question) => {


    answers.addEventListener('click',()=>{
        if(answers.textContent === questions[index].answer){
            selectCount++
            showResult('Correct!',question,selectCount)
        }
        else{
            selectCount++;
            showResult('InCorrect!',question,selectCount)
        }
    },{
        once : true
    })
}

const showAnswer = (question,index) => {
    console.log('question',question);

    const answers = question.querySelector('.quiz-answers-list');
    const answersList = answers.querySelectorAll('.quiz-answer-item');
    answersList.forEach((el)=>{
        selectAnswer(el,index,question)    
    })
    
}

const showQuestion = (index) => {

    questions.forEach((data,index)=>{
        createQuestions(data,index);
    })

    const questionsList = document.querySelectorAll('.quiz-single-question');

    questionsList.forEach((el,questionIndex)=>{
        if(questionIndex !== index){
            el.remove();
        }
    })

let quizSingleQuestion = document.querySelector(`[data-key="${index}"]`);
showAnswer(quizSingleQuestion, index);
}

function startQuiz(){
    quizWelcomeCard.remove();
    hightScoresContainer.remove();
 
    startTimer();

    quizContainer.appendChild(quizQuestions);
    showQuestion(0)
}








