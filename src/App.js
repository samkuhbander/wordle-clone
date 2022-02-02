import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import './App.css';

//Make an array of words
const words = [
  "Hello",
  "World",
]

let tries = 0;
let word2 = getRandomWord();
let won = false;

//Compare 2 words and return an array 
//0 if letter is not in the word 
//1 if letter is in the word
//2 if letter is in the word and in the same spot 
function compareWords(word1) {
  word1 = word1.toLowerCase();
  word2 = word2.toLowerCase();
  const result = [];
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] === word2[i]) {
      result.push(2);
    } else if (word2.indexOf(word1[i]) === -1) {
      result.push(0);
    } else {
      result.push(1);
    }
  }
  console.log(result);
  return result;
}

//Get random word from the array
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

//Play the game
function playGame(word) {
  if (word.length == 5) {
    if (tries < 5 && won != true) {
      //Compare words
      const result = compareWords(word);
      //Display the word in the grid
      displayWord(word, result);
      //Check win if all are 2
      if (result.every(x => x === 2)) {
        won = true;
        console.log("You win!");
      }
      tries++;
      console.log("Try number " + tries);
    } else if (won == true) {
      console.log("You win reset to play again!");
    }
    else {
      console.log("Tries exceeded");
    }
  }
}

//Display the word in each box of the grid row
function displayWord(word, result) {
  word = word.toUpperCase();
  const wordArray = word.split("");
  const wordBoxes = document.querySelectorAll(".grid-square");
  for (let i = (tries * 5); i < 5 + (tries * 5); i++) {
    wordBoxes[i].innerHTML = wordArray[i - (tries * 5)];
    if(result[i - (tries * 5)] == 2){
      wordBoxes[i].style.backgroundColor = "green";
    } else if (result[i - (tries * 5)] == 1) {
      wordBoxes[i].style.backgroundColor = "yellow";
    }
  }
}

//Reset the game
function resetGame() {
  tries = 0;
  word2 = getRandomWord();
  won = false;
  console.log("Reset game");
  const wordBoxes = document.querySelectorAll(".grid-square");
  for (let i = 0; i < wordBoxes.length; i++) {
    wordBoxes[i].innerHTML = "";
    wordBoxes[i].style.backgroundColor = "white";
  }
}

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <h1> Wordle Clone</h1>
        {/* Make a 6 rows of 5 evenly spaced squares */}
        <div className="grid">
          <div className="grid-row">
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
          </div>
          <div className="grid-row">
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
          </div>
          <div className="grid-row">
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
          </div>
          <div className="grid-row">
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
          </div>
          <div className="grid-row">
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
          </div>
          <div className="grid-row">
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
            <div className="grid-square"></div>
          </div>
        </div>
        {/*Center the objects in the middle of the screen*/}
        <div className="App-body-center">
          {/*Make a text box to take a word and then run it against the compare word function */}
          <input type="text" id="word1" placeholder="Enter a word" />
          <button onClick={() => { playGame(document.getElementById("word1").value) }}>Compare</button>
          {/* Button to reset the game */}
          <button onClick={() => { resetGame() }}>Reset Game</button>
        </div>
      </div>
    </div>
  );
}

export default App;
