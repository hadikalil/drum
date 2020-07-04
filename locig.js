const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");


let shuffledQuestions, currentQuestionIndex;
let count = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQustion()
})

function startGame() {
  console.log("started");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQustion();
}

function setNextQustion() {
  resetState();

  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
//################# show Question ###################################
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
//############### reset State remove the previous  #########################
function resetState(){
    clearStatusClass(document.body)// to clear the body color 
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
      }
}
//############################ select Answer #############################################
function selectAnswer(e) {
    const selectedButton = e.target
    //e target is the button 
    const correct = selectedButton.dataset.correct


    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText =  "Restart"
        startButton.classList.remove('hide')
    }
}
//############## status class of  #########################################
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
  {
    question: "what is 2 + 2",
    answers: [
      { text: "4", correct: true , marked:false },
      { text: "22", correct: false , marked:false },
    ],
  },
  {
    question: "what is 2 + 2",
    answers: [
      { text: "4", correct: true , marked:false},
      { text: "22", correct: false , marked:false },
    ],
  },
  {
    question: "what is 2 + 2",
    answers: [
      { text: "4", correct: true , marked:false },
      { text: "22", correct: false , marked:false },
    ],
  },
];
