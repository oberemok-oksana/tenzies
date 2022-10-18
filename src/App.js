import { useEffect, useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

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
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const everyIsHeld = dice.every((die) => die.isHeld);
    const everyIsSame = dice.every((die) => die.number === dice[0].number);
    if (everyIsHeld && everyIsSame) {
      setTenzies(true);
    }
  }, [dice]);

  const rollDice = () => {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else {
      const filteredDice = dice.map((die) => {
        if (die.isHeld) {
          return { ...die };
        } else {
          return { ...die, number: Math.trunc(Math.random() * 6 + 1) };
        }
      });

      setDice(filteredDice);
    }
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
          {tenzies ? "Reset" : "Roll"}
        </button>
        {tenzies && <Confetti />}
      </main>
    </>
  );
}

export default App;
