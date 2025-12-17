
export enum GameState {
  Start,
  Playing,
  Loading,
  Paywall,
  Result,
}

export interface Answer {
  text: string;
  score: number;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export enum ResultCategory {
    Jovem = "Idade Mental Jovem",
    Amadurecimento = "Idade Mental em Amadurecimento",
    Adulta = "Idade Mental Adulta",
    Sabia = "Idade Mental Sábia"
}
