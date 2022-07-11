import "./App.scss";
import { Image } from "./models/image.interface";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Card } from "./models/card.interface";

import { Choice } from "./models/choice.interface";
import SingleCard from "./components/SingleCard/SingleCard";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import { BASE_MULTIPLIER } from "./utils/contants";
import Spinner from "./components/Spinner/Spinner";

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
  const [level, setLevel] = useState<number>(1);
  const [userScore, setUserScore] = useState<number>(0);
  const [scoreMultiplier, setScoreMultiplier] =
    useState<number>(BASE_MULTIPLIER);
  const [choiceOne, setChoiceOne] = useState<Choice | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Choice | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // advance level
  useEffect(() => {
    const gameComplete = cards.length && cards.every((c) => c.matched);
    if (gameComplete) {
      shuffleCards(true);
      setLevel((prevLevel) => prevLevel + 1);
    }
  }, [cards]);

  // shuffle cards
  const shuffleCards = (keepState = false) => {
    setIsLoading(true);
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ id: uuidv4(), ...card }));
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(keepState ? turns : 0);
    setUserScore(keepState ? userScore : 0);
    setScoreMultiplier(BASE_MULTIPLIER);
    if (!keepState) {
      setLevel(1);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
      <ScoreBoard
        scores={userScore}
        shuffleCards={shuffleCards}
        turns={turns}
        level={level}
      />

      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
}

export default App;
