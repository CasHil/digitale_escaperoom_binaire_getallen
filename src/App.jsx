import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./App.css";

const App = () => {
  const [timeLeft, setTimeLeft] = useState(600);
  const [mistakes, setMistakes] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const backgrounds = [
    "background1",
    "background2",
    "background3",
    "background4",
    "background5",
    "background6",
    "background7",
  ];

  const puzzles = [
    {
      question: "Wat is het decimale getal voor het binaire getal 1101?",
      answer: "13",
      hint: "Tel de waarden van de bits: 1x8 + 1x4 + 0x2 + 1x1.",
    },
    {
      question: "Wat is het hexadecimale getal voor het decimale getal 15?",
      answer: "F",
      hint: "In het hexadecimale stelsel gaan we van 0-9 en dan A-F.",
    },
    {
      question: "Wat is het binaire getal voor het hexadecimale getal C?",
      answer: "1100",
      hint: "C staat voor 12. Zet dat om naar binair.",
    },
    {
      question: "Wat is het decimale getal voor het binaire getal 101010?",
      answer: "42",
      hint: "Gebruik de posities: 1x32 + 0x16 + 1x8 + 0x4 + 1x2 + 0x1.",
    },
    {
      question:
        "Wat is het hexadecimale getal voor het binaire getal 1111 1111?",
      answer: "FF",
      hint: "Elke 4 bits is een hexadecimaal cijfer: 1111 = F.",
    },
    {
      question: "Wat is het binaire getal voor het decimale getal 255?",
      answer: "11111111",
      hint: "255 is 2^8 - 1. Zet dat om naar binair.",
    },
    {
      question: "Wat is het hexadecimale getal 3A5C in het decimale stelsel?",
      answer: "14940",
      hint: "Gebruik machten van 16: 3x16^3 + 10x16^2 + 5x16^1 + 12x16^0",
    },
  ];

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver && !isVictory) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver, isVictory]);

  useEffect(() => {
    document.body.className = backgrounds[currentPuzzle];
  }, [currentPuzzle, backgrounds]);

  useEffect(() => {
    if (isVictory) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isVictory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = e.target.elements.answer.value.trim();
    const correctAnswer = puzzles[currentPuzzle].answer.trim();
    if (userAnswer === correctAnswer) {
      if (currentPuzzle + 1 < puzzles.length) {
        setCurrentPuzzle(currentPuzzle + 1);
        setShowHint(false);
        e.target.reset();
      } else {
        setIsVictory(true);
      }
    } else {
      setMistakes(mistakes + 1);
      if (mistakes + 1 >= 3) {
        setIsGameOver(true);
      }
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  if (isGameOver) {
    return (
      <div className="game-over">
        <h1>Game Over</h1>
        <p>Je hebt te veel fouten gemaakt of de tijd is op!</p>
      </div>
    );
  }

  if (isVictory) {
    return (
      <div className="victory">
        <h1 className="victory-title">Gefeliciteerd!</h1>
        <p>Je hebt alle puzzels opgelost!</p>
        <p className="victory-message">
          Jouw kennis van binaire en hexadecimale getallen is fantastisch!
        </p>
      </div>
    );
  }

  return (
    <div className="escape-room">
      <header>
        <h1>Digitale Escape Room: Binaire en hexadecimale getallen</h1>
        <p>
          Overgebleven tijd: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </p>
        <p>Fouten: {mistakes} / 3</p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${((currentPuzzle + 1) / puzzles.length) * 100}%`,
            }}
          ></div>
        </div>
      </header>
      <main>
        <div className="puzzle">
          <h2>Puzzel {currentPuzzle + 1}</h2>
          <p>{puzzles[currentPuzzle].question}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="answer"
              placeholder="Typ je antwoord..."
              required
            />
            <button type="submit">Indienen</button>
          </form>
          <br></br>
          <button onClick={handleShowHint} className="hint-button">
            Hint?
          </button>

          {showHint && (
            <p className="hint">Hint: {puzzles[currentPuzzle].hint}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
