const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word"),
  scoreText = document.querySelector(".score"),
  questionText = document.querySelector(".question-count");

let correctWord, timer, score = 0, attemptedQuestions = 0, usedWords = [];

const initTimer = maxTime => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return timeText.innerText = maxTime;
    }
    if (attemptedQuestions === 20) {
      clearInterval(timer);
    } else {
      alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
      initGame();
    }
  }, 1000);
};
let currentWordIndex = 0;

const initGame = () => {
  if (usedWords.length === 20) { // if 20 words are used, display the final score and stopping page
    clearInterval(timer); // Stop the timer
    scoreText.innerText = "Final Score: " + score + " / " + attemptedQuestions; // Display the final score and number of questions attempted
    document.querySelector(".final-score").innerText = `${score} / ${attemptedQuestions}`;
    document.querySelector(".stopping-page").style.display = "block"; // Show the stopping page
    return;
  }

  initTimer(60);
  let randomObj;
  do {
    currentWordIndex++;
    if (currentWordIndex >= words.length) {
      currentWordIndex = 0;
    }
    randomObj = words[currentWordIndex];
  } while (usedWords.includes(randomObj));
  usedWords.push(randomObj);
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
  questionText.innerText = `${usedWords.length}/${words.length}`;

  // check if used words is equal to 20 and show or hide the link accordingly
  if (usedWords.length === 20) {
    document.querySelector("a[href='results.html']").style.display = "block";
  } else {
    document.querySelector("a[href='results.html']").style.display = "none";
  }
};

const checkWord = () => {
  let userInput = inputField.value.toLowerCase();
  if (!userInput) return alert("Please enter the word to check!");
  attemptedQuestions++;
  if (userInput === correctWord) {
    score++;
    scoreText.innerText = "Score: " + score;
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
  } else {
    alert(`Oops! ${userInput} is not a correct word. The correct word was ${correctWord.toUpperCase()}.`);
    initGame();
  }
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);


initGame(); 