export interface ScoreBoardProps {
  scores: number;
  turns: number;
  level: number;
  shuffleCards: (keepState: boolean) => void;
}
