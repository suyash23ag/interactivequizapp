// This file contains the main logic for the quiz functionality, including handling user interactions, updating the score, and managing the quiz flow.

const quizData = []; // This will hold the quiz questions and answers
let currentQuestionIndex = 0;
let score = 0;
let timer;
const totalQuestions = 5; // Adjust based on the number of questions

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz-card').classList.remove('hidden');
    document.getElementById('home-card').classList.add('hidden');
    loadQuestion();
}

// Function to load a question
function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQuestion.question;
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectOption(option));
        document.getElementById('options-container').appendChild(button);
    });
    startTimer();
}

// Function to handle option selection
function selectOption(option) {
    clearInterval(timer);
    const correct = option.correct;
    if (correct) {
        score++;
        showFeedback('Correct!', true);
    } else {
        showFeedback('Wrong!', false);
    }
    setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

// Function to show feedback
function showFeedback(message, isCorrect) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerText = message;
    feedbackElement.classList.remove('hidden');
    feedbackElement.classList.add(isCorrect ? 'correct' : 'wrong');
}

// Function to show results
function showResults() {
    document.getElementById('quiz-card').classList.add('hidden');
    document.getElementById('results-card').classList.remove('hidden');
    document.getElementById('final-score').innerText = `${score} points`;
}

// Function to reset state
function resetState() {
    clearFeedback();
    clearOptions();
}

// Function to clear feedback
function clearFeedback() {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.classList.add('hidden');
}

// Function to clear options
function clearOptions() {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
}

// Function to start the timer
function startTimer() {
    let timeRemaining = 30; // 30 seconds for each question
    document.getElementById('time-remaining').innerText = `${timeRemaining} seconds`;
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('time-remaining').innerText = `${timeRemaining} seconds`;
        document.getElementById('timer-progress').style.width = `${(timeRemaining / 30) * 100}%`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            showFeedback('Time is up!', false);
            setTimeout(() => {
                if (currentQuestionIndex < totalQuestions - 1) {
                    currentQuestionIndex++;
                    loadQuestion();
                } else {
                    showResults();
                }
            }, 1000);
        }
    }, 1000);
}

// Event listeners for buttons
document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
document.getElementById('next-btn').addEventListener('click', loadQuestion);