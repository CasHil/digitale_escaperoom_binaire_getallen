import React from "react";

const Result = ({ success }) => {
  return (
    <div className="result">
      {success ? (
        <>
          <h1>Gefeliciteerd!</h1>
          <p>Je hebt alle puzzels opgelost!</p>
        </>
      ) : (
        <>
          <h1>Game Over</h1>
          <p>Je hebt te veel fouten gemaakt of de tijd is op!</p>
        </>
      )}
    </div>
  );
};

export default Result;
