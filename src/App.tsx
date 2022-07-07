import "./App.scss";
import { Image } from "./models/image.interface";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Card } from "./models/card.interface";

const cardImages: Image[] = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ id: uuidv4(), ...card }));
    setCards(shuffledCards);
    setTurns(turns + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(({ id, src }) => (
          <div className="card" key={id}>
            <div>
              <img className="card--front" src={src} alt="card front"></img>
              <img
                className="card--back"
                src="/img/cover.png"
                alt="card back"
              ></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
