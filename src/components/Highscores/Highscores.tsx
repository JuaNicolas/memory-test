import { HighscoresProps } from "../../models/highscores.interface";
import "./Highscores.scss";
function Highscores({ scores, shuffleCards, turns }: HighscoresProps) {
  const formatScore = () => {
    const scoresAsString = `${scores}`;
    const score = Array(5 - scoresAsString.length).fill(0);
    for (const n of scoresAsString) {
      score.push(n);
    }
    return score;
  };
  return (
    <div className="highscores-grid">
      <button onClick={shuffleCards}>New Game</button>
      <p className="scores">
        Score <span>{formatScore()}</span>
      </p>
      <p className="turns">Turns: {turns}</p>
    </div>
  );
}

export default Highscores;
