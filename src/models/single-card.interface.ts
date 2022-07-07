import { Card } from "./card.interface";
import { Choice } from "./choice.interface";

export interface SingleCardProps {
  card: Card;
  flipped: boolean;
  handleChoice: (choice: Choice) => void;
}
