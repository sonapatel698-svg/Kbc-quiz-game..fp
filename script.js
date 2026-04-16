const questions = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        answer: 1,
        money: 1000
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1,
        money: 2000
    },
    {
        question: "Who wrote 'Ramayana'?",
        options: ["Valmiki", "Tulsidas", "Ved Vyas", "Kalidas"],
        answer: 0,
        money: 5000
    },
    {
        question: "National animal of India?",
        options: ["Lion", "Elephant", "Tiger", "Peacock"],
        answer: 2,
        money: 10000
    }
];

let currentQ = 0;
let money = 0;
let fiftyUsed = false;

const questionEl = document.getElementById('question');
const optionBtns = document.querySelectorAll('.option');
const moneyEl = document.getElementById('money');
const startBtn = document.getElementById('start-btn');
const fiftyBtn = document.getElementById('fifty-fifty');

function loadQuestion() {
    const q = questions[currentQ];
    questionEl.textContent = q.question;
    optionBtns.forEach((btn, i) => {
        btn.querySelector('span').textContent = q.options[i];
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
        btn.style.display = 'block';
    });
}

function selectAnswer(index) {
    const q = questions[currentQ];
    optionBtns.forEach(btn => btn.disabled = true);
    
    if (index === q.answer) {
        optionBtns[index].classList.add('correct');
        money = q.money;
        moneyEl.textContent = money.toLocaleString();
        setTimeout(() => {
            currentQ++;
            if (currentQ < questions.length) {
                loadQuestion();
            } else {
                questionEl.textContent = `Congrats! You won ₹${money.toLocaleString()}`;
                startBtn.style.display = 'block';
                startBtn.textContent = 'Play Again';
            }
        }, 1500);
    } else {
        optionBtns[index].classList.add('wrong');
        optionBtns[q.answer].classList.add('correct');
        setTimeout(() => {
            questionEl.textContent = `Wrong! You won ₹${money.toLocaleString()}`;
            startBtn.style.display = 'block';
            startBtn.textContent = 'Play Again';
        }, 1500);
    }
}

function useFiftyFifty() {
    if (fiftyUsed) return;
    fiftyUsed = true;
    fiftyBtn.disabled = true;
    const q = questions[currentQ];
    let removed = 0;
    optionBtns.forEach((btn, i) => {
        if (i!== q.answer && removed < 2) {
            btn.style.display = 'none';
            removed++;
        }
    });
}

startBtn.addEventListener('click', () => {
    currentQ = 0;
    money = 0;
    fiftyUsed = false;
    fiftyBtn.disabled = false;
    moneyEl.textContent = '0';
    startBtn.style.display = 'none';
    loadQuestion();
});

optionBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => selectAnswer(i));
});
fiftyBtn.addEventListener('click', useFiftyFifty);
