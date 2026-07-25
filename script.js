const timerElement = document.getElementById("timer");

let timer;
let timeLeft = 15;
const questions = [
	{
		question: "HTML ka full form kya hai?",
		answers: [
			{ text: "Hyper Text Markup Language", correct: true },
			{ text: "High Text Machine Language", correct: false },
			{ text: "Hyper Transfer Markup Language", correct: false },
			{ text: "Home Tool Markup Language", correct: false }
		]
	},
	{
		question: "CSS ka use kisliye hota hai?",
		answers: [
			{ text: "Styling", correct: true },
			{ text: "Database", correct: false },
			{ text: "Backend", correct: false },
			{ text: "Compiler", correct: false }
		]
	},
	{
		question: "JavaScript kisliye use hoti hai?",
		answers: [
			{ text: "Website ko interactive banane ke liye", correct: true },
			{ text: "Cooking ke liye", correct: false },
			{ text: "Video Editing", correct: false },
			{ text: "Operating System", correct: false }
		]
	},
	{
		question: "DOM ka full form kya hai?",
		answers: [
			{ text: "Document Object Model", correct: true },
			{ text: "Data Object Model", correct: false },
			{ text: "Document Order Model", correct: false },
			{ text: "Desktop Object Model", correct: false }
		]
	},
	{
		question: "JavaScript me variable declare karne ke liye kya use hota hai?",
		answers: [
			{ text: "let", correct: true },
			{ text: "loop", correct: false },
			{ text: "print", correct: false },
			{ text: "echo", correct: false }
		]
	}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("nextBtn");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progressBar");

let currentQuestion = 0;
let score = 0;

startQuiz();

function startQuiz() {
	currentQuestion = 0;
	score = 0;
	nextBtn.style.display = "none";
	showQuestion();
}

function showQuestion() {
	resetState();
	const q = questions[currentQuestion];
	questionElement.innerText = q.question;

	q.answers.forEach(answer => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('btn');
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', selectAnswer);
		answerButtons.appendChild(button);
	});

	updateProgress();
}

function resetState() {
	nextBtn.style.display = 'none';
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e) {
	const selectedBtn = e.target;
	const correct = selectedBtn.dataset.correct === 'true';
	if (correct) {
		score++;
		selectedBtn.classList.add('correct');
	} else {
		selectedBtn.classList.add('wrong');
	}
	Array.from(answerButtons.children).forEach(button => {
		if (button.dataset.correct === 'true') {
			button.classList.add('correct');
		}
		button.disabled = true;
	});
	nextBtn.style.display = 'block';
	scoreText.innerText = `Score: ${score}/${questions.length}`;
}

nextBtn.addEventListener('click', () => {
	currentQuestion++;
	if (currentQuestion < questions.length) {
		showQuestion();
	} else {
		showResult();
	}
});

function updateProgress() {
	const progress = ((currentQuestion) / questions.length) * 100;
	progressBar.style.width = `${progress}%`;
}

function showResult() {
	resetState();
	questionElement.innerText = `Quiz finished! Your score: ${score}/${questions.length}`;
	nextBtn.innerText = 'Restart';
	nextBtn.style.display = 'block';
	nextBtn.removeEventListener('click', this);
	nextBtn.addEventListener('click', () => startQuiz());
}
function showQuestion() {

    resetState();

    let current = questions[currentQuestion];

    let questionNo = currentQuestion + 1;

    questionElement.innerHTML = questionNo + ". " + current.question;

    progressBar.style.width =
        ((questionNo / questions.length) * 100) + "%";

    current.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;

        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);

    });

}

function resetState() {

    nextBtn.style.display = "none";

    while (answerButtons.firstChild) {

        answerButtons.removeChild(answerButtons.firstChild);

    }

}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedBtn = e.target;

    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {

        selectedBtn.classList.add("correct");

        score++;

    } else {

        selectedBtn.classList.add("wrong");

    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {

            button.classList.add("correct");

        }

        button.disabled = true;

    });

    nextBtn.style.display = "block";

}

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
              
        showQuestion();

    }else {startTimer();

        showScore();

    }

});

function showScore() {

    resetState();

    questionElement.innerHTML = "🎉 Quiz Completed!";

    scoreText.innerHTML =
        `Your Score : ${score} / ${questions.length}`;

    nextBtn.innerText = "Restart";

    nextBtn.style.display = "block";

    nextBtn.onclick = function () {

        scoreText.innerHTML = "";

        nextBtn.innerText = "Next";

        startQuiz();

    };

}
// ===== Dark Mode =====
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeBtn.innerText = "☀️ Light Mode";
    }else{
        themeBtn.innerText = "🌙 Dark Mode";
    }

});
function startTimer(){

    clearInterval(timer);

    timeLeft = 15;

    timerElement.innerText = "Time Left : " + timeLeft + "s";

    timer = setInterval(()=>{

        timeLeft--;

        timerElement.innerText = "Time Left : " + timeLeft + "s";

        if(timeLeft <= 0){

            clearInterval(timer);

            nextBtn.style.display = "block";

            Array.from(answerButtons.children).forEach(button=>{

                button.disabled = true;

                if(button.dataset.correct==="true"){
                    button.classList.add("correct");
                }

            });

        }

    },1000);

}