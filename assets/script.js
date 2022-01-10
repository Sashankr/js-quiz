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

showHighScoresButton.addEventListener('click',()=>{
    quizWelcomeCard.remove();
    hightScoresContainer.classList.add('show');
    quizContainer.appendChild(hightScoresContainer)
})


function showWelcomeCard(){
    hightScoresContainer.classList.remove('show');
    hightScoresContainer.remove();
    quizContainer.appendChild(quizWelcomeCard);
}


function startQuiz(){
  quizWelcomeCard.remove();
  const deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 52);
  const countdown = setInterval(()=>{
  const now = new Date().getTime();
  const interval = deadline - now
  if(interval !== null){
    debugger;
    const seconds = Math.floor((interval % (1000 * 60)) / 1000);
    quizTimer.textContent = seconds;
    if(seconds <= 0){
      clearInterval(countdown)
  }
  }

  },1000)

}







