import "./App.scss";
import { Image } from "./models/image.interface";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Card } from "./models/card.interface";

import { Choice } from "./models/choice.interface";
import SingleCard from "./components/SingleCard/SingleCard";
import Highscores from "./components/Highscores/Highscores";
import { BASE_MULTIPLIER } from "./utils/contants";

const cardImages: Image[] = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [scoreMultiplier, setScoreMultiplier] =
    useState<number>(BASE_MULTIPLIER);
  const [choiceOne, setChoiceOne] = useState<Choice | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Choice | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setUserScore((prevScore) => prevScore + scoreMultiplier);
        setScoreMultiplier(
          (prevMultiplier) => prevMultiplier + BASE_MULTIPLIER
        );
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        );

        resetTurn();
      } else {
        setTimeout(() => {
          setScoreMultiplier(BASE_MULTIPLIER);
          resetTurn();
        }, 500);
      }
    }
  }, [choiceTwo]);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ id: uuidv4(), ...card }));
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setScoreMultiplier(BASE_MULTIPLIER);
    setUserScore(0);
  };

  // handle a choice
  const handleChoice = (choice: Choice) => {
    if (choice.id === choiceOne?.id) return;
    choiceOne ? setChoiceTwo(choice) : setChoiceOne(choice);
  };

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>

      <Highscores
        scores={userScore}
        shuffleCards={shuffleCards}
        turns={turns}
      />
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            handleChoice={handleChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
