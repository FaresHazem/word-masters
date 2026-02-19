const boxes = document.querySelectorAll(".wordle-box");
const loading = document.querySelector(".loading");
const WORD_OF_DAY_URL = "https://words.dev-apis.com/word-of-the-day";
const VALIDATE_WORD_URL = "https://words.dev-apis.com/validate-word";

let wordOfDay;
let currentBoxIndex = 0;
let currentBoxMaxIndex = 5;
let userWord = "";

// Validates a guessed word with the API.
async function validateWord(userWord) {
  loading.style.visibility = "visible";
  const promise = await fetch(VALIDATE_WORD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: userWord }),
  });
  const processedResponse = await promise.json();
  loading.style.visibility = "hidden";
  return processedResponse.validWord;
}

// Handles what happens when Enter is pressed on a full 5-letter row
// 1) Validate word
// 2) Score letters
// 3) Move to next row or end game
async function handleSubmission() {
  // Check if its an actual word or not
  const isValidWord = await validateWord(userWord);
  if (isValidWord) {
    // Count letters in wordOfDay
    let letterCounts = {};
    for (let letter of wordOfDay) {
      if (letterCounts[letter]) {
        letterCounts[letter]++;
      } else {
        letterCounts[letter] = 1;
      }
    }

    // First pass: mark exact matches green
    for (let i = 0; i < 5; i++) {
      let box = boxes[currentBoxMaxIndex - 5 + i];
      let letter = userWord[i];
      box.style.color = "white";
      if (letter === wordOfDay[i]) {
        box.style.backgroundColor = "darkgreen";
        letterCounts[letter]--;
      }
    }

    // Second pass: mark present but close yellow, else gray
    for (let i = 0; i < 5; i++) {
      let box = boxes[currentBoxMaxIndex - 5 + i];
      let letter = userWord[i];
      box.style.color = "white";

      // skip already green
      if (letter === wordOfDay[i]) continue;

      if (letterCounts[letter] && letterCounts[letter] > 0) {
        box.style.backgroundColor = "goldenrod";
        letterCounts[letter]--;
      } else {
        box.style.backgroundColor = "#888";
      }
    }

    if (userWord === wordOfDay) {
      win();
      return;
    }

    // Clear current guess for the next row
    userWord = "";

    // Advance to next row, or end game if this was the last row
    if (currentBoxMaxIndex < 30) currentBoxMaxIndex += 5;
    else lose();
  } else {
    // Invalid word feedback: briefly flash row borders red.
    for (let i = 0; i < 5; i++) {
      let box = boxes[currentBoxMaxIndex - 5 + i];
      box.style.borderColor = "crimson";
      box.style.transition = "border-color 0.3s ease";
      setTimeout(() => {
        box.style.borderColor = "";
      }, 500);
    }
  }
}

function win() {
  alert("you win");
  document.removeEventListener("keydown", handleInput);
  let title = document.querySelector(".title").style;
  title.animation = "rainbow 3s infinite";
}

function lose() {
  alert("you lose, the word was " + wordOfDay);
  document.removeEventListener("keydown", handleInput);
}

// Fetches the daily answer from API.
async function getWordOfDay() {
  loading.style.visibility = "visible";
  const promise = await fetch(WORD_OF_DAY_URL);
  const processedResponse = await promise.json();
  wordOfDay = processedResponse.word;
  loading.style.visibility = "hidden";
}

function isLetter(char) {
  return /^[a-zA-Z]$/.test(char);
}

function handleInput(event) {
  if (isLetter(event.key) && currentBoxIndex < currentBoxMaxIndex) {
    boxes[currentBoxIndex].innerText = event.key;
    userWord += event.key;
    currentBoxIndex++;
  } else if (event.key === "Backspace" && currentBoxIndex > 0) {
    userWord = userWord.slice(0, -1);
    if (currentBoxIndex > currentBoxMaxIndex - 5) currentBoxIndex--;
    boxes[currentBoxIndex].innerText = "";
  } else if (event.key === "Enter" && currentBoxIndex % 5 == 0) {
    handleSubmission();
  }
}

function wordle() {
  getWordOfDay();
  document.addEventListener("keydown", handleInput);
}

function init() {
  wordle();
}

init();
