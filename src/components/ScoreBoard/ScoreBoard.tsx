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

function ScoreBoard({ scores, shuffleCards, turns }: ScoreBoardProps) {
  const formattedScore = formatScore(scores);

  return (
    <div className="highscores-grid">
      <button onClick={shuffleCards}>New Game</button>
      <p className="scores">
        Score <span>{formattedScore}</span>
      </p>
      <p className="turns">Turns: {turns}</p>
    </div>
  );
}

export default ScoreBoard;
