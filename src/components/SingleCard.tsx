import { SingleCardProps } from "../models/single-card.interface";
import "./SingleCard.scss";

function SingleCard({
  card,
  handleChoice,
  flipped,
  disabled,
}: SingleCardProps) {
  const handleClick = () => {
    !disabled && handleChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="card--front" src={card.src} alt="card front"></img>
        <img
          className="card--back"
          onClick={handleClick}
          src="/img/cover.png"
          alt="card back"
        ></img>
      </div>
    </div>
  );
}

export default SingleCard;
