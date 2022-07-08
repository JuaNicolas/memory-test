import { useEffect, useState } from "react";
import { ScoreBoardProps } from "../../models/score-board.interface";
import "./ScoreBoard.scss";
function ScoreBoard({ scores, shuffleCards, turns }: ScoreBoardProps) {
  const [score, setScore] = useState<number[]>([]);

  useEffect(() => {
    const scoresAsString = `${scores}`;
    const score: number[] = Array(5 - scoresAsString.length).fill(0);
    for (const n of scoresAsString) {
      score.push(+n);
    }
    setScore(score);
  }, [scores]);

  return (
    <div className="highscores-grid">
      <button onClick={shuffleCards}>New Game</button>
      <p className="scores">
        Score <span>{score}</span>
      </p>
      <p className="turns">Turns: {turns}</p>
    </div>
  );
}

export default ScoreBoard;
