# Word Masters

A browser-based Wordle-style game built with **HTML, CSS, and vanilla JavaScript**.

This was the final project in **Complete Intro to Web Development, v3** — part of the Frontend Masters beginner path taught by **Brian Holt**.

The game fetches a word of the day from an API, lets the player guess in 6 attempts, validates each guess, and colors letters based on accuracy:

- 🟩 **Green**: correct letter in the correct spot
- 🟨 **Yellow**: correct letter in the wrong spot
- ⬜ **Gray**: letter not in the word

---

## Features

- 6 rows × 5-letter word grid
- Keyboard input handling (`A-Z`, `Backspace`, `Enter`)
- Word-of-the-day fetch from API
- Guess validation via API before scoring
- Duplicate-letter aware scoring logic
- Win/lose states with end-of-game handling
- Loading spinner while API requests are in progress

---

## Project Structure

```text
.
├── index.html   # Game markup
├── styles.css   # Layout and visual styles
└── game.js      # Game logic and API communication
```

---

## APIs Used

- `https://words.dev-apis.com/word-of-the-day`
- `https://words.dev-apis.com/validate-word`

### Request details

- **Get word of the day**
  - `GET /word-of-the-day`
- **Validate guessed word**
  - `POST /validate-word`
  - Body:

```json
{
  "word": "guess"
}
```

---

## How to Run

This is a static frontend project.

1. Open `index.html` directly in your browser, **or**
2. Run it with a local server (recommended), for example with VS Code Live Server.

Then start typing letters on your keyboard to play.

---

## How to Play

1. Type a 5-letter guess.
2. Press `Enter` to submit.
3. Press `Backspace` to delete letters before submission.
4. Use tile colors to guide your next guess.
5. You have 6 tries to guess the word.

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API

---

## Notes

- The title animates with a rainbow effect on win.
- Invalid words briefly highlight the current row in red.
- Gameplay stops after win or loss.
