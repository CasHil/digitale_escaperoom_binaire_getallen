import React, { useState } from "react";

const Puzzle = ({ question, onSubmit }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answer);
    setAnswer("");
  };

  return (
    <div className="puzzle">
      <h2>{question}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Typ je antwoord..."
        />
        <button type="submit">Indienen</button>
      </form>
    </div>
  );
};

export default Puzzle;
