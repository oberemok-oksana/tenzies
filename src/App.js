import { useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";

function App() {
  const allNewDice = () => {
    const dice = [];
    let randomNumber = 0;

    for (let i = 0; i < 10; i++) {
      randomNumber = Math.trunc(Math.random() * 6 + 1);
      dice.push({ number: randomNumber, id: nanoid(), isHeld: false });
    }

    return dice;
  };

  const [dice, setDice] = useState(allNewDice());

  const rollDice = () => {
    const filteredDice = dice.map((die) => {
      if (die.isHeld) {
        return { ...die };
      } else {
        return { ...die, number: Math.trunc(Math.random() * 6 + 1) };
      }
    });

    setDice(filteredDice);
  };

  const activate = (id) => {
    setDice((prev) => {
      return prev.map((die) => {
        if (id === die.id) {
          return { ...die, isHeld: !die.isHeld };
        }
        return { ...die };
      });
    });
  };

  return (
    <>
      <main className="main">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="blocks">
          {dice.map((die) => (
            <Die
              value={die.number}
              key={die.id}
              id={die.id}
              isHeld={die.isHeld}
              onClick={() => activate(die.id)}
            />
          ))}
        </div>
        <button className="btn" onClick={rollDice}>
          Roll
        </button>
      </main>
    </>
  );
}

export default App;
