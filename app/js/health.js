const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Would you like to use anesthetics to limit the amount of pain experienced by patients during procedures?',
        choice1: 'Strongly Disagree',
        choice2: 'Disagree',
        choice3: 'Neutral/Unsure',
        choice4: 'Agree',
        choice5: 'Strongly Agree',
        answer1: 1,
        answer2: 2,
        answer3: 3,
        answer4: 4,
        answer5: 5,
    },
    {
        question: 'Would you like to: Would you like to examine teeth, gums, and related tissues, using dental instruments to evaluate dental health, diagnose diseases, and plan appropriate treatments?',
        choice1: 'Strongly Disagree',
        choice2: 'Disagree',
        choice3: 'Neutral/Unsure',
        choice4: 'Agree',
        choice5: 'Strongly Agree',
        answer1: 1,
        answer2: 2,
        answer3: 3,
        answer4: 4,
        answer5: 5,
    },
    {
        question: 'Would you like to: Perform surgical procedures to prevent or correct injury, disease, deformities and patient function while adhering to regulatory and ethical protocols?',
        choice1: 'Strongly Disagree',
        choice2: 'Disagree',
        choice3: 'Neutral/Unsure',
        choice4: 'Agree',
        choice5: 'Strongly Agree',
        answer1: 1,
        answer2: 2,
        answer3: 3,
        answer4: 4,
        answer5: 5,
    },
    {
        question: 'Would you like to: Coordinate follow up meetings with patients and monitor health condition after surgery or treatment?',
        choice1: 'Strongly Disagree',
        choice2: 'Disagree',
        choice3: 'Neutral/Unsure',
        choice4: 'Agree',
        choice5: 'Strongly Agree',
        answer1: 1,
        answer2: 2,
        answer3: 3,
        answer4: 4,
        answer5: 5,
    },
    {
        question: 'Would you like to: Create patient-specific health programs that make use of historical data?',
        choice1: 'Strongly Disagree',
        choice2: 'Disagree',
        choice3: 'Neutral/Unsure',
        choice4: 'Agree',
        choice5: 'Strongly Agree',
        answer1: 1,
        answer2: 2,
        answer3: 3,
        answer4: 4,
        answer5: 5,
    }
]

const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('/app/end4.html?score=' + score + '&max=' + MAX_QUESTIONS)
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply;
        let classToApplyOne = selectedAnswer == currentQuestion.answer1 ? 'correct' : 'incorrect'
        let classToApplyTwo = selectedAnswer == currentQuestion.answer2 ? 'correct' : 'incorrect'
        let classToApplyThree = selectedAnswer == currentQuestion.answer3 ? 'correct' : 'incorrect'
        let classToApplyFour = selectedAnswer == currentQuestion.answer4 ? 'correct' : 'incorrect'
        let classToApplyFive = selectedAnswer == currentQuestion.answer5 ? 'correct' : 'incorrect'

        if(classToApplyOne === 'correct') {
            incrementScore(1)
            classToApply = classToApplyOne
        } else if(classToApplyTwo === 'correct') {
            incrementScore(2)
            classToApply = classToApplyTwo
        } else if(classToApplyThree === 'correct') {
            incrementScore(3)
            classToApply = classToApplyThree
        } else if(classToApplyFour === 'correct') {
            incrementScore(4)
            classToApply = classToApplyFour
        } else if(classToApplyFive === 'correct') {
            incrementScore(5)
            classToApply = classToApplyFive
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()