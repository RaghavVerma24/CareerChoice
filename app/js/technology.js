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
        question: 'Would you like to: Build, test, and modify product prototypes using working models or theoretical models constructed with computer simulation?',
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
        question: 'Would you like to: Update knowledge and skills to keep up with rapid advancements in computer technology?',
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
        question: 'Would you like to: Test and verify hardware to ensure that they meet specifications and requirements, by recording and analyzing test data?',
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
        question: 'Would you like to: Provide technical support to designers, marketing and sales departments, and other team members throughout the development of a product?',
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
        question: 'Would you like to: Monitor functioning of equipment and make necessary modifications to ensure the system operates in conformance with specifications?',
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
        
        return window.location.assign('/app/end3.html?score=' + score + '&max=' + MAX_QUESTIONS)
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