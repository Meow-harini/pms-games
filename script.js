// 📌 Random Quotes System
const quotes = [
    "Self-care is not selfish. 💖",
    "You're stronger than you think! 💪",
    "Take one step at a time. 🌸",
    "You deserve kindness, even from yourself. 🌿",
    "Every storm runs out of rain. ☔"
];

document.getElementById('welcome-quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];

// 📌 Game Menu Logic - Ensuring clicking works!
function startGame(game) {
    document.querySelectorAll('.game-section').forEach(section => section.classList.add('hidden'));
    document.getElementById(`${game}-game-section`).classList.remove('hidden');
}

// 📌 Memory Puzzle Game Logic
const cardValues = ['💖', '🌸', '🌿', '✨', '🌞', '🌼', '🌙', '🌱', '💖', '🌸', '🌿', '✨', '🌞', '🌼', '🌙', '🌱'];
let cardsFlipped = [];
let matchedCards = 0;

function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

function startMemoryGame() {
    matchedCards = 0;
    cardsFlipped = [];
    const shuffledCards = shuffleArray([...cardValues]);
    const board = document.getElementById('memory-game');
    board.innerHTML = '';

    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (cardsFlipped.length === 2 || this.classList.contains('flipped')) return;
    this.innerText = this.dataset.value;
    this.classList.add('flipped');
    cardsFlipped.push(this);

    if (cardsFlipped.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = cardsFlipped;
    if (card1.dataset.value === card2.dataset.value) {
        matchedCards += 2;
        cardsFlipped = [];
        if (matchedCards === cardValues.length) {
            setTimeout(() => alert('You won the Memory Puzzle Game!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.innerText = '';
            card2.classList.remove('flipped');
            card2.innerText = '';
            cardsFlipped = [];
        }, 800);
    }
}

document.querySelector('button[onclick="startMemoryGame()"]').addEventListener('click', startMemoryGame);

// 📌 Word Scramble Game Logic
const wordList = [
    { word: 'menstrual', scrambled: 'ltnesuram' },
    { word: 'hygiene', scrambled: 'eeyghni' },
    { word: 'symptoms', scrambled: 'omsyptms' },
    { word: 'ovulation', scrambled: 'lvoautnio' },
    { word: 'cravings', scrambled: 'vigrcans' }
];

let currentWordIndex = 0;

function loadWordScrambleGame() {
    document.getElementById('scramble-word').innerText = wordList[currentWordIndex].scrambled;
    document.getElementById('user-input').value = '';
    document.getElementById('feedback').innerText = '';
}

document.getElementById('check-answer').addEventListener('click', function () {
    const userAnswer = document.getElementById('user-input').value.toLowerCase();
    const currentWord = wordList[currentWordIndex];

    if (userAnswer === currentWord.word) {
        document.getElementById('feedback').innerText = "Correct! 🎉";
    } else {
        document.getElementById('feedback').innerText = `Wrong! The correct word was: ${currentWord.word}`;
    }

    currentWordIndex++;
    if (currentWordIndex < wordList.length) {
        setTimeout(loadWordScrambleGame, 1000);
    } else {
        document.getElementById('feedback').innerText += '\nGame Over!';
    }
});

loadWordScrambleGame();

// 📌 PMS Quiz Game Logic
const quizQuestions = [
    { question: "What does PMS stand for?", options: ["Pre-Monthly Symptoms", "Pre-Menstrual Syndrome", "Post-Menstrual Stress", "Pre-Menstruation Sickness"], correctAnswer: 1 },
    { question: "When do PMS symptoms typically begin?", options: ["During menstruation", "Right after ovulation", "1-2 weeks before menstruation", "During ovulation only"], correctAnswer: 2 },
    { question: "Which of these is NOT a common PMS symptom?", options: ["Mood swings", "Bloating", "Fever", "Food cravings"], correctAnswer: 2 },
    { question: "What percentage of women experience PMS symptoms?", options: ["10%", "30%", "50%", "75-90%"], correctAnswer: 3 },
    { question: "Which vitamin may help reduce PMS symptoms?", options: ["Vitamin A", "Vitamin B6", "Vitamin K", "Vitamin E"], correctAnswer: 1 },
    { question: "What is the medical term for severe PMS symptoms?", options: ["Dysmenorrhea", "PMDD", "Menorrhagia", "Endometriosis"], correctAnswer: 1 },
    { question: "Which hormone fluctuation is MOST responsible for PMS symptoms?", options: ["Estrogen only", "Progesterone only", "Both estrogen and progesterone", "Testosterone"], correctAnswer: 2 },
    { question: "How long can PMS symptoms typically last?", options: ["1-2 days", "3-5 days", "Up to 2 weeks", "The entire month"], correctAnswer: 2 },
    { question: "Which of these treatments has NOT been scientifically proven to help with PMS?", options: ["Regular exercise", "Cognitive behavioral therapy", "Crystal healing", "Hormonal birth control"], correctAnswer: 2 },
    { question: "Which culture first documented PMS-like symptoms?", options: ["Ancient Egypt", "Ancient Greece", "Ancient China", "Ancient Rome"], correctAnswer: 0 }
];

let currentQuizIndex = 0;
let quizScore = 0;

function loadQuizQuestion() {
    const quiz = quizQuestions[currentQuizIndex];
    document.getElementById('question').innerText = quiz.question;
    document.getElementById('answers').innerHTML = '';

    quiz.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.innerText = option;
        li.onclick = () => checkAnswer(index);
        document.getElementById('answers').appendChild(li);
    });
}

function checkAnswer(selectedIndex) {
    const quiz = quizQuestions[currentQuizIndex];
    if (selectedIndex === quiz.correctAnswer) {
        quizScore++;
        document.getElementById('quiz-feedback').innerText = `Correct! Score: ${quizScore}`;
    } else {
        quizScore--;
        document.getElementById('quiz-feedback').innerText = `Wrong! Score: ${quizScore}`;
    }

    currentQuizIndex++;
    if (currentQuizIndex < quizQuestions.length) {
        loadQuizQuestion();
    } else {
        document.getElementById('quiz-feedback').innerText += `\nGame Over! Final Score: ${quizScore}`;
    }
}

document.getElementById('next-question').addEventListener('click', loadQuizQuestion);

loadQuizQuestion(); // Start the quiz

function getSuggestions() {
  const moods = [...document.querySelectorAll(".moods input:checked")].map(el => el.value);
  const coffee = parseFloat(document.getElementById("coffee").value) || 0;
  const water = parseFloat(document.getElementById("water").value) || 0;
  const sleep = parseFloat(document.getElementById("sleep").value) || 0;
  const food = document.getElementById("food").value.toLowerCase();

  let suggestions = [];

  // Mood based
  if (moods.includes("Irritated")) suggestions.push("Try deep breathing and chamomile tea ☕");
  if (moods.includes("Crampy")) suggestions.push("Do Wind Pose yoga to reduce cramps 🌬️");
  if (moods.includes("Low") || moods.includes("Bored")) suggestions.push("Listen to calming music or journal 🎶📔");

  // Lifestyle based
  if (coffee > 2) suggestions.push("Reduce caffeine; it may worsen PMS symptoms ☕⚠️");
  if (water < 1.5) suggestions.push("Increase your water intake to reduce bloating 💧");
  if (sleep < 6) suggestions.push("Try to get at least 7 hours of sleep 😴");
  if (food.includes("spicy") || food.includes("junk")) suggestions.push("Avoid spicy or processed foods 🍟🌶️");

  if (suggestions.length === 0) {
    suggestions.push("You're doing well! Keep maintaining a balanced lifestyle 💖");
  }

  const output = document.getElementById("suggestion-output");
  output.innerHTML = "<strong>Your PMS Care Suggestions:</strong><ul>" + suggestions.map(s => `<li>${s}</li>`).join("") + "</ul>";
}
