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
const listWrapper = document.querySelector('.list-wrapper');
const quizQuestions = document.createElement('div');
quizQuestions.classList.add('quiz-questions');
const highscoreList = document.createElement('ol');
highscoreList.classList.add('quiz-highscores-list');

let selectCount = 0;
let questionIndex = 0;
let score;
let stopTimer = false;
let timerValue = 50;
let users = [];
let gameEnd = false;


const showHighScores = () => {
  stopTimer = true;
  quizTimer.textContent = '';

  document.querySelectorAll('.highscore-item').forEach((el)=>{
    el.remove();
  })
  quizWelcomeCard.classList.add('hide');
  quizQuestions.classList.add('hide');
  hightScoresContainer.classList.add('show');
  quizContainer.appendChild(hightScoresContainer)

  listWrapper.appendChild(highscoreList)
  const data = JSON.parse(localStorage.getItem('user_scores' || "[]"))
  data.forEach((scoreData) => {
    const listItem = document.createElement('li');
    listItem.classList.add('highscore-item')
    highscoreList.appendChild(listItem);
    listItem.textContent = `${scoreData.name} -  ${scoreData.score}`
  })
  
}

const clearHighScores = () =>{
  users = [];
  localStorage.clear();
  document.querySelectorAll('.highscore-item').forEach((el)=>{
    el.remove();
  })
}

showHighScoresButton.addEventListener('click', () => {
  showHighScores()
})


function showWelcomeCard() {
  const header = document.querySelector('header');
  header.classList.remove('flex-end');

  hightScoresContainer.classList.remove('show');
  quizWelcomeCard.classList.remove('hide')
  quizQuestions.classList.add('hide');
  // startQuiz();
  showHighScoresButton.classList.remove('hide');
}

const startTimer = () => {


  const countdown = setInterval(() => {

    if (stopTimer || timerValue + 1 <= 0) {
      clearInterval(countdown)
      if (timerValue + 1 <= 0 && gameEnd) {
        endGame()
      }
    }
    else {
      score = timerValue;
      quizTimer.textContent = timerValue;
    }
    timerValue -= 1;


  }, 1000)

}

const createQuestions = (data, index) => {

  const quizSingleQuestion = document.createElement('div');
  quizSingleQuestion.classList.add('quiz-single-question');

  const quizQuestionTitle = document.createElement('h2');
  quizQuestionTitle.textContent = data.questionText

  quizQuestionTitle.classList.add('question-title');
  quizQuestions.appendChild(quizSingleQuestion);
  quizSingleQuestion.appendChild(quizQuestionTitle);
  quizSingleQuestion.setAttribute('data-key', index);

  const answerList = document.createElement('div');
  answerList.classList.add('quiz-answers-list');
  quizSingleQuestion.appendChild(answerList);
  data.options.forEach((answer) => {
    const answerItem = document.createElement('button');
    answerItem.classList.add('quiz-answer-item');
    answerList.appendChild(answerItem);
    answerItem.textContent = answer;
  })
}



const endGame = () => {
  quizQuestions.remove();
  // stopTimer();

  const endgameContainer = document.createElement('div');
  endgameContainer.classList.add('endgame-card');
  quizContainer.appendChild(endgameContainer);

  const endgameTitle = document.createElement('h2');
  endgameTitle.textContent = 'All Done!';
  endgameContainer.appendChild(endgameTitle);

  const endgameScore = document.createElement('p');
  endgameScore.textContent = `Your final score is ${score}`;
  endgameContainer.appendChild(endgameScore);

  const initialsData = document.createElement('div');
  initialsData.classList.add('initials-data');

  endgameContainer.appendChild(initialsData);

  const initialsText = document.createElement('p');
  initialsText.textContent = 'Enter initials : '
  initialsData.appendChild(initialsText);

  const initialsInput = document.createElement('input');
  initialsInput.setAttribute("type", "text");

  initialsData.appendChild(initialsInput);

  const initialsSubmitButton = document.createElement('button');
  initialsSubmitButton.classList.add('initials-submit');
  initialsSubmitButton.textContent = 'Submit';

  initialsData.appendChild(initialsSubmitButton);

  initialsSubmitButton.addEventListener('click', () => {
    if (initialsInput.value.trim() === '') {
      initialsInput.style.border = '2px solid red';
    }
    else {
      initialsInput.style.border = '2px solid #b2afaf';
      users.push({
        name: initialsInput.value,
        score: score
      })
      gameEnd = true;
      localStorage.setItem('user_scores', JSON.stringify(users))
      endgameContainer.remove();
      showHighScores();
    }
  })

  initialsInput.addEventListener('change', () => {
    if (initialsInput.value.trim() !== '') {
      initialsInput.style.border = '2px solid #b2afaf';
    }
    else {
      initialsInput.style.border = '2px solid red';
    }
  })


}

const showResult = (content, question, count) => {
  if (count === 1) {
    const currentAnswer = document.createElement('p');
    question.appendChild(currentAnswer);
    if (content === 'InCorrect!') {
      timerValue -= 10;
      console.log('show', timerValue);
    }
    currentAnswer.textContent = content;
    questionIndex++;
    setTimeout(() => {
      if (questionIndex <= questions.length - 1) {
        showQuestion(questionIndex)
      }
      else {
        stopTimer= true;
        endGame();
      }
    }, 1000)
  }

}

const selectAnswer = (answers, index, question) => {
  selectCount = 0;

  answers.addEventListener('click', (event) => {
    if (answers.textContent === questions[index].answer) {
      selectCount++
      showResult('Correct!', question, selectCount)
    }
    else {
      selectCount++;
      showResult('InCorrect!', question, selectCount)

    }
  }, {
    once: true
  })
}

const showAnswer = (question, index) => {

  const answers = question.querySelector('.quiz-answers-list');
  const answersList = answers.querySelectorAll('.quiz-answer-item');
  answersList.forEach((el) => {
    selectAnswer(el, index, question)
  })

}

const showQuestion = (index) => {

  questions.forEach((data, index) => {
    createQuestions(data, index);
  })

  const questionsList = document.querySelectorAll('.quiz-single-question');

  questionsList.forEach((el) => {
    if (el.getAttribute('data-key') !== `${index}`) {
      el.remove();
    }
  })


  let quizSingleQuestion = document.querySelector(`[data-key="${index}"]`);
  showAnswer(quizSingleQuestion, index);

}

function startQuiz() {
  quizWelcomeCard.classList.add('hide');
  hightScoresContainer.classList.add('hide');
  quizContainer.appendChild(quizQuestions);
  quizQuestions.classList.remove('hide')
  showQuestion(0)
  timerValue = 50;
  stopTimer = false;
  questionIndex = 0;
  startTimer();

  showHighScoresButton.classList.add('hide')
  const header = document.querySelector('header');
  header.classList.add('flex-end');
}








