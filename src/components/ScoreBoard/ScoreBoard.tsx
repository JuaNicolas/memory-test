import { ScoreBoardProps } from "../../models/score-board.interface";
import "./ScoreBoard.scss";
const formatScore = (scores: number): number[] => {
  const scoresAsString = `${scores}`;
  const score: number[] = Array(6 - scoresAsString.length).fill(0);
  for (const n of scoresAsString) {
    score.push(+n);
  }
  return score;
};

function ScoreBoard({ scores, shuffleCards, turns, level }: ScoreBoardProps) {
  const formattedScore = formatScore(scores);

  return (
    <div className="highscores-grid">
      <button onClick={() => shuffleCards(false)}>New Game</button>
      <p className="level">Level: {level}</p>
      <p className="turns">Turns: {turns}</p>
      <p className="scores">
        Score <span>{formattedScore}</span>
      </p>
    </div>
  );
}

export default ScoreBoard;
