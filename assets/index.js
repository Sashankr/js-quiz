const showHighScoresButton = document.querySelector('#leaderboard');
const quizContainer = document.querySelector('.quiz-container');
const quizWelcomeCard = document.querySelector('.quiz-welcome-card');
const hightScoresContainer = document.querySelector('.quiz-highscore-container');
const body = document.getElementsByTagName('body');

showHighScoresButton.addEventListener('click',()=>{
    quizWelcomeCard.remove();
    hightScoresContainer.classList.add('show');
    quizContainer.appendChild(hightScoresContainer)
    // body.appendChild(hightScoresContainer);
})


function showWelcomeCard(){
    hightScoresContainer.classList.remove('show');
    hightScoresContainer.remove();
    quizContainer.appendChild(quizWelcomeCard);
}